from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

import pandas as pd

from utils.notify import (
    send_wa_notification,
    morning_notification,
    afternoon_notification,
    evening_notification
)

class SenderRequest(Model):
    pass

SenderAgent = Agent(
    name="Sender Agent"
)
NotifierAgent = Agent(
    name="Notifier Agent"
)

fund_agent_if_low(SenderAgent.wallet.address())
fund_agent_if_low(NotifierAgent.wallet.address())

class NotificationRequest(Model):
    pass

@SenderAgent.on_message(model=SenderRequest)
async def send_notification(ctx: Context, sender: str, msg: SenderRequest):
    data = pd.read_csv("data.csv")
    if morning_notification():
        for idx, row in data.iterrows():
            if int(row.frequency) >= 2:
                send_wa_notification(to_number=f"+{row.whatsapp_no}")
    elif afternoon_notification():
        for idx, row in data.iterrows():
            if int(row.frequency) >= 3:
                send_wa_notification(to_number=f"+{row.whatsapp_no}")
    elif evening_notification():
        for idx, row in data.iterrows():
            if int(row.frequency) >= 1:
                send_wa_notification(to_number=f"+{row.whatsapp_no}")

@NotifierAgent.on_interval(60*60)
async def call_notification_sender(ctx: Context):
    await ctx.send(SenderAgent.address, SenderRequest())