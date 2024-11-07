import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import  TypeCard  from "./TypeCard"

export default function PokeCard(props) {
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
    
    if(loading || !data) {
        return (
            <div> 
                <h4> Loading ... </h4>
            </div>
        )
    }

    return(
        <div className="poke-car">
            <div>
                <h4>{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex)=> {
                    return(
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            </div>
        </div>
    )
}