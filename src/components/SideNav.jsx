import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {

  const {selectedPokemon, setSelectedPokemon } = props

  const [searchValue, setSearchValue] = useState("")
  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
    // if full pokedex number includes current search value 
    // return true
    if(getFullPokedexNumber(eleIndex).includes (searchValue)) {return true}

    // if pokemon name includes current search value,
    // return true
    if(ele.toLowerCase().includes(searchValue.toLocaleLowerCase())) { return true}

    //otherise, exclude value from array
    return false
    
  })
  

  return(
      <nav>
        <div className={"header"}> 
            <h1 className="text-gradient">Pokedex</h1>
        </div>
          <input 
          placeholder="E.g. 001 or bulba..."
           value={searchValue} 
           onChange={(e)=>{
            setSearchValue(e.target.value)
           }}
           />
          {filteredPokemon.map((pokemon, pokemonIndex) => {
            const truePokedexNumber = first151Pokemon.indexOf(pokemon)
            return(
              <button key={pokemonIndex} className={'nav-card ' + (pokemonIndex === selectedPokemon ? 'nav-card-selected ': " ")} 
               onClick={()=>{setSelectedPokemon(truePokedexNumber)}}
              > 
                
              
                <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                <p>{pokemon} </p>
              </button>
            )
          })}
      </nav>
  )
}
