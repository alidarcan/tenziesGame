import PropTypes from "prop-types";
export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };
  
  return (
    <div style={styles} className="box" onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  );
}
Dice.propTypes = {
  value: PropTypes.number,
  isHeld: PropTypes.any,
  holdDice: PropTypes.func,
};
