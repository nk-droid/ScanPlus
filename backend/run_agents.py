from uagents import Bureau
from agents import (
    OCRAgent,
    NERAgent,
    GeneralQueryAgent
)

bureau = Bureau(endpoint="http://127.0.0.1:8000/submit", port=8000)
bureau.add(NERAgent)
bureau.add(OCRAgent)
bureau.add(GeneralQueryAgent)

if __name__ == '__main__':
    print(f"Address NERAgent: {NERAgent.address}")
    print(f"Address OCRAgent: {OCRAgent.address}")
    print(f"Address GeneralQueryAgent: {GeneralQueryAgent.address}")
    bureau.run()