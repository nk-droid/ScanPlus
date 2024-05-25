import json
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser

from messages import (
    GeneralQueryRequest,
    GeneralQueryResponse
)

from dotenv import load_dotenv
load_dotenv()

GeneralQueryAgent = Agent(
    name="General Query Agent"
)

fund_agent_if_low(GeneralQueryAgent.wallet.address())
model = ChatOpenAI(model='gpt-4o')
parser = PydanticOutputParser(pydantic_object=GeneralQueryResponse)

@GeneralQueryAgent.on_query(model=GeneralQueryRequest, replies=GeneralQueryResponse)
async def query_handler(ctx: Context, sender: str, query: GeneralQueryRequest):

    template = """
You are a medical domain expert. Your objective is respond to a medical query.
Please make sure you are not responding to queries not related to the medical domain

Here is the query:
{query}

{format_instructions}
"""

    format_instructions = parser.get_format_instructions()
    prompt = PromptTemplate(
        template=template,
        input_variables=["query"],
        partial_variables={"format_instructions": format_instructions}
    )

    chain = prompt | model | parser
    result = chain.invoke({
        "query": query.query
    })

    result = json.loads(result.json())
    try:
        await ctx.send(sender, GeneralQueryResponse(answer=result['answer']))
    except Exception as e:
        await ctx.send(sender, GeneralQueryResponse(answer="error"))