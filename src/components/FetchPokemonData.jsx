import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchPokemonData = ({ pokemonName }) => {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                setPokemon(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError('Error fetching Pokémon data');
                setIsLoading(false);
            });
    }, [pokemonName]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!pokemon) return null;

    return (
        <div className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Weight: {pokemon.weight}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default FetchPokemonData;