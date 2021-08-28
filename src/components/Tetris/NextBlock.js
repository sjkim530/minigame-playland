import Cell from "./Cell";

function NextBlock(props) {
  const displayBoard = props.displayBoard;

  return (
    <div className="next-block-container">
      <h3>Next Block</h3>
      <div className="next-block-board">
        {displayBoard.map((row) =>
          row.map((cell, idx) => <Cell key={idx} type={cell[0]} />)
        )}
      </div>
    </div>
  );
}

export default NextBlock;
