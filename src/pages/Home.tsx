import { useState, useEffect } from "react";
import ButtonLoadMore from "../components/ButtonLoadMore";

interface Pokemon {
  name: string;
  url: string;
}

const itemsPerPage = 30;

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
        );
        const data = await response.json();

        setPokemons((prev) => [...prev, ...data.results]);
        setHasMore(data.results.length === itemsPerPage);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
      setLoading(false);
    };

    fetchPokemons();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + itemsPerPage);
  };
  const getPokemonId = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  return (
    <div>
      <h1>Pokémon's List</h1>
      <ul>
        {pokemons.map((poke, index) => {
          const id = getPokemonId(poke.url);
          return (
            <li key={index}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={poke.name}
                width={80}
                height={80}
              />
              <p>{poke.name}</p>
            </li>
          );
        })}
      </ul>
      <ButtonLoadMore onClick={handleLoadMore} isLoading={loading} hasMore={hasMore} />
    </div>
  );
};

export default Home;
