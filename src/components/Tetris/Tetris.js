import Board from "./Board";
import NextBlock from "./NextBlock";
import Score from "./Score";

function Tetris() {
  return (
    <div>
      <Board />
      <NextBlock />
      <Score />
    </div>
  );
}

export default Tetris;
