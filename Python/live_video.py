import base64
import cv2
import numpy as np
from flask import Flask, render_template, Response
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

# Note: The path to the JSON file is different on your computer
cred = credentials.Certificate("/Users/mathisgorvien/Desktop/projet-pokemon-9145b-firebase-adminsdk-pyblk-c58d839000.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://projet-pokemon-9145b-default-rtdb.europe-west1.firebasedatabase.app/'
})

# Get a reference to the Firebase Realtime Database
db_ref = db.reference('video')

# Start capturing video from the webcam
camera = cv2.VideoCapture(0)

while True:
    # Read a frame from the camera
    success, frame = camera.read()
    if success:
        # Convert the frame to bytes
        frame_bytes = cv2.imencode('.jpg', frame)[1].tobytes()
        # Save the frame to the database
       # Encode the frame as base64
        frame_base64 = base64.b64encode(frame_bytes).decode('utf-8')

        # Store the frame in Firebase
        db_ref.push({'frame': frame_base64})