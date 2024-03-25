import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FetchPokemonData from "./components/FetchPokemonData";
import './App.css';

const App = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(response => {
                setPokemonList(response.data.results); // This contains an array of Pokémon { name, url }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch Pokémon list', error);
                setError('Failed to fetch Pokémon list');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading Pokémon list...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="pokemon-grid">
            {pokemonList.map((pokemon, index) => (
                <FetchPokemonData key={index} pokemonName={pokemon.name} />
            ))}
        </div>
    );
};

export default App;