export const getPokemonApi = async () => {
  try {
    const url = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const response = await url.json();
    return response.results;
  } catch (error) {
    console.log("Error in fetching Pokemon API:", error);
    return [];
  }
};

