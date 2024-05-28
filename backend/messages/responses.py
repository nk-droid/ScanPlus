from uagents import Model
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

class Medicine(BaseModel):
    name: str = Field("Name of the medicine")
    frequency: Optional[str] = Field("Frequency of taking the medicine on a daily basis")
    dosage: Optional[str] = Field("Dosage of the medicine")
    duration: Optional[str] = Field("Duration for which the medicine has to be taken in days")

class Test(BaseModel):
    name: str = Field("Name of the test")

class NERResponse(BaseModel):
    medicines: Optional[List[Medicine]]
    tests: Optional[List[Test]]
    prescription_date: Optional[date]

class OCRResponse(BaseModel):
    text: str

class GeneralQueryResponse(BaseModel):
    answer: str