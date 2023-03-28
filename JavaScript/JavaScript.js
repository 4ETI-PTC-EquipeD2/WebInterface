function enterCommand(event) {
    // Function to enter command
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    var logs = document.getElementsByClassName("logs")[0].innerHTML;
    logs+= "<br>"+document.getElementById("commandLine").value; //Get the document.getElementById("commandLine").value for the command.
    console.log(document.getElementById("commandLine").value)
    document.getElementsByClassName("logs")[0].innerHTML = logs;
    document.getElementById("commandLine").value = "";
    console.log("Oui")
  } 
}

function loader() {
    fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
            liens = document.querySelectorAll("nav a");
            liens.forEach(a => {
                if (a.href == location.protocol + '//' + location.host + location.pathname)
                    a.classList.add('active');
            });
        });
    }

loader()

// Execute a function when the user presses a key on the keyboard
var divCommand = document.getElementsByClassName("command")[0];
divCommand.addEventListener("keypress", function(event) {
    enterCommand(event);
  }); 