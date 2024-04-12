import React from "react";
import Dice from "./components/dice";
import "./App.css";
import { nanoid } from "nanoid";

export default function App() {
  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

 React.useEffect(()=>{
  const allHeld = dices.every(dice => dice.isHeld);
  const firstValue = dices[0].value;
  const allSameValue = dices.every(dice=> dice.value === firstValue);
  if(allHeld && allSameValue){
    setTenzies(true);
    console.log("You won");
  }
 },[dices])

  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }
  function rollDice() {
    setDices((prevDices) =>
      prevDices.map((dice) => {
        return !dice.isHeld ? generateNewDice() : dice;
      })
    );
  }

  function holdDice(id) {
    setDices((prevDices) => {
      return prevDices.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }
  const diceElements = dices.map((dice) => (
    <Dice
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main>
      <h1>Tenzies</h1>
      <div className="description">
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="boxes">
        {diceElements}
        {/* <Dice value={1} />
        <Dice value={2} />
        <Dice value={3} />
        <Dice value={4} />
        <Dice value={5} />
        <Dice value={6} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} /> */}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}
