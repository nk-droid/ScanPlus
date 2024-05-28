from uagents import Agent, Context, Model, Protocol
from uagents.setup import fund_agent_if_low
import requests

NotificationDataCollectorAgent = Agent(
    name="Data Collector Agent",
    seed="Data Collector agent seed"
)

fund_agent_if_low(NotificationDataCollectorAgent.wallet.address())

data_collection_protocol = Protocol(
    "Data collection protocol"
)

@data_collection_protocol.on_interval(60*60*24)
async def handle_request(ctx: Context):
    requests.get("http://127.0.0.1:5000/api/create_csv")

NotificationDataCollectorAgent.include(data_collection_protocol)