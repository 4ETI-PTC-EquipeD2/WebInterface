import * as poke from './Pokemon.js';
//Class representing the robot. He can encounter pokemon and then realise actien on them.
export class Dresseur{
    constructor(Logs){
        this.hp=3;
        this.logs=Logs;
        this.encounter=null;
        this.logs.addDresseur(this);
    }
    rencontre(id){
        this.encounter = new poke.pokemon(this.logs,id);
        this.encounter.showPokemon("imPokemon");
    }
    fuite(){
        let text="Vous fuyez " + this.encounter.name;
        this.logs.write(text);
        this.logs.clearImage("imPokemon");
        this.encounter=null;
    }
    attaque(){
        let text="Vous attaquez " + this.encounter.name;
        this.logs.write(text);
        this.logs.clearImage("imPokemon")
        //Enlever des hp
    }
    
}