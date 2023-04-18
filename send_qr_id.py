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
ref = db.reference('qr_code_request')

# set the value to 1
ref.set(2)

print("Value successfully written to the database!")