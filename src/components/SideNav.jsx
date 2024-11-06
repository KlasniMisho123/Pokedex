import { first151Pokemon } from "../utils"

export function SideNav() {
  return(
      <nav>
          {first151Pokemon.map((pokemon, pokemonIndex) => {
            return(
              <button>
                <p>{pokemonIndex + 1} {pokemon} </p>
              </button>
            )
          })}
      </nav>
  )
}
