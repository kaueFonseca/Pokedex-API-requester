import "../../style/App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonID } from "../../services/pokemonService";
import GoBackToHomeButton from "./GoBackToHomeButton/GoBackToHomeButton";
import { getPokemonDescription } from "../../services/pokemonService";
import styled from "styled-components";
import { typeColors } from "../types/TypeColors";
import PokeballBackground from "../../assets/pokeball-2-bright.png";
import { lightenColor } from "../PokemonDetails/lightenPokemonColor/lightenColor";


const PokemonDetailedPage = () => {
  //Logic >>>
  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState("");
  const { id } = useParams();
  //Style >>>
  const primaryType = pokemon?.types[0]?.type?.name ?? "normal";
  const bgColor = typeColors[primaryType] || "#FFFFFF";
  const lighterColor = lightenColor(bgColor, 20);


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
      <Header bgColor={bgColor} lighterColor={lighterColor}>
        <Nav>
          <GoBackToHomeButton />
          {pokemon ? <H1>{pokemon.name} <H1span>{pokemon.id}</H1span></H1> : <p>Carregando...</p>}

        </Nav>
        <DivPokemon >
          {pokemon ? (
            <div>
              {pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default && (
                <img width={260} src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemon.name} />
              )}
            </div>
          ) : (
            <p>Carregando...</p>
          )}
          <ul>
            {pokemon?.types.map((type: any) => (
              <LItypes bgColor={bgColor} key={type.type.name}>{type.type.name}</LItypes>
            ))}
          </ul>
        </DivPokemon>
      </Header>
      <main>

        <P>{description}</P>
        <p>Altura: <span></span>{pokemon?.height} m</p>
        <p>Peso: {pokemon?.weight} kg</p>
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


const Header = styled.header<{ bgColor: string, lighterColor: string }>`
  background: linear-gradient(to top, ${(props) => props.bgColor}, ${(props) => props.lighterColor}); 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  &:before{
   content: "";
    position: absolute;
    width: 380px;
    height: 380px;
    top: 260px;
    left: 196px;
    background-image: url(${PokeballBackground});
    background-size: contain;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);
    opacity: 0.3; 
    z-index: 0;
  }
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
const DivPokemon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 100%;    
  padding: 130px 0 0 0;      
  `;
const LItypes = styled.li<{ bgColor: string }>`
background: ${(props) => props.bgColor};
color: #fff;
border-radius: 22px;
padding: 3px 10px;
margin: 5px;
text-transform: capitalize;
text-align: center;
list-style: none;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  padding: 10px 16px;
`;


export default PokemonDetailedPage;
