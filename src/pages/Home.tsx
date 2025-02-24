import { useEffect, useState } from 'react'
import { getPokemonApi } from '../services/pokemonService'

interface Pokemon {
  name: string;
  url: string;
}

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await getPokemonApi();
      setPokemons(data);
    }
    loadPokemons();
  }, [])

  return (
    <div>
      <h1>Pokémon's List</h1>
      {pokemons.map((poke) => (
        <p key={poke.name}>{poke.name}</p>
      ))}
    </div>
  )
}

export default Home
