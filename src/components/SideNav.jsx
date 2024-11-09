import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {

  const {selectedPokemon, setSelectedPokemon } = props

  const [searchValue, setSearchValue] = useState("")
  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
    // if full pokedex number includes current search value 
    // return true
    if(toString(getFullPokedexNumber(eleIndex)).includes (searchValue)) {return true}

    // if pokemon name includes current search value,
    // return true

    //otherise, exclude value from array
    
  })
  

  return(
      <nav>
        <div className={"header"}> 
            <h1 className="text-gradient">Pokedex</h1>
        </div>
          <input
           value={searchValue} 
           onChange={(e)=>{
            setSearchValue(e.target.value)
           }}
           />
          {first151Pokemon.map((pokemon, pokemonIndex) => {
            return(
              <button key={pokemonIndex} className={'nav-card ' + (pokemonIndex === selectedPokemon ? 'nav-card-selected ': " ")} 
               onClick={()=>{setSelectedPokemon(pokemonIndex)}}
              > 
                
              
                <p>{getFullPokedexNumber(pokemonIndex)}</p>
                <p>{pokemon} </p>
              </button>
            )
          })}
      </nav>
  )
}
