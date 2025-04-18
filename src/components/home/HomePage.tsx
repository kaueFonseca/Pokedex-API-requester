import { useState, useEffect } from "react";
import ButtonLoadMore from "./ButtonLoadMore";
import PokeCard from "./PokeCard";
import styled from "styled-components";
import "../../style/home.css";
import ButtonSearchType from "../home/ButtonSearchType";
import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  url: string;
}

const itemsPerPage = 30;

const HomePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
        );
        const data = await response.json();

        setPokemons((prev) => {
          const newPokemons = data.results.filter(
            (newPoke: Pokemon) => !prev.some((poke) => poke.name === newPoke.name)
          );
          return [...prev, ...newPokemons];
        });

        setHasMore(data.results.length === itemsPerPage);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
      setLoading(false);
    };

    fetchPokemons();
  }, [offset]);

  useEffect(() => {
    if (!selectedType) return;

    const fetchPokemonsByType = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const data = await response.json();
        const filteredPokemons = data.pokemon.map((p: any) => p.pokemon);

        setPokemons(filteredPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon by type:", error);
      }
      setLoading(false);
    };

    fetchPokemonsByType();
  }, [selectedType]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + itemsPerPage);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <Header className="header-container">
        <TitleH1 className="poketitle">Pokédex</TitleH1>
        <DivHeader>
          <TitleH2>Find Your</TitleH2>
          <Th2>Favorite Pokémon</Th2>
          <DivSearchBar>
            <SearchButton>
              <img
                src="src/assets/search-svgrepo-com.svg"
                width={16}
                alt="search icon"
              />
            </SearchButton>
            <InputSearch
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </DivSearchBar>
          <div>
            <ButtonSearchType onSelectType={setSelectedType} />
          </div>
        </DivHeader>
      </Header>

      <Section>
        <UL>
          {filteredPokemons.map((poke) => {
            const pokemonId = poke.url.split("/").slice(-2, -1)[0];
            return (
              <StyledLink key={pokemonId} to={`/pokemon/${pokemonId}`}>
                <PokeCard name={poke.name} url={poke.url} />
              </StyledLink>
            );
          })}
        </UL>
        {hasMore && <ButtonLoadMore onClick={handleLoadMore} isLoading={loading} hasMore={hasMore} />}
      </Section>
    </div>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Header = styled.header`
  background-color: #ff5656;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;

  @media (min-width: 1205px) {
    padding: 24px;
  }
`;

const TitleH1 = styled.h1`
  font-size: 22px;
  font-weight: 400;
  color: #f9f9f9;
  text-align: start;
  padding: 0 0 90px 30px;
`;

const TitleH2 = styled.h2`
  font-size: 30px;
  font-weight: 500;
  color: #f9f9f9;
  text-align: start;
  padding: 0;
  line-height: 1;
`;

const Th2 = styled.h2`
  font-size: 30px;
  font-weight: 500;
  color: #f9f9f9;
  text-align: left;
  padding: 0;
`;

const DivHeader = styled.div`
  max-width: 100%;
`;

const DivSearchBar = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  margin-top: 5px;
`;

const InputSearch = styled.input`
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  padding: 5px;
  border: none;
  border-radius: 0 20px 20px 0;
`;

const SearchButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 20px 0 0 20px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;

  &:focus-visible {
    border: none;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #ff5656;
`;

const UL = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 20px 16px;
  border-radius: 60px 60px 0 0;
`;

export default HomePage;
