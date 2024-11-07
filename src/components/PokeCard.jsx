import { useEffect, useState } from "react"

export function PokeCard(props) {
    const { selectedPokemon } = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

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
        async function fetchPokemon(params) {
            
        }

        // if fetch from api, save in cache
    }, [selectedPokemon])

    return(
        <div>PokeCard</div>
    )
}