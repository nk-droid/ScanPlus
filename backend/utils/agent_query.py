import asyncio
import json
from uagents.query import query
from agents import OCRAgent
from messages import OCRRequest
from utils.encode_img import encode_img

async def agent_query(agent_address, prescription):
    response = await query(
        destination=agent_address,
        message=prescription,
        timeout=20.0
    )
    data = json.loads(response.decode_payload())
    return data["text"]


async def call_agent(agent_address, prescription):
    try:
        response = await agent_query(agent_address, prescription)
        return response
    except Exception as e:
        return e
    
def call_ocr_agent():
    req = OCRRequest(prescription=encode_img("img.jpeg"))
    r = asyncio.run(call_agent(agent_address=OCRAgent.address,
                    prescription=req))
    return r