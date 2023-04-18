### This file is used to set values in the database

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON object from the Firebase console
# and copy its content into a variable named `firebase_config`.

cred = credentials.Certificate("projet-pokemon-9145b-firebase-adminsdk-4e9xr-f448ae4119.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://projet-pokemon-9145b-default-rtdb.europe-west1.firebasedatabase.app/'
})

# Create a new reference for qr_code_id
ref = db.reference('qr_code_id')

# Create a json object with the key and value (int from 1 to 10) with the name of the pokemon
# The key is the id of the pokemon

for i in range(1, 3):
    data = {
        "id": i,
        "name": "Pikachu"
    }

    # Set the value of the child node with the pokemon id as the key
    ref.child(str(i)).set(data)

print("Value successfully written to the database!")