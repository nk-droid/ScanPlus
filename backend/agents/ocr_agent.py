import json
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context, Model
from langchain_openai import ChatOpenAI
from langchain.schema.messages import HumanMessage
from langchain.output_parsers import PydanticOutputParser

from messages import (
    OCRRequest,
    OCRResponse
)

from dotenv import load_dotenv
load_dotenv()

OCRAgent = Agent(
    name="OCR Agent",
    seed="OCR agent seed"
)

fund_agent_if_low(OCRAgent.wallet.address())
model = ChatOpenAI(model='gpt-4o',temperature=0,model_kwargs={"top_p":0.1})
parser = PydanticOutputParser(pydantic_object=OCRResponse)

def extract_content(inputs):
    template = """
You are an Optical Character Recognition system. Your task is to extract all the handwritten
text given in the image of a handwritten prescription.

Return the result in a valid JSON format containing "text" as key and the extracted text as its value.
"""

    content = [
        {
            "type": "text",
            "text": template
        },
        {
            "type": "text",
            "text": parser.get_format_instructions()
        },
        {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{inputs['prescription']}"
            }
        }
    ]

    result = model.invoke(
        [
            HumanMessage(
                content = content
            )
        ]
    )

    return result.content

@OCRAgent.on_query(model=OCRRequest, replies=OCRResponse)
async def format_content(ctx: Context, sender: str, prescription: OCRRequest):
    chain = extract_content | parser
    result = chain.invoke({
        "prescription": prescription.prescription
    })
    result = json.loads(result.json())
    try:
        await ctx.send(sender, OCRResponse(text=result['text']))
    except Exception as e:
        await ctx.send(sender, OCRResponse(text="error"))