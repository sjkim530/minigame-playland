import Cell from "./Cell";

function Board(props) {
  const gameBoard = props.createBoard;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${gameBoard.length},calc(25vw / ${gameBoard[0].length}))`,
        gridTemplateColumns: `repeat(${gameBoard[0].length}, 1fr)`,
        gridGap: "1px",
        border: "2px solid #333",
        width: "100%",
        maxWidth: "25vw",
      }}
    >
      {gameBoard.map((row) =>
        row.map((cell, idx) => <Cell key={idx} type={cell[0]} />)
      )}
    </div>
  );
}

export default Board;
