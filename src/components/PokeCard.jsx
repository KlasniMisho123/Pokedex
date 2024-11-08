import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import  TypeCard  from "./TypeCard"
import Modal from "./Modal"

export default function PokeCard(props) {
    const { selectedPokemon } = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState(false)
    const [loadingSkill, setLoadingSkill] = useState(false)

    const {name, height, abilities, stats, types, moves, sprites } = data || {}

    const imgList = Object.keys(sprites || {}).filter(val => {
       if (!sprites[val]) { return false }
       if (["versions", "other"].includes(val)) {return false}
        return true
    })
    
    async function fetchMoveData(move, moveUrl) {
        if(loadingSkill || !localStorage || !moveUrl) { return }
        
        //check cache for move
        let c = {}
        if(localStorage.getItem("pokemon-moves")) {
            c = JSON.parse(localStorage.getItem("pokemon-moves"))
        }

        if (move in c) {
            setSkill(c[move])
            console.log("Found move in cache")
            return
        }

        try {
            setLoadingSkill(true)
            const res = fetch(moveUrl)
            const moveData =  res.json()
            console.log("Fetched move from APi", moveData)
            const description = moveData?.flavor_text_entries.flter(
                val => {
                    return val.version_group_name = "firered-leafgreen"
                })[0]?.flavor_text
                
                const skillData = {
                    name: move,
                    description
                }
                setSkill(skillData)
                c[move] = skillData
                localStorage.setItem('pokemon-moves', JSON.stringify(c))
        } catch(err) {
            console.log(err)
        } finally {
            setLoadingSkill(false)
        }
    }

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
            console.log("Found pokemon in cache")
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
                console.log("Fetched pokemon data")
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
            {skill && (
                <Modal handleCloseModal={() => { setSkill(null) }}>
                <div>
                    <h6>Name</h6>
                    <h2></h2>
                </div>
                <div>
                    <h6>Description</h6>
                    <p>sad</p>
                </div>
            </Modal>
            )}
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
            <img className="default-img" src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`}
            alt={`${name}-large-img`} />
            <div className="img-container">
                {imgList.map((spriteUrl, spriteIndex) => {
                    const imgUrl = sprites[spriteUrl]
                    return(
                        <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl} `} />
                    )
                })}
            </div>
            <h3> Stats </h3>
            <div className="stats-card" >
                {stats.map((statObj,statIndex)=> {
                    const { stat, base_stat } = statObj
                    return (
                        <div key={statIndex} className="stat-item"> 
                            <p>{stat?.name.replaceAll("-"," ")}</p>
                            <h4>{base_stat} </h4>
                        </div>
                    )
                })}
            </div>
            <h3>Abilities</h3>
            <div className="pokemon-move-grid">
                {moves.map((moveObj, moveIndex)=> {
                    return(
                        <button key={moveIndex} className="button-card pokemon-move" onClick={()=>{
                            fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
                        }}>
                        <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}