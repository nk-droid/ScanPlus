from uagents import Agent, Context, Model, Protocol
from uagents.setup import fund_agent_if_low

NotificationDataCollectorAgent = Agent(
    name="Data Collector Agent"
)

fund_agent_if_low(NotificationDataCollectorAgent)

