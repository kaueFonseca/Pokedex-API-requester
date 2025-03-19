import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PokemonDetailedPage from "../components/PokemonDetails/PokemonDetailedPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetailedPage />} />
    </Routes>
  );
};

export default AppRoutes;
