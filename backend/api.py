from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import asyncio
from agents import OCRRequest

from utils import (
    call_agent,
    encode_img
)

app = Flask(__name__)
CORS(app)
api = Api(app)

class UploadPrescription(Resource):
    def post(self):
        image = request.files['image']
        image.save("./backend/img.jpeg")
        req = OCRRequest(prescription=encode_img("./backend/img.jpeg"))
        r = asyncio.run(call_agent(agent_address="agent1q285wqz92xn0kckhjrar0mhx86jxn5xwtnydkrlul607lw97uhkf5jk6s7e",
                    prescription=req))
        print(r)

        
class Result(Resource):
    def get(self):
        pass

class AskMe(Resource):
    def get(self):
        pass

api.add_resource(UploadPrescription, '/api/upload_prescription')
api.add_resource(Result, '/api/result')
api.add_resource(AskMe, '/api/askme')

if __name__ == '__main__':
    app.run(port=5000)