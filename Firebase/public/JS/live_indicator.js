import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function updateLiveIndicator() {
    if (window.location.pathname.includes('home.html')) {
        // Get a reference to the video state
        const videoStateRef = ref(database, "video_state");

        // Get a reference to the live indicator and live dot elements
        const liveIndicator = document.querySelector("#live-indicator");
        const liveDot = liveIndicator.querySelector(".live-dot");

        // Listen for changes to the video state
        onValue(videoStateRef, (snapshot) => {
            const videoState = snapshot.val();
            if (videoState === 1) {
                console.log(liveDot);
                liveDot.style.opacity = 1;
            } else {
                liveDot.style.opacity = 0;
            }
        });
    }
}

// Listen for the headerLoaded event and call updateLiveIndicator
document.addEventListener('headerLoaded', updateLiveIndicator);
