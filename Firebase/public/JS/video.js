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

if (window.location.pathname.includes('test.html')) {
    var videoPlayer = document.getElementById('video-player');
    const dbRef = ref(database, "video");

    onValue(dbRef, (snapshot) => {
        var data = snapshot.val();
        if (data) {
            var lastKey = Object.keys(data).pop(); // Get the last key in the data object
            var frame_base64 = data[lastKey].frame;
            var url = 'data:image/jpeg;base64,' + frame_base64;
            videoPlayer.src = url;
        }
    });
}
