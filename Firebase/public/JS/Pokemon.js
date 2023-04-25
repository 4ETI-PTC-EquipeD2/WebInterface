export class pokemon{
    constructor(logs,id){
        this.hp=3;
        this.logs=logs;
        this.id=id;
        this.name="";
        this.img="";
        
    }

    async load(){ // Load the JSON, and add his values to the this.name, and this.img parameters
        let contenu_json= await this.logs.loadJson("../JSON/pokemon.json",this.id);
        console.log(contenu_json,"Contenu_JSON")
        this.name=contenu_json["name"]
        this.img=contenu_json["image"]
    }

    async showPokemon(id_canvas){// Function to show a pokemon both in CLI and in canvas
        await this.load();
        var img_name="../IMAGES/"+this.img;
        console.log(this.id)
        console.log(img_name)
        this.logs.drawImages(id_canvas,img_name);
        var text=this.name + " est apparu!"
        this.logs.write(text)
    }
    
}