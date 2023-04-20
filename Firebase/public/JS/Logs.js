import * as p from './Prompt.js';
export class logs extends p.Prompt {
    constructor(){
        super();
        this.dresseur=null;
    };
    addDresseur(Dresseur){
        this.dresseur=Dresseur;
    }
    defListener(){
        console.log(this,"thisd");
        var divCommand = document.getElementsByClassName("command")[0];
        divCommand.addEventListener("keypress", (event) => {
        // Function to enter command
        // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                let commande = document.getElementById("commandLine").value;
                let text="-"+commande;
                console.log(event.key,"Key");
                event.preventDefault();
                this.write(text);
                this.analyseCommande(commande);
                document.getElementById("commandLine").value = "";
                console.log("Oui");
            }
        })
   
    }
    analyseCommande(commande){
        commande=commande.split('_')
        console.log(commande)
        switch (commande[0]) {
            case 'fuite':
                this.dresseur.fuite();
                break;
            case 'attaque':
                this.dresseur.attaque();
                break;
            case 'encounter':
                let nb=parseInt(commande[1],10);
                console.log(nb)
                if (Object.is(nb,NaN)){
                    this.write("Erreur sur le chiffre");
                }
                else{
                    this.dresseur.rencontre(nb);
                }
                break
            default:
              this.write("La commande tapée n'existe pas.");
          }
    }
    //Add text to the Logs
    write(text) {
        var logs = document.getElementsByClassName("logs")[0].innerHTML;
        text='<br>'+text;
        logs+= text
        document.getElementsByClassName("logs")[0].innerHTML = logs;
    }
}