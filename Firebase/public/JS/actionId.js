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

// Get a reference to your Firebase Realtime Database
const database = getDatabase(app);
const attackButtons = Array.from(document.querySelectorAll(".attaques button"));
const utilityButtons = Array.from(document.querySelectorAll(".utilty button"));

function handleButtonClick(event) {
    const button = event.target;
    let action_id;

    if (attackButtons.indexOf(button) !== -1) {
        action_id = attackButtons.indexOf(button) + 1;
    } else if (utilityButtons.indexOf(button) !== -1) {
        action_id = utilityButtons.indexOf(button) + 5;
    }

    const action_idRef = ref(database, "action_id");
    set(action_idRef, action_id);
}

attackButtons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
});

utilityButtons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
});
