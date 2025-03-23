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
import pokeballNav from "../../assets/pokeballNav.svg"

const PokemonDetailedPage = () => {
  //State
  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState("");
  const { id } = useParams();

  //Style logic
  const primaryType = pokemon?.types[0]?.type?.name ?? "normal";
  const bgColor = typeColors[primaryType] || "#FFFFFF";
  const lighterColor = lightenColor(bgColor, 20);

  //Fetching data
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

  //JSX Rendering
  return (
    <>
      <Header bgColor={bgColor} lighterColor={lighterColor}>
        <Nav>
          <GoBackToHomeButton />
          <img src={pokeballNav} alt="Pokeball icon" />
        </Nav>
        <DivPokemonContainer>
          <div>
            {pokemon ? (
              <>
                <H1>{pokemon.name}</H1>
                <UlTypes>
                  {pokemon?.types.map((type: any) => (
                    <LItypes bgColor={bgColor} key={type.type.name}>
                      {type.type.name}
                    </LItypes>
                  ))}
                </UlTypes>
              </>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
          <div>
            {pokemon ? <H1span>{pokemon.id}</H1span> : <p>Carregando...</p>}
          </div>
        </DivPokemonContainer>
      </Header>
      <Main bgColor={bgColor}>
        <section style={{ backgroundColor: 'white', borderRadius: 22 }}>
          {pokemon ? (
            <PokemonImg >
              {pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default && (
                <img width={200} src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemon.name} />
              )}
            </PokemonImg>
          ) : (
            <p>Carregando...</p>
          )}
          <P>{description || "Descrição não disponível."}</P>
          <p>Altura: <span>{pokemon?.height} m</span></p>
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
        </section>
      </Main>
    </>
  );
};

//Styled components

const Header = styled.header<{ bgColor: string, lighterColor: string }>`
  background: linear-gradient(to top, ${(props) => props.bgColor}, ${(props) => props.lighterColor}); 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 140px;

  &:before{
    content: "";
    position: absolute;
    width: 420px;
    height: 420px;
    top: 359px;
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
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const H1 = styled.h1`
  color: white;
  font-size: 34px;
  font-weight: 600;
  text-transform: capitalize;
`;

const H1span = styled.span`
  color: white;
  font-size: 26px;
  font-weight: 400;
  text-transform: capitalize;
  text-align: center;

  &:before{
    content: 'ⵌ';
  }
`;

const DivPokemonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  width: 100%;         
  padding: 24px 0 0;
`;
const UlTypes = styled.ul`
  display:flex;
`;
const LItypes = styled.li<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: #fff;
  font-size: 14px;
  border-radius: 22px;
  padding: 3px 15px;
  margin: 5px;
  text-transform: capitalize;
  text-align: center;
  list-style: none;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  padding: 80px 16px 0;
`;
const Main = styled.main<{ bgColor: string }>`
  background-color:${(props) => props.bgColor}; 
`
const PokemonImg = styled.div`
  position: absolute;
  top: 180px;
  left: 95px;
`
export default PokemonDetailedPage;
