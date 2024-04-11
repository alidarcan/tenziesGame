import React from 'react'
import Dice from './components/dice'
import './App.css'

function App() {

  return (
    <main>
      <h1>Tenzies</h1>
      <div className="description">
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="boxes">
        <Dice value="1"/>
        <Dice value="2"/>
        <Dice value="3"/>
        <Dice value="4"/>
        <Dice value="5"/>
        <Dice value="6"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
      </div>
      <button>Roll</button>
    </main>
  )
}

export default App
