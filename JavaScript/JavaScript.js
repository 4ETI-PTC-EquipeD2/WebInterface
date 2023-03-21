function enterCommand(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    //document.getElementById("commandLine").click();
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
var inputCommand = document.getElementsByClassName("command")[0];
inputCommand.addEventListener("keypress", function(event) {
    enterCommand(event);
  }); 