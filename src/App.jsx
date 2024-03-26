import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FetchPokemonData from "./components/FetchPokemonData";
import './App.css'; // Assuming you have global styles defined here

const App = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [prevPageUrl, setPrevPageUrl] = useState('');
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrev, setDisablePrev] = useState(true);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setLoading(false);
            setDisablePrev(!response.data.previous);
            setDisableNext(!response.data.next);
            setNextPageUrl(response.data.next);
            setPrevPageUrl(response.data.previous);
            setPokemonList(response.data.results);
        }).catch(error => {
            if (axios.isCancel(error)) return;
            setError('Failed to fetch Pokémon list');
            setLoading(false);
        });

        return () => cancel();
    }, [currentPageUrl]);

    function goToNextPage() {
        setCurrentPageUrl(nextPageUrl);
    }

    function goToPrevPage() {
        setCurrentPageUrl(prevPageUrl);
    }

    if (loading) return <p>Loading Pokémon list...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="buttons">
                <button onClick={goToPrevPage} disabled={disablePrev}>Previous</button>
                <button onClick={goToNextPage} disabled={disableNext}>Next</button>
            </div>
            <div className="pokemon-grid">
                {pokemonList.map((pokemon, index) => (
                    <FetchPokemonData key={index} pokemonName={pokemon.name} />
                ))}
            </div>
        </div>
    );
};

export default App;