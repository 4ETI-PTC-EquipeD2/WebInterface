import * as p from './Prompt.js';
export class logs extends p.Prompt {
    constructor(){
        super();
    };
    defListener(){
        console.log(this,"thisd");
        var divCommand = document.getElementsByClassName("command")[0];
        divCommand.addEventListener("keypress", (event) => {
        // Function to enter command
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            let text="<br>"+document.getElementById("commandLine").value;
            console.log(event.key,"Key");
            event.preventDefault();
            this.write(text);
            document.getElementById("commandLine").value = "";
            console.log("Oui");
    }
})
      
    }
    write(text) {
        var logs = document.getElementsByClassName("logs")[0].innerHTML;
        logs+= text
        document.getElementsByClassName("logs")[0].innerHTML = logs;
    }
}