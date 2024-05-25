from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

from utils import (
    call_ocr_agent
)

app = Flask(__name__)
CORS(app)
api = Api(app)

class UploadPrescription(Resource):
    def post(self):
        image = request.files['image']
        image.save("img.jpeg")
        r = call_ocr_agent()
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