// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, push, set, onValue, onChildAdded, get } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

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

if (window.location.pathname.includes('home.html')) {

    // Get the canvas element and set its dimensions for a 6x4 grid
    var canvas = document.getElementById("mapCanvas");

    // Set the starting position of the drawing to the bottom left of the canvas
    var cellSize = 50;
    var x = cellSize / 2;
    var y = canvas.height + 5*(cellSize / 2);

    canvas.height = 6 * cellSize;
    canvas.width = 4 * cellSize;

    // Keep track of visited positions
    var visitedPositions = new Set();
    visitedPositions.add(`${x},${y}`);

    // Function to draw the grid on the canvas
    function drawGrid() {
        ctx.beginPath();
        for (var i = 0; i <= canvas.width; i += cellSize) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
        }
        for (var j = 0; j <= canvas.height; j += cellSize) {
            ctx.moveTo(0, j);
            ctx.lineTo(canvas.width, j);
        }
        ctx.strokeStyle = "lightgray";
        ctx.stroke();
    }

    // Draw the grid on the canvas
    var ctx = canvas.getContext("2d");
    drawGrid();

    // Initialize an array to store the points
    var points = [];

    // Create a path to store the points
    var path = new Path2D();
    path.moveTo(x, y);

    // Draw a circle at the starting position
    ctx.beginPath();
    ctx.arc(x, y, cellSize / 4, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    // Function to get the latest game_id
    async function getLatestGameId() {
        const gamesRef = ref(database, 'map_movement');
        const snapshot = await get(gamesRef);
        const games = snapshot.val();
        if (games) {
            return Object.keys(games).sort().pop();
        }
        return null;
    }

    // Function to listen for movement updates
    async function listenForMovements() {
        const latestGameId = await getLatestGameId();
        if (latestGameId) {
            const movementsRef = ref(database, `map_movement/${latestGameId}/movements`);
            onChildAdded(movementsRef, (snapshot) => {
                const movement = snapshot.val();
                if (movement) {
                    var newX = x, newY = y;
                    switch (movement) {
                        case 1: // Move up
                            newY -= cellSize;
                            break;
                        case 2: // Move down
                            newY += cellSize;
                            break;
                        case 3: // Move left
                            newX -= cellSize;
                            break;
                        case 4: // Move right
                            newX += cellSize;
                            break;
                        default:
                            console.error('Invalid movement:', movement);
                            return;
                    }
    
                    // Draw the last point in black if it exists
                    if (points.length > 0) {
                        var lastPoint = points[points.length - 1];
                        ctx.beginPath();
                        ctx.arc(lastPoint.x, lastPoint.y, cellSize / 4, 0, 2 * Math.PI);
                        ctx.fillStyle = "black";
                        ctx.fill();
                    }
    
                    // Update x and y to the new position
                    x = newX;
                    y = newY;
                    visitedPositions.add(`${x},${y}`);
    
                    // Redraw the grid and the robot
                    drawGrid();
    
                    // Add the new point to the path and draw the line
                    points.push({x: x, y: y});
                    path.lineTo(x, y);
                    ctx.strokeStyle = "black";
                    ctx.stroke(path);
    
                    // Draw a circle at the new position
                    ctx.beginPath();
                    ctx.arc(x, y, cellSize / 4, 0, 2*Math.PI);
    
                    if (points.length > 1) {
                        // Draw the previous point in black
                        var prevPoint = points[points.length - 2];
                        ctx.fillStyle = "black";
                        ctx.fill();
    
                        // Draw the current point in green
                        ctx.beginPath();
                        ctx.arc(x, y, cellSize / 4, 0, 2*Math.PI);
                        ctx.fillStyle = "green";
                        ctx.fill();
    
                    } else {
                        // Draw the first point in red
                        ctx.fillStyle = "red";
                        ctx.fill();
                    }
                }
            });
        } else {
            console.log("No game_id available.");
        }
    }

    // Function to draw obstacles
    function drawObstacle(obstacleX, obstacleY) {
        var obstacleCenterX = (obstacleX + 0.5) * cellSize;
        var obstacleCenterY = (obstacleY + 0.5) * cellSize;
        
        // Draw a cross as the obstacle
        ctx.beginPath();
        ctx.moveTo(obstacleCenterX - cellSize / 4, obstacleCenterY - cellSize / 4);
        ctx.lineTo(obstacleCenterX + cellSize / 4, obstacleCenterY + cellSize / 4);
        ctx.moveTo(obstacleCenterX - cellSize / 4, obstacleCenterY + cellSize / 4);
        ctx.lineTo(obstacleCenterX + cellSize / 4, obstacleCenterY - cellSize / 4);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Function to listen for obstacle updates
    async function listenForObstacles() {
        const latestGameId = await getLatestGameId();
        if (latestGameId) {
            const obstaclesRef = ref(database, `map_movement/${latestGameId}/obstacles`);
            onChildAdded(obstaclesRef, (snapshot) => {
                const obstaclePosition = snapshot.val();
                if (obstaclePosition && obstaclePosition.length === 2) {
                    drawObstacle(obstaclePosition[0], obstaclePosition[1]);
                } else {
                    console.error('Invalid obstacle position:', obstaclePosition);
                }
            });
        } else {
            console.log("No game_id available.");
        }
    }

    function reset() {
        // Clear the canvas by deleting the old points and initializing the path
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Call the listenForObstacles function
    listenForObstacles();

    // Call the listenForMovements function
    listenForMovements();
}

if (window.location.pathname.includes('historique.html')){
    const cellSize = 50;  // to match the size of the cells in the other map

    async function displayGame(gameId) {
        // get the movements and obstacles for this game
        const movementsRef = ref(database, `map_movement/${gameId}/movements`);
        const obstaclesRef = ref(database, `map_movement/${gameId}/obstacles`);

        const [movementsSnapshot, obstaclesSnapshot] = await Promise.all([
            get(movementsRef),
            get(obstaclesRef),
        ]);

        const movements = movementsSnapshot.val();
        const obstacles = obstaclesSnapshot.val();

        // create a new canvas element for this set of movements
        var canvas = document.createElement("canvas");
        canvas.classList.add("canvas-map");

        // get the context for the canvas
        var ctx = canvas.getContext("2d");

        // create a new path for the movements
        var path = new Path2D();
        var x = cellSize / 2;
        var y = canvas.height + 5*(cellSize / 2);

        canvas.width = 4 * cellSize;
        canvas.height = 6 * cellSize;

        // Draw a red circle at the starting position
        ctx.beginPath();
        ctx.arc(x, y, cellSize / 4, 0, 2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        // Function to draw the grid on the canvas
        function drawGrid() {
            ctx.beginPath();
            for (var i = 0; i <= canvas.width; i += cellSize) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
            }
            for (var j = 0; j <= canvas.height; j += cellSize) {
                ctx.moveTo(0, j);
                ctx.lineTo(canvas.width, j);
            }
            ctx.strokeStyle = "lightgray";
            ctx.stroke();
        }

        // Draw the grid on the canvas
        drawGrid();

        // Initialize an array to store the points
        var points = [];

        // loop over the movements and add them to the path
        Object.keys(movements).forEach((key, i) => {
            if (i === 0) {
                path.moveTo(x, y);
            }

            switch (movements[key]) {
                case 1: // Move up
                    y -= cellSize;
                    break;
                case 2: // Move down
                    y += cellSize;
                    break;
                case 3: // Move left
                    x -= cellSize;
                    break;
                case 4: // Move right
                    x += cellSize;
                    break;
            }
            path.lineTo(x, y);

            // Add the new point to the points array
            points.push({x: x, y: y});

            // Draw a circle at the new position
            ctx.beginPath();
            ctx.arc(x, y, cellSize / 4, 0, 2*Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
        });

        // Draw a green circle at the last position
        ctx.beginPath();
        const lastPoint = points[points.length - 1];
        ctx.arc(lastPoint.x, lastPoint.y, cellSize / 4, 0, 2*Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();

        // draw the path on the canvas
        ctx.strokeStyle = "black";
        ctx.stroke(path);

        // draw the obstacles if there are any
        if (obstacles) {
            Object.keys(obstacles).forEach((key) => {
                const [obstacleX, obstacleY] = obstacles[key];
                const obstacleCenterX = (obstacleX + 0.5) * cellSize;
                const obstacleCenterY = (obstacleY + 0.5) * cellSize;

                // Draw a cross as the obstacle
                ctx.beginPath();
                ctx.moveTo(obstacleCenterX - cellSize / 4, obstacleCenterY - cellSize / 4);
                ctx.lineTo(obstacleCenterX + cellSize / 4, obstacleCenterY + cellSize / 4);
                ctx.moveTo(obstacleCenterX - cellSize / 4, obstacleCenterY + cellSize / 4);
                ctx.lineTo(obstacleCenterX + cellSize / 4, obstacleCenterY - cellSize / 4);
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        }

        // create a container for the game
        var gameContainer = document.createElement("div");
        gameContainer.classList.add("game-container");

        // create a title element for the game
        var title = document.createElement("h2");
        title.textContent = `Run: ${gameId}`;
        gameContainer.appendChild(title);

        gameContainer.appendChild(canvas);

        // add the game container to the pointsContainer div
        var pointsContainer = document.getElementById("pointsContainer");
        pointsContainer.appendChild(gameContainer);
    }

    async function loadGamesFromFirebase() {
        // get a reference to the map_movement node in the database
        const mapMovementRef = ref(database, 'map_movement');

        // get the data for the map_movement node
        const snapshot = await get(mapMovementRef);

        // get the value of the data
        const data = snapshot.val();

        // loop over the games and display each one
        Object.keys(data).forEach(gameId => {
            displayGame(gameId);
        });
    }

    // call loadGamesFromFirebase when the page loads
    window.onload = loadGamesFromFirebase;
}