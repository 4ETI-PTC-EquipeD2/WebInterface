import * as L from '../JS/Logs.js';
import * as Pokemon from '../JS/Pokemon.js';
import * as D from '../JS/Dresseur.js';

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, push, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcvNxiU54UY-JRAKpn9e5AIEm5HuhaqSE",
  authDomain: "projet-pokemon-9145b.firebaseapp.com",
  databaseURL: "https://projet-pokemon-9145b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projet-pokemon-9145b",
  storageBucket: "projet-pokemon-9145b.appspot.com",
  messagingSenderId: "350577809653",
  appId: "1:350577809653:web:704206a9e3a2c7f4fe0dbc",
  measurementId: "G-TLYG5H7X6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const qrCodeRequestRef = ref(database, 'qr_code_request');

// Attach an event listener to the 'value' event on 'qr_code_request' node
onValue(qrCodeRequestRef, (snapshot) => {
    // Get the value of 'qr_code_request' from the snapshot
const qrCodeRequestValue = snapshot.val();
});


let Logs = new L.logs();

Logs.defListener();
// let tiplouf = new Pokemon.pokemon(Logs,0);
// tiplouf.showPokemon("imPokemon");
let Dresseur = new D.Dresseur(Logs);
Dresseur.rencontre(0);
Dresseur.fuite();