import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchRandomPokemon = async () => {
            const fetchedPokemons = [];
            while (fetchedPokemons.length < 20) {
                try {
                    const randomId = Math.floor(Math.random() * 898) + 1; // Generate random Pokémon ID
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                    const pokemon = response.data;
                    if (!fetchedPokemons.some(p => p.id === pokemon.id)) {
                        fetchedPokemons.push(pokemon); // Add the Pokémon to the array if it's unique
                    }
                } catch (error) {
                    console.error('Error fetching random Pokémon:', error);
                }
            }
            setPokemons(fetchedPokemons);
        };

        fetchRandomPokemon();
    }, []);

    return (
        <div>
            <h1>Random Pokémon</h1>
            {pokemons.length > 0 ? (
                <div className="pokemon-container">
                    {pokemons.map(pokemon => (
                        <div key={pokemon.id} className="pokemon-card">
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
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;