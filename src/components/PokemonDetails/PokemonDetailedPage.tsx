import "../../style/App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonID } from "../../services/pokemonService";
import GoBackToHomeButton from "./GoBackToHomeButton/GoBackToHomeButton";


const PokemonDetailedPage = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemonID(Number(id));
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  return (
    <>
      <header>
        <GoBackToHomeButton />
        {pokemon ? <h1>{pokemon.name}</h1> : <p>Carregando...</p>}
      </header>
      <main>
        {pokemon ? (
          <div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={100}
            />
            <ul>
              {pokemon
                ? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
                  ? <img  width={100} src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemon.name} />
                  : "Não disponível"
                : "Carregando..."
              }
            </ul>
            <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
            <p>Experiência base: {pokemon.base_experience}</p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}

        <div>
          <h2>Tipos</h2>
          <ul>
            {pokemon
              ? pokemon.types.map((type: any) => (
                <li key={type.type.name}>{type.type.name}</li>
              ))
              : "Carregando..."}
          </ul>
        </div>
        <div>
          <h2>Habilidades</h2>
          <ul>
            {pokemon
              ? pokemon.abilities.map((ability: any) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))
              : "Carregando..."}
          </ul>

        </div>

        <div>
          <h2>Stats</h2>
          <ul>
            {pokemon
              ? pokemon.stats.map((stat: any) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))
              : "Carregando..."}
          </ul>
        </div>

        <div>
          <h2>Movimentos</h2>
          <ul>
            {pokemon
              ? pokemon.moves.map((move: any) => (
                <li key={move.move.name}>{move.move.name}</li>
              ))
              : "Carregando..."}
          </ul>
        </div>


      </main>
    </>
  );
};
export default PokemonDetailedPage;
