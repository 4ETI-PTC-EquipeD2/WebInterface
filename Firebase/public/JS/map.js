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


if (window.location.pathname.includes('index.html')) {

    // get the canvas element
    var canvas = document.getElementById("mapCanvas");

    // set the starting position of the drawing to the center of the canvas
    var x = canvas.width / 2;
    var y = canvas.height / 2;

    // Initialize an array to store the points
    var points = [];

    // create a path to store the points
    var path = new Path2D();
    path.moveTo(x, y);

    // draw a circle at the starting position
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    // handle arrow key events
    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "ArrowLeft":
                x -= 10;
                break;
            case "ArrowUp":
                y -= 10;
                break;
            case "ArrowRight":
                x += 10;
                break;
            case "ArrowDown":
                y += 10;
                break;
            default:
                return;
        }

        // add the new point to the path and draw the line
        path.lineTo(x, y);
        ctx.strokeStyle = "black";
        ctx.stroke(path);

        // Store the point in the points array
        points.push({ x: x, y: y });
    });

    function savePointsToFirebase(points) {
        // Generate a unique key for the new points entry
        const pointsRef = ref(database, 'points');

        // Define a name for the points based on the current date and time
        const now = new Date();
        const name = `Trace_${now.toLocaleString().replace(/\/|,|:| /g, '_')}`;


        // Save the points to the database
        const pointsEntryRef = ref(database, 'points/' + name);
        set(pointsEntryRef, { points: points })
        .then(() => {
            console.log('Points saved successfully.');
        })
        .catch((error) => {
            console.error('Error saving points:', error);
        });
    }

    // Attach the savePointsToFirebase function to the button click event
    document.getElementById('saveButtonId').addEventListener('click', () => {
        savePointsToFirebase(points);
    });

    function loadPointsFromFirebase(key) {
        // Retrieve the points from the database using the provided key
        const pointsRef = ref(database, 'points/' + key);
        get(pointsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Recreate the path using the loaded points
                const loadedPoints = data.points;
                path = new Path2D();
                for (let i = 0; i < loadedPoints.length; i++) {
                    if (i === 0) {
                        path.moveTo(loadedPoints[i].x, loadedPoints[i].y);
                    } else {
                        path.lineTo(loadedPoints[i].x, loadedPoints[i].y);
                    }
                }
                ctx.strokeStyle = "black";
                ctx.stroke(path);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error('Error loading points:', error);
        });
    }

    // // Attach the loadPointsFromFirebase function to the button click event
    // document.getElementById('loadButtonId').addEventListener('click', () => {
    //     const key = document.getElementById("keysList").value;
    //     loadPointsFromFirebase(key);
    // });

    async function populateKeysList() {
        const pointsRef = ref(database, 'points');
        const snapshot = await get(pointsRef);
        const keysList = document.getElementById("keysList");

        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
                const option = document.createElement("option");
                option.value = key;
                option.text = key;
                keysList.add(option);
            }
        } else {
            console.log("No data available");
        }
    }
}

if (window.location.pathname.includes('historique.html')){
    function displayPoints(pointsData) {
        // create a new canvas element for this set of points
        var canvas = document.createElement("canvas");
        canvas.classList.add("canvas-map")
        canvas.width = 400;
        canvas.height = 200;
        
        // get the context for the canvas
        var ctx = canvas.getContext("2d");
    
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // create a new path for the points
        var path = new Path2D();
        
        // loop over the points and add them to the path
        var points = pointsData.points;
        for (var i = 0; i < points.length; i++) {
        if (i === 0) {
            path.moveTo(points[i].x, points[i].y);
        } else {
            path.lineTo(points[i].x, points[i].y);
        }
        }
    
        // draw the path on the canvas
        ctx.strokeStyle = "black";
        ctx.stroke(path);
    
        // add the canvas to the pointsContainer div
        var pointsContainer = document.getElementById("pointsContainer");
        pointsContainer.appendChild(canvas);
    }

    function loadPointsFromFirebase() {
        // get a reference to the points in the database
        const pointsRef = ref(database, "points");
        
        // listen for changes to the points
        onValue(pointsRef, (snapshot) => {
            // get the data for all the points
            const pointsData = snapshot.val();
        
            // check if there are any points
            if (!pointsData) {
            console.log("No points available.");
            return;
            }
        
            // loop over the points and display them
            Object.keys(pointsData).forEach((key) => {
            displayPoints(pointsData[key]);
            });
        });
        }      
      
    // Call the displayPoints function when the page loads
    window.addEventListener("load", loadPointsFromFirebase);
}