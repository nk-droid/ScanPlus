import csv
from models import db, User, Prescripcine
from datetime import timedelta, date 

def add_days_to_date(date, days):
    if not date:
        return date.today()+timedelta(days=1)
    if not days:
        days = 0
    new_date = date + timedelta(days=int(days))
    return new_date

def create_csv(file_path):
    details = db.session.query(User.whatsapp_no, Prescripcine.frequency, Prescripcine.date, Prescripcine.duration)\
        .join(Prescripcine, User.id == Prescripcine.user_id).all()
    
    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["whatsapp_no", "frequency", "date", "duration"])
        for detail in details:
            if date.today() <= add_days_to_date(detail.date, detail.duration):
                writer.writerow(detail)