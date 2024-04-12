import React from "react";
import Dice from "./components/dice";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollsCount, setRollsCount] = React.useState(0);
  const [lowScore, setLowScore] = React.useState(
    localStorage.getItem("tenziesScore") || 100
  );
  const [timer, setTimer] = React.useState(0);
  React.useEffect(() => {
    const stopWatch = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(stopWatch);
    };
  }, []);
  // Low Score Check
  React.useEffect(() => {
    if (tenzies && rollsCount < lowScore) {
      localStorage.setItem("tenziesScore", rollsCount);
      setLowScore(rollsCount);
    }
  }, [rollsCount, tenzies, lowScore]);
  React.useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dices]);

  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }
  function rollDice() {
    setRollsCount((prevCount) => prevCount + 1);
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

  function resetGame() {
    setTenzies(false);
    setDices(allNewDice());
    setRollsCount(0);
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p className="rolls">
        {Math.floor(timer / 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        })}
        :
        {Math.floor(timer % 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        })}
      </p>
      <p className="rolls">Low Score: {lowScore}</p>
      <p className="rolls">Number of Rolls: {rollsCount}</p>
      <div className="description">
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="boxes">{diceElements}</div>
      <button onClick={tenzies ? resetGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
