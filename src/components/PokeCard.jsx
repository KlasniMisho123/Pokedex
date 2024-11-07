import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"

export function PokeCard(props) {
    const { selectedPokemon } = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const {name, height, abilities, stats, types, moves, sprites } = data || {}

    useEffect(()=>{
        // if loading, exit loop
        if(loading || !localStorage) { return }
            
        // check if selectedPokemon info is available in the cache
        // 1. define cache
        let cache = {}
        if(localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        // 2. check if selected pokemon is in the cache, otherwise fetch from the API
        if(selectedPokemon in cache) {
           //read from cache 
            setData(cache[selectedPokemon])
            return
        } 

        //we oassed all the cache stuff to no avail and now we need to fetcdata.
        async function fetchPokemonData() {
            setLoading(true)
            try{
                const baseUrl="https://pokeapi.co/api/v2/"
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log("pokemonData: ",pokemonData)
                 cache[selectedPokemon] = pokemonData
                 localStorage.setItem("pokedex", JSON.stringify(cache))
            } catch(err) {
                console.log("Fetching PokemonData Err: ",err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
    }, [selectedPokemon])
    
    return(
        <div className="poke-car">
            <div>
                <h4>{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2></h2>
            </div>
        </div>
    )
}