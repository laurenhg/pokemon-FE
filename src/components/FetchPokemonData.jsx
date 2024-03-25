import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchRandomPokemon() {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchRandomPokemon = async () => {
            try {

                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1&offset=' + Math.floor(Math.random() * 1118));

                const randomPokemon = response.data.results[0];

                const pokemonDetailsResponse = await axios.get(randomPokemon.url);

                setPokemon(pokemonDetailsResponse.data);
            } catch (error) {
                console.error('Error fetching random Pokémon:', error);
            }
        };


        fetchRandomPokemon();
    }, []);


    if (!pokemon) return <p>Loading...</p>;


    return (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Moves: {pokemon.moves.length}</p>
            <p>Weight: {pokemon.weight}</p>
            <div>Abilities:
                <ul>
                    {pokemon.abilities.map((ability, index) => (
                        <li key={index}>{ability.ability.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FetchRandomPokemon