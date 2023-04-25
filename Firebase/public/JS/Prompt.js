export class Prompt{
    constructor(){
        this.FileName="../JSON/pokemon.json"
    }
    drawImages(id, img_name) { //Function that draw the given image name int the canvas of given id.
    let pokemon_img = new Image();
    console.log(id,"canvas_id")
    pokemon_img.onload = () => {
        let canvas = document.getElementById(id);
        let context = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(pokemon_img, 0, 0, canvas.width, canvas.height);
    }
    pokemon_img.src = img_name;
    }

    clearImage(id){ //Fonction qui clear le canvas
        let canvas = document.getElementById(id);
        let context = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    async loadJson(FichierName,id) { //Function to load JSON zarbi,métamorph,évolie,tortipouss,dracofeu,
        let contenu_json = [];
        await fetch(FichierName)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                contenu_json = json;
            })
        console.log(contenu_json[id],"Pourtant ça devrait?")
        return contenu_json[id];
    }
}

