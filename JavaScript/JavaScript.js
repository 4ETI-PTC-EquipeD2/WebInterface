import * as L from './Logs.js';
import * as Pokemon from './Pokemon.js';
/*function enterCommand(event) {
    // Function to enter command
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        text="<br>"+document.getElementById("commandLine").value;
        event.preventDefault();
        writeToLogs(text);
        document.getElementById("commandLine").value = "";
    console.log("Oui")
  } 
}

async function loadJson(FichierName) { //Function to load JSON zarbi,métamorph,évolie,tortipouss,dracofeu,
    let contenu_json = [];
    await fetch(FichierName)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            contenu_json = json;
        })
    return contenu_json;
}

async function showPokemon(id){// Function to show a pokemon both in CLI and in canvas
    contenu_json= await loadJson("../JSON/pokemon.json");
    pokemon=contenu_json[id];
    img_name=pokemon["image"];
    img_name="../IMAGES/"+img_name;
    drawImages("imPokemon",img_name);
    text="<br>" + pokemon["name"] + " has appeared!"
    writeToLogs(text)
}

function drawImages(id, img_name) { //Function that draw the given image name int the canvas of given id.
    let pokemon_img = new Image();
    pokemon_img.onload = () => {
        canvas = document.getElementById(id);
        context = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(pokemon_img, 0, 0, canvas.width, canvas.height);
    }
    pokemon_img.src = img_name;
}

function writeToLogs(text) {
    var logs = document.getElementsByClassName("logs")[0].innerHTML;
    logs+= text
    document.getElementsByClassName("logs")[0].innerHTML = logs;
}
*/
function loader() {
    fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
            let liens = document.querySelectorAll("nav a");
            liens.forEach(a => {
                if (a.href == location.protocol + '//' + location.host + location.pathname)
                    a.classList.add('active');
            });
        });
    }

loader();
//debugger
let Logs = new L.logs();
let tiplouf = new Pokemon.pokemon(Logs,0);
tiplouf.showPokemon("imPokemon");
// let contenu_json=loadJson("../JSON/pokemon.json");
// console.log(contenu_json)

// Execute a function when the user presses a key on the keyboard
// var divCommand = document.getElementsByClassName("command")[0];
// divCommand.addEventListener("keypress", function(event) {
//     enterCommand(event);
//   }); 