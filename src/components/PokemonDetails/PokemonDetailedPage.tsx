import "../../style/App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonID } from "../../services/pokemonService";
import GoBackToHomeButton from "./GoBackToHomeButton/GoBackToHomeButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSwipeable } from "react-swipeable";

const sections = [
  { id: "about", label: "Sobre" },
  { id: "types", label: "Tipos" },
  { id: "abilities", label: "Habilidades" },
  { id: "stats", label: "Stats" },
  { id: "moves", label: "Movimentos" },
];

const PokemonDetailedPage = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemonID(Number(id));
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => Math.min(prev + 1, sections.length - 1)),
    onSwipedRight: () => setIndex((prev) => Math.max(prev - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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
            {pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default && (
              <img width={100} src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemon.name} />
            )}
          </div>
        ) : (
          <p>Carregando...</p>
        )}

        {/* Tabs para Desktop / Swipe para Mobile */}
        {!isMobile ? (
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="flex gap-2">
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="about">
              <p>Altura: {pokemon?.height}</p>
              <p>Peso: {pokemon?.weight}</p>
              <p>Experiência base: {pokemon?.base_experience}</p>
            </TabsContent>

            <TabsContent value="types">
              <h2>Tipos</h2>
              <ul>
                {pokemon?.types.map((type: any) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="abilities">
              <h2>Habilidades</h2>
              <ul>
                {pokemon?.abilities.map((ability: any) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="stats">
              <h2>Stats</h2>
              <ul>
                {pokemon?.stats.map((stat: any) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="moves">
              <h2>Movimentos</h2>
              <ul>
                {pokemon?.moves.slice(0, 10).map((move: any) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        ) : (
          <div {...handlers} className="overflow-hidden w-full">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${index * 100}%)` }}>
              <div className="w-full min-w-full p-4">
                <h2>Sobre</h2>
                <p>Altura: {pokemon?.height}</p>
                <p>Peso: {pokemon?.weight}</p>
                <p>Experiência base: {pokemon?.base_experience}</p>
              </div>
              <div className="w-full min-w-full p-4">
                <h2>Tipos</h2>
                <ul>
                  {pokemon?.types.map((type: any) => (
                    <li key={type.type.name}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full min-w-full p-4">
                <h2>Habilidades</h2>
                <ul>
                  {pokemon?.abilities.map((ability: any) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full min-w-full p-4">
                <h2>Stats</h2>
                <ul>
                  {pokemon?.stats.map((stat: any) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full min-w-full p-4">
                <h2>Movimentos</h2>
                <ul>
                  {pokemon?.moves.slice(0, 10).map((move: any) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Indicadores (pontos de navegação) */}
            <div className="flex justify-center gap-2 mt-2">
              {sections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-500" : "bg-gray-300"}`}
                ></button>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PokemonDetailedPage;
