from uagents import Model
from typing import Optional, List
from datetime import date

class Medicine(Model):
    name: str

class NERResponse(Model):
    medicines: Optional[List[Medicine]]
    prescription_date: Optional[date]

class OCRResponse(Model):
    text: str