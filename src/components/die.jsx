function Die({ die, onClicking }) {
  let classes = "btn ";
  classes += die.clicked ? "clicked" : "";
  return (
    <div onClick={onClicking} className={classes}>
      {die.value}
    </div>
  );
}

export default Die;
