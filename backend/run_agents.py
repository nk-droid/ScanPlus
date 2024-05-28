from uagents import Bureau
from agents import (
    OCRAgent,
    NERAgent,
    GeneralQueryAgent,
    NotificationDataCollectorAgent,
    # alice,
    # bob,
    # charles
)

bureau = Bureau(endpoint="http://127.0.0.1:8000/submit", port=8000)
bureau.add(NERAgent)
bureau.add(OCRAgent)
bureau.add(GeneralQueryAgent)
bureau.add(NotificationDataCollectorAgent)
# bureau.add(alice)
# bureau.add(bob)
# bureau.add(charles)

if __name__ == '__main__':
    bureau.run()