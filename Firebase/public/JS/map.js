// get the canvas element
var canvas = document.getElementById("mapCanvas");

// set the starting position of the drawing to the center of the canvas
var x = canvas.width / 2;
var y = canvas.height / 2;

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

    // store the data in a JSON object
    var data = {
        points: []
    };
    if (path._points && path._points.length > 0) {
        for (var i = 0; i < path._points.length; i++) {
        data.points.push({
            x: path._points[i].x,
            y: path._points[i].y
        });
        }
    }
    
    // create a new Blob object with the JSON data
    var json = JSON.stringify(data);
    var blob = new Blob([json], {type: "application/json"});
    
    // create a download link and simulate a click to download the file
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "map.json";
    document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);  
});
