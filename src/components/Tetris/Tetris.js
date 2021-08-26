import Board from "./Board";
import NextBlock from "./NextBlock";
import Score from "./Score";

function Tetris() {
  function createBoard() {
    return Array.from(Array(20), () => new Array(12).fill([0, "clear"]));
  }

  return (
    <div className="tetris-container">
      <Board createBoard={createBoard()} />
      <div className="side-container">
        <NextBlock />
        <Score />
      </div>
    </div>
  );
}

export default Tetris;
