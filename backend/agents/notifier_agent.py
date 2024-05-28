from uagents import Agent, Context, Model, Protocol
from uagents.setup import fund_agent_if_low

MorningNotifierAgent = Agent(
    name="Morning Notifier Agent"
)
AfternoonNotifierAgent = Agent(
    name="Afternoon Notifier Agent"
)
EveningNotifierAgent = Agent(
    name="Evening Notifier Agent"
)
NotifierAgent = Agent(
    name="Notifier Agent"
)

fund_agent_if_low(MorningNotifierAgent)
fund_agent_if_low(AfternoonNotifierAgent)
fund_agent_if_low(EveningNotifierAgent)

class NotificationRequest(Model):
    pass

class NotificationResponse(Model):
    msg: str

notification_protocol = Protocol(
    name="Notification Protocol",
    version="1.0"
)

@notification_protocol.on_message(model=NotificationRequest, replies=NotificationResponse)
async def handle_request(ctx: Context, sender: str, notification: NotificationRequest):
    await ctx.send(sender, NotificationResponse(msg="Time to take your medicines"))

NotifierAgent.include(notification_protocol)

@MorningNotifierAgent.on_interval(period=3600)
async def send_notifications(ctx: Context):
    await ctx.broadcast(notification_protocol, message=NotificationRequest())

@AfternoonNotifierAgent.on_interval(period=3600)
async def send_notifications(ctx: Context):
    await ctx.broadcast(notification_protocol, message=NotificationRequest())

@EveningNotifierAgent.on_interval(period=3600)
async def send_notifications(ctx: Context):
    await ctx.broadcast(notification_protocol, message=NotificationRequest())