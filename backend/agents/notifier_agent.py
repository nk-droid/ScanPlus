# # from datetime import datetime, time
# # from uagents import Agent, Context, Model, Protocol
# # from uagents.setup import fund_agent_if_low
# # from utils.notify import send_wa_notification
# # import pandas as pd

# # MorningNotifierAgent = Agent(
# #     name="Morning Notifier Agent"
# # )
# # AfternoonNotifierAgent = Agent(
# #     name="Afternoon Notifier Agent"
# # )
# # EveningNotifierAgent = Agent(
# #     name="Evening Notifier Agent"
# # )
# # NotifierAgent = Agent(
# #     name="Notifier Agent"
# # )

# # fund_agent_if_low(MorningNotifierAgent.wallet.address())
# # fund_agent_if_low(AfternoonNotifierAgent.wallet.address())
# # fund_agent_if_low(EveningNotifierAgent.wallet.address())
# # fund_agent_if_low(NotifierAgent.wallet.address())

# # class NotificationRequest(Model):
# #     pass

# # notification_protocol = Protocol(
# #     name="Notification Protocol",
# #     version="1.0"
# # )

# # @notification_protocol.on_message(model=NotificationRequest)
# # async def handle_request(ctx: Context, sender: str):
# #     await ctx.send(sender, BroadcastExampleResponse(text=f"Hello from {ctx.name}"))

# # MorningNotifierAgent.include(notification_protocol)
# # AfternoonNotifierAgent.include(notification_protocol)
# # EveningNotifierAgent.include(notification_protocol)

# # @NotifierAgent.on_interval(5)
# # async def send_notifications(ctx: Context):
# #     await ctx.broadcast(notification_protocol.digest, message=NotificationRequest())

# # NotifierAgent.include(notification_protocol)

# # @MorningNotifierAgent.on_event("startup")
# # async def send_notifications(ctx: Context):
# #     now = datetime.now().time() 
# #     start_time = time(9, 0)
# #     end_time = time(9, 59, 59)
# #     if start_time <= now and now <= end_time:
# #         data = pd.read_csv("data.csv")
# #         for row in data.iterrows():
# #             if int(row.frequency) >= 2:
# #                 await ctx.broadcast(notification_protocol.digest, message=WhatsAppDetails(whatsapp_no = row.whatsapp_no))

# from uagents import Agent, Bureau, Context, Model, Protocol
# from uagents.setup import fund_agent_if_low
 
# # create agents
# # alice and bob will support the protocol
# # charles will try to reach all agents supporting the protocol
# alice = Agent(name="alice", seed="alice recovery phrase")
# bob = Agent(name="bob", seed="bob recovery phrase")
# charles = Agent(name="charles", seed="charles recovery phrase")
 
# fund_agent_if_low(alice.wallet.address())
# fund_agent_if_low(bob.wallet.address())
# fund_agent_if_low(charles.wallet.address())
 
# class BroadcastExampleRequest(Model):
#     pass
# class BroadcastExampleResponse(Model):
#     text: str
 
# # define protocol
# proto = Protocol(name="proto", version="1.0")
 
# @proto.on_message(model=BroadcastExampleRequest, replies=BroadcastExampleResponse)
# async def handle_request(ctx: Context, sender: str, _msg: BroadcastExampleRequest):
#     await ctx.send(sender, BroadcastExampleResponse(text=f"Hello from {ctx.name}"))
 
# # include protocol
# # Note: after the first registration on the almanac smart contract, it will
# # take about 5 minutes before the agents can be found through the protocol
# alice.include(proto)
# bob.include(proto)
 
# # let charles send the message to all agents supporting the protocol
# @charles.on_interval(period=5)
# async def say_hello(ctx: Context):
#     await ctx.broadcast(proto.digest, message=BroadcastExampleRequest())
 
# @charles.on_message(model=BroadcastExampleResponse)
# async def handle_response(ctx: Context, sender: str, msg: BroadcastExampleResponse):
#     ctx.logger.info(f"Received response from {sender}: {msg.text}")