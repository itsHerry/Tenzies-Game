import Die from "./die";

function Dice({ diceData, onClicking }) {
  return (
    <div className="dice-container">
      {diceData.map((die) => (
        <Die key={die.id} die={die} onClicking={() => onClicking(die)} />
      ))}
    </div>
  );
}

export default Dice;
