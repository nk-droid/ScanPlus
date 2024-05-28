import csv
from models import db, User, Prescripcine
from datetime import datetime, timedelta

def add_days_to_date(date, days):
    new_date = date + timedelta(days=int(days))
    return new_date

def create_csv(file_path):
    query = db.session.query(User.whatsapp_no, Prescripcine.frequency)\
        .join(Prescripcine, User.id == Prescripcine.user_id)\
        .filter(db.func.date('now') <= db.func.date(add_days_to_date(Prescripcine.date, Prescripcine.duration))).all()
    
    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["whatsapp_no", "frequency"])
        writer.writerows(query)