from uagents import Model

class OCRRequest(Model):
    prescription: str

class GeneralQueryRequest(Model):
    query: str