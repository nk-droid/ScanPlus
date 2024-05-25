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
    name="NER Agent"
)

fund_agent_if_low(NERAgent.wallet.address())
model = ChatOpenAI(model='gpt-4o')
parser = PydanticOutputParser(pydantic_object=NERResponse)

@NERAgent.on_message(model=OCRResponse, replies=NERResponse)
async def classify_text(ctx: Context, sender: str, text: OCRResponse):

    print(sender)
    template = """
You are a Named Entity Recognition system. You are provided with text extracted by an Optical Character Recognition (OCR) system
from handwritten prescriptions. Your objective is to extract date of the prescription and list of medicines given in it.
If there is date given on the prescription, make sure you are returning the result that is compatible with
date from datetime module otherwise give null.

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
    print(f"text: {text}")

    chain = prompt | model | parser
    result = chain.invoke({
        "text": text.text
    })
    result = json.loads(result.json())
    print(result)
    try:
        await ctx.send(sender, NERResponse(medicines=result['medicines'],
                                           prescription_date=result['prescription_date']))
    except Exception as e:
        await ctx.send(sender, NERResponse(text="error"))