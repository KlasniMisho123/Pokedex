import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {

  const {selectedPokemon, setSelectedPokemon } = props

  function handleNavbarClick(target) {
    console.log("target: ", target)
  }

  return(
      <nav>
        <div className={"header"}> 
            <h1 className="text-gradient">Pokedex</h1>
        </div>
          <input />
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
