import { useParams, Link } from "react-router-dom";


const PokemonDetailedPage = () => {
    const { id } = useParams<Record<string, string>>();
    return (
        <div>
            <h1>Pokemon Page {id}</h1>
            <Link to="/">Voltar</Link>
        </div>
    )
}

export default PokemonDetailedPage
