function Score(props) {
  return (
    <div className="score-container">
      <p>Level: {props.level}</p>
      <p>Score: {props.score}</p>
      <p>Rows Cleared: {props.rows}</p>
    </div>
  );
}

export default Score;
