import Cell from "./Cell";

function Board(props) {
  const gameBoard = props.createBoard;

  return (
    <div>
      {gameBoard.map((row) =>
        row.map((cell, idx) => <Cell key={idx} type={cell[0]} />)
      )}
    </div>
  );
}

export default Board;
