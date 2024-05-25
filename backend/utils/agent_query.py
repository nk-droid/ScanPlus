import asyncio
import json
from uagents.query import query
from agents import (
    OCRAgent,
    NERAgent
)
from messages import (
    OCRRequest,
    OCRResponse
)

from utils.encode_img import encode_img

async def ner_query(extracted_text):
    response = await query(
        destination=NERAgent.address,
        message=extracted_text,
        timeout=5.0
    )
    data = json.loads(response.decode_payload())
    return data

async def ocr_query(prescription):
    response = await query(
        destination=OCRAgent.address,
        message=prescription,
        timeout=10.0
    )
    data = json.loads(response.decode_payload())
    return data["text"]


async def call_agent(prescription=None, extracted_text=None):
    try:
        if prescription:
            response = await ocr_query(prescription)
        elif extracted_text:
            response = await ner_query(extracted_text)
        return response
    except Exception as e:
        return e
    
def call_ocr_agent():

    ocr_request = OCRRequest(prescription=encode_img("img.jpeg"))
    ocr_response = asyncio.run(call_agent(prescription=ocr_request))
    
    ner_request = OCRResponse(text=ocr_response)
    ner_response = asyncio.run(call_agent(extracted_text=ner_request))
    
    return ner_response