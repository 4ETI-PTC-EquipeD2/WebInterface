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
        if(this.encounter!=null){
            let text="Vous fuyez " + this.encounter.name;
            this.logs.write(text);
            this.logs.clearImage("imPokemon");
            this.encounter=null;
        }
        else{
            this.logs.write("Il n'y a pas de pokémons...")
        }
    }
    attaque(idAttaque){
        if(this.encounter!=null){
            let text="Vous utilisez "+idAttaque+" " + this.encounter.name;
            this.logs.write(text);
            this.logs.clearImage("imPokemon");
        //Enlever des hp
        }
        else{
            this.logs.write("Il n'y a pas de pokémons...")
        }
    }
    capturer(){
        if(this.encounter!=null){
            let text="Vous capturez "+ this.encounter.name;
            this.logs.write(text);
            this.logs.clearImage("imPokemon");
            this.encounter=null;
        //TODO
        }
        else{
            this.logs.write("Il n'y a pas de pokémons...")
        }
    }
    
}