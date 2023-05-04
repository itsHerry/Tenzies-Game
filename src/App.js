import "./styles.css";
import { useEffect, useState } from "react";
import Dice from "./components/dice";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

let clickDieFlag = true;

function App() {
  const { height, width } = useWindowSize;
  const [win, setWin] = useState(false);

  let randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let [diceData, setDiceData] = useState([
    { id: 1, value: randomNumber(1, 6), clicked: false },
    { id: 2, value: randomNumber(1, 6), clicked: false },
    { id: 3, value: randomNumber(1, 6), clicked: false },
    { id: 4, value: randomNumber(1, 6), clicked: false },
    { id: 5, value: randomNumber(1, 6), clicked: false },
    { id: 6, value: randomNumber(1, 6), clicked: false },
    { id: 7, value: randomNumber(1, 6), clicked: false },
    { id: 8, value: randomNumber(1, 6), clicked: false },
    { id: 9, value: randomNumber(1, 6), clicked: false },
    { id: 10, value: randomNumber(1, 6), clicked: false }
  ]);

  let rollDice = () => {
    setDiceData((prevDiceData) =>
      prevDiceData.map((dieData) => {
        if (dieData.clicked) {
          return dieData;
        } else {
          return { ...dieData, value: randomNumber(1, 6) };
        }
      })
    );
  };

  let clickDie = ({ id, value, clicked }) => {
    diceData.every((dieData) => {
      if (dieData.clicked && dieData.value === value && !clicked) {
        setDiceData((prevDiceData) =>
          prevDiceData.map((eachDie) => {
            if (eachDie.id === id) {
              return { ...eachDie, clicked: true };
            } else {
              return eachDie;
            }
          })
        );
        return false;
      } else if (dieData.clicked && dieData.value !== value) {
        alert('Click Same Digits. If not available, "Roll Up" :)');
        return false;
      } else if (dieData.id === 10 && !dieData.clicked && clickDieFlag) {
        clickDieFlag = false;
        setDiceData((prevDiceData) =>
          prevDiceData.map((eachDie) => {
            if (eachDie.id === id) {
              return { ...eachDie, clicked: true };
            } else {
              return eachDie;
            }
          })
        );
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    const wonGame = () => {
      let counter = 0;
      diceData.forEach((dieData) => {
        if (dieData.clicked) {
          counter++;
        }
        if (counter === 10) {
          setWin(true);
        }
      });
    };
    wonGame();
  }, [diceData]);

  return (
    <div className="container">
      <div className="mini-container">
        <h1> Ruby's Game </h1>
        <Dice diceData={diceData} onClicking={clickDie} />
        <button className="btn-roll" onClick={rollDice}>
          Roll Up
        </button>
      </div>
      {win && <Confetti width={width} height={height} />}
    </div>
  );
}

export default App;
