from pydantic import BaseModel

class OCRRequest(BaseModel):
    prescription: str