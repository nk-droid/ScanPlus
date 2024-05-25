from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS

from utils import (
    extract_classes,
    ask_question
)

app = Flask(__name__)
CORS(app)
api = Api(app)

class UploadPrescription(Resource):
    def post(self):
        image = request.files['image']
        image.save("img.jpeg")
        r = extract_classes()
        print(r)

class AskMe(Resource):
    def post(self):
        query = request.get_json()['query']
        r = ask_question(query=query)
        return jsonify(r)

api.add_resource(UploadPrescription, '/api/upload_prescription')
api.add_resource(AskMe, '/api/askme')

if __name__ == '__main__':
    app.run(port=5000)