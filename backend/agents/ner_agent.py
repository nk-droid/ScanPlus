import json
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser

from messages import (
    NERResponse,
    OCRResponse
)

from dotenv import load_dotenv
load_dotenv()

NERAgent = Agent(
    name="NER Agent",
    seed="NER agent seed"
)

fund_agent_if_low(NERAgent.wallet.address())
model = ChatOpenAI(model='gpt-4o',temperature=0.5,model_kwargs={"top_p":0.1})
parser = PydanticOutputParser(pydantic_object=NERResponse)

@NERAgent.on_query(model=OCRResponse, replies=NERResponse)
async def classify_text(ctx: Context, sender: str, text: OCRResponse):

    template = """
You are a Named Entity Recognition system. You are provided with text extracted by an Optical Character Recognition (OCR) system
from handwritten prescriptions. Your objective is to extract 1) Prescription Date 2) Medicines Details 3) Tests Details

Please strictly maintain the following:
    - If there is prescriptionm date, give it in the format compatible with the date format from datetime module otherwise give null.
    - A medicine can contain
        1) Frequency - Frequecy of taking the medicine per day.
        2) Duration - The duration for which the medicine needs to be taken.
    - If there are any tests or diagnosis given in the prescription, list them in tests.
    - Frequency must be in integer format. Convert any frequency into integer format based on the way doctors write frequency in prescriptions.
    - Duration must be in days and you have to return only the integer part of it.

Here is the text from the OCR system:
{text}

{format_instructions}
"""
    format_instructions = parser.get_format_instructions()
    prompt = PromptTemplate(
        template=template,
        input_variables=["text"],
        partial_variables={"format_instructions": format_instructions}
    )
  
    chain = prompt | model | parser
    result = chain.invoke({
        "text": text.text
    })
    result = json.loads(result.json())

    try:    
        await ctx.send(sender, NERResponse(medicines=result['medicines'],
                                            prescription_date=result['prescription_date'],
                                            tests=result['tests']))
    except Exception as e:
        await ctx.send(sender, NERResponse(text="error"))