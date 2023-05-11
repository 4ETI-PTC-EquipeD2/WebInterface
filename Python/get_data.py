import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Note: The path to the JSON file is different on your computer
cred = credentials.Certificate("/Users/mathisgorvien/Desktop/projet-pokemon-9145b-firebase-adminsdk-pyblk-c58d839000.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://projet-pokemon-9145b-default-rtdb.europe-west1.firebasedatabase.app/'
})

def listener(event):
    # This function will be called every time `action_id` changes
    print(event.data)  # `event.data` contains the new value of `action_id`

action_id_ref = db.reference('action_id')
action_id_ref.listen(listener)