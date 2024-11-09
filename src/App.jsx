import Footer  from "./components/Footer"
import Header  from "./components/Header"
import PokeCard from "./components/PokeCard"
import SideNav  from "./components/SideNav"

import { useState } from 'react'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
  const [showSideMenu, setShowSideMenu] = useState(false)

  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu)
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu}/>
      <SideNav 
      selectedPokemon={selectedPokemon}
      setSelectedPokemon={setSelectedPokemon} 
      handleToggleMenu={handleToggleMenu} 
      showSideMenu={showSideMenu} />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  )
}

export default App
