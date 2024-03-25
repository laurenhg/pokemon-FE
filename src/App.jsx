import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {

        const fetchRandomPokemon = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1');

                const randomPokemonName = response.data.results[0].name;

                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonName}`);
                setPokemon(pokemonResponse.data);
            } catch (error) {
                console.error('Error fetching random Pokémon:', error);
            }
        };


        fetchRandomPokemon();
    }, []);

    return (
        <div>
            <h1>Random Pokemon</h1>
            {pokemon ? (
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
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;