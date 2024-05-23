from flask import Flask, make_response, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
api = Api(app)

class UploadPrescription(Resource):
    def post(self):
        image = request.files['image']
        print(image)

class Result(Resource):
    def get(self):
        pass

class AskMe(Resource):
    def get(self):
        pass

api.add_resource(UploadPrescription, '/api/upload_prescription')
api.add_resource(AskMe, '/api/askme')
api.add_resource(Result, '/api/result')

if __name__ == '__main__':
    app.run()