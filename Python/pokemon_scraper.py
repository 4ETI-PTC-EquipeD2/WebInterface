import os
import requests
from bs4 import BeautifulSoup
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0"
}

def get_image_url(pokemon_name):
    url = f"https://bulbapedia.bulbagarden.net/wiki/{pokemon_name}_(Pokémon)"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        img_tag = soup.find("a", class_="image", href=True, title=f"{pokemon_name}")

        if img_tag and img_tag.img:
            return f"https:{img_tag.img['src']}"
    return None

def download_image(pokemon_name, url, save_directory):
    response = requests.get(url, stream=True, headers=HEADERS)
    response.raise_for_status()
    
    with open(os.path.join(save_directory, f"{pokemon_name}.png"), "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

def main():
    save_directory = "Firebase/public/IMAGES"
    os.makedirs(save_directory, exist_ok=True)
    
    pokemon_names = ['Piplup', 'Chimchar', 'Turtwig', 'Pikachu', 'Charmander', 'Bulbasaur', 'Charizard', 'Squirtle', 'Jigglypuff', 'Psyduck', 'Pachirisu', 'Lapras', 'Mew', 'Mewtwo', 'Gliscor', 'Rayquaza', 'Mantine']

    # # Get the name of the pokemons from the pokemon.json file
    # with open('pokemon.json') as f:
    #     data = json.load(f)
    #     pokemon_names = [pokemon['name'] for pokemon in data]
    
    for pokemon_name in pokemon_names:
        print(f"Downloading {pokemon_name} image...")
        img_url = get_image_url(pokemon_name)
        
        if img_url:
            download_image(pokemon_name, img_url, save_directory)
            print(f"{pokemon_name} image downloaded successfully.")
        else:
            print(f"Failed to download {pokemon_name} image.")

if __name__ == "__main__":
    main()
