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
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Get a reference to your Firebase Realtime Database
  const database = getDatabase(app);

function displayPoints() {
  // Get a reference to the "points" node in the database
  const pointsRef = ref(database, "points");

  // Listen for changes to the "points" node
  onValue(pointsRef, (snapshot) => {
    // Get the data from the snapshot
    const data = snapshot.val();

    // Clear the list of points
    const pointsList = document.getElementById("pointsList");
    pointsList.innerHTML = "";

    // Iterate over the data and add each point to the list
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const point = data[key];
        const pointItem = document.createElement("div");
        pointItem.innerHTML = `
          <h3>${point.name}</h3>
          <p>Points: ${JSON.stringify(point.points)}</p>
        `;
        pointsList.appendChild(pointItem);
      }
    }
  });
}

// Call the displayPoints function when the page loads
window.addEventListener("load", displayPoints);