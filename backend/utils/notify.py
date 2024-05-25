from twilio.rest import Client
import os

from dotenv import load_dotenv
load_dotenv()

def send_wa_notification(to_number, medicine_name):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    client = Client(account_sid, auth_token)

    print(account_sid, auth_token)

    message_body = f"Reminder: Time to take medicine {medicine_name}"

    try:
        message = client.messages.create(
            body=message_body,
            from_='whatsapp:+14155238886',
            to=to_number
        )
    
        print(f"Message sent successfully: {message.sid}")
    except Exception as e:
        print(f"Error sending message: {e}")

send_wa_notification()