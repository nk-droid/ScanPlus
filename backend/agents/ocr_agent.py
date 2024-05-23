import json
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context
from langchain_openai import ChatOpenAI
from langchain.schema.messages import HumanMessage
from langchain.output_parsers import PydanticOutputParser

# from messages import (
#     OCRRequest,
#     OCRResponse
# )

from dotenv import load_dotenv
load_dotenv()

from pydantic import BaseModel

class OCRRequest(BaseModel):
    prescription: str

class OCRResponse(BaseModel):
    text: str

OCRAgent = Agent(
    name="GPT Agent",
    port=8000,
    seed="dsajds",
    endpoint=["http://localhost:8000/submit"]
)

fund_agent_if_low(OCRAgent.wallet.address())
model = ChatOpenAI(model='gpt-4-turbo')
parser = PydanticOutputParser(pydantic_object=OCRResponse)

def extract_content(inputs):
    template = """
You are an Optical Character Recognition system. You task is to precisely extract all the
text given in an image.
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
    print(result.json())
    return result.json()

if __name__ == "__main__":
    OCRAgent.run()