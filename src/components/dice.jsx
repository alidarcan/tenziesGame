import PropTypes from "prop-types";
export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };
  const diceClass = `box dice-${props.value}`;
  const diceFace = [];
  for (let i = 0; i < props.value; i++) {
    diceFace.push(<span className="dot"></span>);
  }

  return (
    <div style={styles} className={diceClass} onClick={props.holdDice}>
      {diceFace}
    </div>
  );
}
Dice.propTypes = {
  value: PropTypes.number,
  isHeld: PropTypes.any,
  holdDice: PropTypes.func,
};
