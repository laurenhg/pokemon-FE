import React from 'react';
import FetchPokemonData from "./components/FetchPokemonData.jsx";

const App = () => {
    return (
        <div>
            <FetchPokemonData pokemonName="jigglypuff" />
            <FetchPokemonData pokemonName="ditto" />
        </div>
    );
};

export default App;