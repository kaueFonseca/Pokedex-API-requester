import { useState, useEffect } from "react";
import ButtonLoadMore from "../components/ButtonLoadMore";
import styled from "styled-components";

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
      <Header>
        <TitleH1>Pokédex</TitleH1>
        <div>
        <TitleH2>Find Your</TitleH2>
        <Th2>Favorite Pokémon</Th2>
          <button>O</button><input type="text" />
        </div>

      </Header>

      <Section>
        <UL>
          {pokemons.map((poke, index) => {
            const id = getPokemonId(poke.url);
            return (
              <LI key={index}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={poke.name}
                  width={90}
                  height={90}
                />
                <p>{poke.name}</p>
              </LI>
            );
          })}
        </UL>
        <ButtonLoadMore onClick={handleLoadMore} isLoading={loading} hasMore={hasMore} />
      </Section>
    </div>
  );
};

const Header = styled.header`
    color: #fff;
    background-color: red;
    text-align: center;
    height: 300px;
    border-radius: 0 0 50px 50px;
    display: flex;
    flex-direction: column;
`;

const TitleH1 = styled.h1`
    font-size: 22px;
    font-weight: 400;
    color: #fff;
    text-align: start;
    padding: 10px;
    padding-bottom: 90px;
`;
const TitleH2 = styled.h2`
    font-size: 30px;
    font-weight: 500;
    color: #fff;
    text-align: start;
    padding: 0 60px;
    line-height: 1;
`;
const Th2 = styled.h2`
    font-size: 30px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    padding: 0 20px;
    
`;

const UL = styled.ul`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const LI = styled.li`
  background-color: #f1f1f1;
  list-style: none;
  margin: 15px;

  &:hover{
    cursor: pointer;
    background-color: rgb(210, 210, 210);
  }
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 1206px;
    margin: 0 auto;
`;

export default Home;
