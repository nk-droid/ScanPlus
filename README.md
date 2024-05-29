# ScanPlus - Healthcare Assistant

This project utilizes the UAgents library to provide various functionalities, including text extraction from prescription images, named entity recognition for medical information, and handling general health-related queries. The system also features agents for sending reminder notifications.

Link to uAgent Library:
- [uAgents Github Repository](https://github.com/fetchai/uAgents)
- [uAgent Documentation](https://fetch.ai/docs)
- [uAgent Examples](https://github.com/fetchai/uAgents-examples)

| Features   | Description  |
| ------------- | ------------- |
|  Prescription OCR  | Upload a prescription image, and the OCR model will read the text. |
| Medical NER  | Extracted text is processed by the NER model to detect medicine names, dosages, frequency, duration, and medical tests. |
| Health Queries | Ask any general health-related query and get an appropriate response. |
| Reminder Notifications  | Receive reminders for your medication schedule via WhatsApp. |

## Installation
To clone the repository, run the following:
```bash
git clone https://github.com/nk-droid/ScanPlus.git
```
To install the package, run the follwing command:
```bash
pip install -r requirments.txt
```
To run the flask backend, use the following commands:
```bash
cd backend
python api.py
```
To run the agents, use the following commands:
```bash
cd backend
python run_agents.py
```
Finally, run a server in access the frontend.
```bash
cd backend
python run_agents.py
```
Generate your API key using this link:

 - OpenAPI: [create API Key](https://platform.openai.com/api-keys)

 - Twilio: [create API Key](https://console.twilio.com/us1/account/keys-credentials/api-keys)

Create a .env file and provide these credentials:
```bash
OPENAI_API_KEY = <OPENAI_API_KEY>
TWILIO_ACCOUNT_SID = <TWILIO_ACCOUNT_SID>
TWILIO_AUTH_TOKEN = <TWILIO_AUTH_TOKEN>
```

## Details of Agents
**1. OCRAgent**

Function: Extracts text from prescription images.

Technology: Optical Character Recognition (OCR) model.
Usage: Upload an image of your prescription, and this agent will read and extract the text.

**2. NERAgent**

Function: Classifies extracted text into medical entities.

Technology: Named Entity Recognition (NER) model.
Entities Detected:
Medicine Name
Dosage
Frequency
Duration
Medical Tests

**3. GeneralQueryAgent**

Function: Provides answers to general medical domain-related questions.

Usage: Ask any health-related question and receive a response.

**4. DataCollectorAgent**

Function: Collects data to send WhatsApp notifications.

Output: Generates a CSV file containing user data for reminders.

**5. NotifierAgent**

Function: Calls SenderAgent to send reminders.

Usage: 

**6. SenderAgent**

Function: Sends medication reminders in morning, afternoon and evening.

Usage: Users will receive a reminder via WhatsApp every morning, afternoon and evening.

## Usage
- Uploading a Prescription: Navigate to the upload section of the system and upload an image of your prescription. The OCRAgent will process the image.

- Processing Extracted Text: The NERAgent will classify the extracted text to identify medicines, dosages, frequencies, and durations.

- Asking Health Queries: Use the query interface to ask any health-related questions.

- Receiving Notifications: Ensure your phone number is registered in the system to receive WhatsApp notifications for your medication schedule.



## Getting Started

### 1. Navigate to the Home Page (/)
Here, the page provides the following information and options:

Login: Users can log into their account.
Ask: Users can ask a medical query.
Scan: Users can upload a prescription for processing.

### 2. Navigate to the Dashboard (/dashboard)
The dashboard contains the history of OCR and NER outputs. Users can view past prescription scans and extracted data.

### 3. Sign Up Page (/signin)
New users need to fill out the following fields to create an account:

- Username

- Email

- First Name

- Last Name

- WhatsApp Number

- Password (minimum 6 characters long)
  
### 4. Login Page (/login)
Existing users can log in using:

- Email
- Password
  
### 5. Ask Query Page (/ask)
On this page, users can ask any medical-related query using a search bar interface. The system will respond with an appropriate answer from the GeneralQueryAgent.

## Notification System
A user gets notifications on their phone for the following reasons:

- Morning Reminder: A reminder to take morning medication.

- Afternoon Reminder: A reminder to take afternoon medication.

- Evening Reminder: A reminder to take evening medication.


## Meta
Mehak Singal – 21f1006390@ds.study.iitm.ac.in

Nidhish Kumar - 21f1003758@ds.study.iitm.ac.in

Richik Majumdar - 21f1005923@ds.study.iitm.ac.in
