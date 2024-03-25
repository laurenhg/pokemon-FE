import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchPokemonData.css'; // Make sure this path is correct

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
            <p>Moves: {pokemon.moves.length}</p> {/* Ensure Moves data is rendered */}
            <div>Abilities: {/* Make sure Abilities are correctly listed */}
                <ul>
                    {pokemon.abilities.map((ability, index) => (
                        <li key={index}>{ability.ability.name}</li>
                    ))}
                </ul>
            </div>
            <div>Types: {/* Adding Types data */}
                <ul>
                    {pokemon.types.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FetchPokemonData;