import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json

# Note: The path to the JSON file is different on your computer
cred = credentials.Certificate("/Users/mathisgorvien/Desktop/projet-pokemon-9145b-firebase-adminsdk-pyblk-c58d839000.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://projet-pokemon-9145b-default-rtdb.europe-west1.firebasedatabase.app/'
})

def send_pokemon():
    """
    Add data from the pokemon.json file to the Firebase database.
    """

    ref = db.reference('pokemon')

    # Get the latest key from the database
    if  ref.get() != None:
        num_pokemon = len(ref.get())
    else:
        num_pokemon = 0

    # Open the pokemon.json file
    with open('pokemon.json') as f:
        data = json.load(f)

    # Add each pokemon to the database
    for pokemon in data:
        ref.child(str(num_pokemon)).set(pokemon)
        num_pokemon += 1

send_pokemon()