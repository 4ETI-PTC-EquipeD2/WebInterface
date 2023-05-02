import * as poke from './Pokemon.js';
import { getDatabase, ref, push, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

//Class representing the robot. He can encounter pokemon and then realise actien on them.
export class Dresseur{
    constructor(Logs,database){
        this.db=database;
        this.hp=3;
        this.logs=Logs;
        this.encounter=null;
        this.logs.addDresseur(this);
        this.tabAttaque=["Vive-attaque","Gros yeux","Qoeud de fer","Hurlement"]
    }
    rencontre(id){ //Fonction qui gère la rencontre d'un pokemon
        this.encounter = new poke.pokemon(this.logs,id);
        this.encounter.showPokemon("imPokemon");
    }
    fuite(){ //Fonction asscoiée au boutton fuite
        if(this.encounter!=null){
            let text="Vous fuyez " + this.encounter.name;
            this.updateAttaque(5)
            this.logs.write(text);
            this.logs.clearImage("imPokemon");
            this.encounter=null;
        }
        else{
            this.logs.write("Il n'y a pas de pokémons...")
        }
    }
    attaque(idAttaque){ //Fonction asscoiée au boutton attaque
        if(this.encounter!=null){
            let text="Vous utilisez "+this.tabAttaque[idAttaque]+" " + this.encounter.name;
            this.updateAttaque(idAttaque)
            this.logs.write(text);
            this.encounter.hp-=1;
            console.log(this.encounter.hp)
        //Enlever des hp
        }
        else{
            this.logs.write("Il n'y a pas de pokémons...");
        }
    }
    capturer(){ //Fonction asscoiée au boutton capturer
        if(this.encounter!=null){
            let text="Vous capturez "+ this.encounter.name;
            this.updateAttaque(4)
            this.logs.write(text);
            this.logs.clearImage("imPokemon");
            this.encounter=null;
        //TODO
        }
        else{
            this.logs.write("Il n'y a pas de pokémons...");
        }
    }

    updateAttaque(idAttaque){// Fonction qui met à jours sur la bdd firebase la valeur de "attaque" qui est des 0 à 3 pour les attaque, 4 pour la capture et 5 pour la fuite. -1 correspond à une valeur non attribuée.
        set(ref(this.db, 'action/'),{'attaque':idAttaque})
            .then(() => {
                console.log('Points saved successfully.');
                return true
            })
            .catch((error) => {
                console.error('Error saving points:', error);
                return false
            });
    }
    
}