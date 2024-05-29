from datetime import datetime, time
from twilio.rest import Client
import os

from dotenv import load_dotenv
load_dotenv()

def send_wa_notification(to_number):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    client = Client(account_sid, auth_token)

    message_body = f"Reminder: Time to take your medicines"

    try:
        message = client.messages.create(
            body=message_body,
            from_='whatsapp:+14155238886',
            to=f"whatsapp:{to_number}"
        )
    
        print(f"Message sent successfully: {message.sid}")
    except Exception as e:
        print(f"Error sending message: {e}")

def morning_notification():
    now = datetime.now().time() 
    start_time = time(8, 0)
    end_time = time(8, 59, 59)
    return start_time <= now and now <= end_time

def afternoon_notification():
    now = datetime.now().time() 
    start_time = time(16, 0)
    end_time = time(16, 59, 59)
    return start_time <= now and now <= end_time


def evening_notification():
    now = datetime.now().time() 
    start_time = time(19, 0)
    end_time = time(19,  59, 59)
    return start_time <= now and now <= end_time
