import "../../style/App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonID } from "../../services/pokemonService";
import GoBackToHomeButton from "./GoBackToHomeButton/GoBackToHomeButton";
import { getPokemonDescription } from "../../services/pokemonService";
import styled from "styled-components";

const PokemonDetailedPage = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemonID(Number(id));
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  useEffect(() => {
    const fetchDescription = async () => {
      const desc = await getPokemonDescription(Number(id));
      setDescription(desc);
    };
    fetchDescription();
  }, [id]);

  return (
    <>
      <Header>
        <Nav>
          <GoBackToHomeButton />
          {pokemon ? <H1>{pokemon.name} <H1span>{pokemon.id}</H1span></H1> : <p>Carregando...</p>}

        </Nav>
        {pokemon ? (
          <div>
            {pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default && (
              <img width={100} src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemon.name} />
            )}
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <ul>
          {pokemon?.types.map((type: any) => (
            <LItypes key={type.type.name}>{type.type.name}</LItypes>
          ))}
        </ul>
      </Header>


      <main>

        <p>{description}</p>
        <p>Altura: {pokemon?.height}</p>
        <p>Peso: {pokemon?.weight}</p>
        <p>Experiência base: {pokemon?.base_experience}</p>


        <h2>Habilidades</h2>
        <ul>
          {pokemon?.abilities.map((ability: any) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>

        <h2>Stats</h2>
        <ul>
          {pokemon?.stats.map((stat: any) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>

        <h2>Movimentos</h2>
        <ul>
          {pokemon?.moves.slice(0, 10).map((move: any) => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

const Header = styled.header`
  background: linear-gradient(to bottom, #ffeb3b, #ffffff); 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px
`
const H1 = styled.h1`
  color: white;
  font-size: 22px;
  font-weight: 400;
  text-transform: capitalize;
  text-align: center;
  padding-left: 20px;
`

const H1span = styled.span`
  color: white;
  font-size: 20px;
  font-weight: 400;
  text-transform: capitalize;
  text-align: center;
  padding-left: 20px;

  &:before{
  content: 'ⵌ';
  }
`

const LItypes = styled.li`
background: #fff;
color: #000;
border-radius: 22px;
padding: 3px 10px;
margin: 5px;
text-transform: capitalize;
text-align: center;
list-style: none;
`
export default PokemonDetailedPage;
