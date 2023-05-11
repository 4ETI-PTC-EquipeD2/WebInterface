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
video_state_ref = db.reference('video_state')

# Function to set the video state
def set_video_state(state):
    video_state_ref.set(state)

class VideoStateContext:
    def __enter__(self):
        set_video_state(1)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        set_video_state(0)

with VideoStateContext():
    # Delete the contents of video
    db_ref.delete()

    # Start capturing video from the webcam
    camera = cv2.VideoCapture(0)

    # Set the resolution
    camera.set(cv2.CAP_PROP_FRAME_WIDTH, 320/2)  # width
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 240/2)  # height

    frame_count = 0

    while True:
        # Read a frame from the camera
        success, frame = camera.read()
        if success:
            # Convert the frame to bytes
            _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 50])
            frame_bytes = buffer.tobytes()

            frame_bytes = cv2.imencode('.jpg', frame)[1].tobytes()
            # Save the frame to the database
            # Encode the frame as base64
            frame_base64 = base64.b64encode(frame_bytes).decode('utf-8')

            # Store the frame in Firebase
            db_ref.push({'frame': frame_base64})
            frame_count += 1

            # Remove old frames if there are more than 100
            if frame_count > 100:
                frame_count -= 1
                oldest_frame = db_ref.order_by_key().limit_to_first(1).get()
                oldest_key = list(oldest_frame.keys())[0]
                db_ref.child(oldest_key).delete()