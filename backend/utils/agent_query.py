import json
from uagents.query import query

async def agent_query(agent_address, prescription):
    response = await query(
        destination=agent_address,
        message=prescription,
        timeout=20.0
    )
    print(response)
    return response['text']

async def call_agent(agent_address, prescription):
    try:
        response = await agent_query(agent_address, prescription)
        return response
    except Exception as e:
        return e