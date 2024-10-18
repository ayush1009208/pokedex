import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/Pokemoncard';
import './App.css';

const App = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch Pokémon data
        const fetchPokemon = async () => {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
            const results = await Promise.all(
                res.data.results.map(async (pokemon) => {
                    const pokemonData = await axios.get(pokemon.url);
                    return pokemonData.data;
                })
            );
            setPokemonList(results);
        };

        fetchPokemon();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="App">
            <h1>Pokédex</h1>
            <input
                type="text"
                placeholder="Search Pokémon"
                onChange={handleSearch}
                value={searchTerm}
            />
            <div className="pokemon-container">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default App;
