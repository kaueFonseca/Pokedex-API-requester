export const getPokemonApi = async () => {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in fetching Pokémon API:", error);
    return [];
  }
};

export const getPokemonTypes = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
    return [];
  }
};

export const getPokemonsByType = async (type: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return data.pokemon.map((p: any) => p.pokemon);
  } catch (error) {
    console.error(`Error fetching Pokémon by type (${type}):`, error);
    return [];
  }
};

export const getPokemonID = async (id: number) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon${id}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in fetching Pokémon API:", error);
    return [];
  }
};

getPokemonID(1).then((data) => console.log(data));
