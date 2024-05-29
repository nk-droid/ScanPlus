from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token,get_jwt_identity,get_jwt
from flask_bcrypt import Bcrypt
from datetime import datetime,timedelta
from models import db, User, Test, Medicine, Prescripcine
from tzlocal import get_localzone
import os


from utils import (
    extract_classes,
    ask_question,
    create_csv
)

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "Vince-Te-Ipsum"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
app.config["JWT_ALGORITHM"] = "HS512"
app.config["SECRET_KEY"] = "secret"
app.config["timezone"] = str(get_localzone())
os.environ["timezone"] = str(get_localzone())
cors = CORS(app)
api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db.init_app(app)
with app.app_context():
  db.create_all()

@jwt.expired_token_loader
def expired_token_callback(expired_token,payload):
    # Custom response for expired token
    return jsonify({'message': 'Token has expired'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(invalid_token):
  return jsonify({"message":"Token is invalid"}),401

@jwt.unauthorized_loader
def missing_token_callback(error):
    # Custom response for missing token
    return jsonify({"message": "Token is missing"}), 401

class UploadPrescription(Resource):
    def post(self):
        image = request.files['image']
        image.save("img.jpeg")
        r = extract_classes()
        print(r)

class CreateCSV(Resource):
    def get(self):
        create_csv("data.csv")

class UploadPrescriptionWhenLoggedIn(Resource):
    @jwt_required()
    def post(self):
        image = request.files['image']
        image.save("img.jpeg")
        r = extract_classes() #call_ocr_agent()
        
        r = dict(r)
        print("ab",r)
        if r["medicines"]:
          for med in r["medicines"]:
            medicine = med["name"]
            print(medicine)
            if len(medicine)>0:
              if not Medicine.query.filter_by(name=medicine.upper()).first():
                print(Medicine.query.filter_by(name=medicine.upper()).first())
                db.session.add(Medicine(name=medicine.upper()))
          db.session.commit()

        if r["tests"]:
          for test in r["tests"]:
            test_name = test["name"]
            if len(test_name)>0:
              print(Test.query.filter_by(name=test_name.upper()).first())
              if not Test.query.filter_by(name=test_name.upper()).first():
                db.session.add(Test(name=test_name.upper()))
          db.session.commit()  

        prescription_date = datetime.strptime(r["prescription_date"], "%Y-%m-%d")
        now = datetime.now()
        user_id = get_jwt().get("user_id")
        if r["medicines"]:
          for med in r["medicines"]:
            med_id = Medicine.query.filter_by(name=med["name"].upper()).first().id
            frequency = med["frequency"]
            dosage = med["dosage"]
            duration = med["duration"]
            prescription = Prescripcine(user_id=user_id,medicine_id=med_id,frequency=frequency,dosage=dosage,duration=duration,date=prescription_date,timestamp=now)
            db.session.add(prescription)
          db.session.commit()

        if r["tests"]:
          for test in r["tests"]:
            test_id = Test.query.filter_by(name=test_name.upper()).first().id
            prescription = Prescripcine(user_id=user_id,test_id=test_id,date=prescription_date,timestamp=now)
            db.session.add(prescription)
          db.session.commit()

    @jwt_required()
    def get(self):
        user_id = get_jwt().get("user_id")
        Prescription_list = Prescripcine.query.filter_by(user_id = user_id).order_by(Prescripcine.timestamp.desc()).all()
        prescriptions = {}
        count = 0
        timestamp = None
        for prescription in Prescription_list:
          test = Test.query.get(prescription.test_id)
          medicine = Medicine.query.get(prescription.medicine_id)
          if test:
            test_name = test.name
          else:
            test_name = None
          if medicine:
            medicine_name = medicine.name
          else:
            medicine_name = None
          print(prescription)
          if timestamp == None:
            timestamp = prescription.timestamp
            count+=1
            prescriptions[count] = []
            prescriptions[count].append({"prescription_id":prescription.id,"user_id":prescription.user_id,"medicine_id":prescription.medicine_id,"test_id":prescription.test_id,"test_name":test_name,"medicine_name":medicine_name,"frequency":prescription.frequency,"dosage":prescription.dosage,"duration":prescription.duration,"date":prescription.date,"timestamp":prescription.timestamp})
          elif timestamp == prescription.timestamp:
            prescriptions[count].append({"prescription_id":prescription.id,"user_id":prescription.user_id,"medicine_id":prescription.medicine_id,"test_id":prescription.test_id,"test_name":test_name,"medicine_name":medicine_name,"frequency":prescription.frequency,"dosage":prescription.dosage,"duration":prescription.duration,"date":prescription.date,"timestamp":prescription.timestamp})
          else:
            timestamp = prescription.timestamp
            count+=1
            prescriptions[count] = []
            prescriptions[count].append({"prescription_id":prescription.id,"user_id":prescription.user_id,"medicine_id":prescription.medicine_id,"test_id":prescription.test_id,"test_name":test_name,"medicine_name":medicine_name,"frequency":prescription.frequency,"dosage":prescription.dosage,"duration":prescription.duration,"date":prescription.date,"timestamp":prescription.timestamp})
        print(prescriptions)
        return jsonify(prescriptions)
        
class Result(Resource):
    def get(self):
        pass

class AskMe(Resource):
    def post(self):
        query = request.get_json()['query']
        r = ask_question(query=query)
        return jsonify(r)

class SignupResource(Resource):
  def post(self):
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")
    firstname = request.json.get("firstname")
    lastname = request.json.get("lastname")
    whatsapp_no = request.json.get("whatsapp_no")
    if not whatsapp_no:
      whatsapp_no = 0
    # Check if username is already taken
    if User.query.filter_by(username=username,email=email).first():
      return {"message": "Username already taken"}, 400
    # Create new user
    new_user = User(username=username,email=email,firstname=firstname,lastname=lastname,password=bcrypt.generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User created successfully"}, 201

# Sign in resource
class SigninResource(Resource):
  def post(self):
    email = request.json.get("email")
    password = request.json.get("password")
    print(request.json)
    # Check if username/email and password are valid
    user = User.query.filter_by(username=email).first()
    if not user:
      user =  User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password,password):
      # Generate access token
      access_token = create_access_token(identity=user.username,additional_claims={"email":user.email,"user_id":user.id})
      return {"access_token":access_token}, 200
    elif user and not bcrypt.check_password_hash(user.password,password):
      return {"message": "Incorrect password"}, 401
    elif not user:
      return {"message":"User not found"},401   


class UserProtectedResource(Resource):
  @jwt_required()  
  def get(self):
    current_user = get_jwt_identity()
    email = get_jwt().get("email")
    id = get_jwt().get("user_id")
    return {"username": current_user, "email": email, "id": id}, 200

class UsernameCheck(Resource):
  def get(self,username):
    user=User.query.filter_by(username=username).first()
    print(User.query.all())
    if user:
      return True
    return False

class EmailCheck(Resource):
  def get(self,email):
    email=User.query.filter_by(email=email).first()
    if email:
      return True
    return False


api.add_resource(UploadPrescription, '/api/upload_prescription')
api.add_resource(UploadPrescriptionWhenLoggedIn,'/api/user/upload_prescription')
api.add_resource(Result, '/api/result')
api.add_resource(AskMe, '/api/askme')
api.add_resource(SignupResource, "/api/signup")
api.add_resource(SigninResource, "/api/signin")
api.add_resource(UserProtectedResource, "/api/protected")
api.add_resource(UsernameCheck, "/api/username/<username>")
api.add_resource(EmailCheck, "/api/email/<email>")
api.add_resource(CreateCSV, "/api/create_csv")


if __name__ == '__main__':
    app.run(port=5000)