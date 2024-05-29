import asyncio
import json
from uagents.query import query
from agents import (
    OCRAgent,
    NERAgent,
    GeneralQueryAgent
)
from messages import (
    OCRRequest,
    OCRResponse,
    GeneralQueryRequest
)

from utils.encode_img import encode_img

async def ner_query(extracted_text):
    response = await query(
        destination=NERAgent.address,
        message=extracted_text,
        timeout=60.0
    )
    data = json.loads(response.decode_payload())
    return data

async def ocr_query(prescription):
    response = await query(
        destination=OCRAgent.address,
        message=prescription,
        timeout=60.0
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
    
def extract_classes():

    ocr_request = OCRRequest(prescription=encode_img("img.jpeg"))
    ocr_response = asyncio.run(call_agent(prescription=ocr_request))
    
    ner_request = OCRResponse(text=ocr_response)
    ner_response = asyncio.run(call_agent(extracted_text=ner_request))
    
    return ner_response

async def general_question_query(question):
    response = await query(
        destination=GeneralQueryAgent.address,
        message=question,
        timeout=30.0
    )
    data = json.loads(response.decode_payload())
    return data

async def call_general_question_agent(question):
    try:
        response = await general_question_query(question)
        return response
    except Exception as e:
        return e

def ask_question(query):
    general_question_request = GeneralQueryRequest(query=query)
    general_question_response = asyncio.run(call_general_question_agent(question=general_question_request))

    return general_question_response