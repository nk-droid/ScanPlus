from uagents import Model
from typing import Optional, List
from datetime import date

class Medicine(Model):
    name: str
    frequency: Optional[str]
    dosage: Optional[str]
    duration: Optional[str]

class Test(Model):
    test: str

class NERResponse(Model):
    medicines: Optional[List[Medicine]]
    tests: Optional[List[Test]]
    prescription_date: Optional[date]

class OCRResponse(Model):
    text: str

class GeneralQueryResponse(Model):
    answer: str