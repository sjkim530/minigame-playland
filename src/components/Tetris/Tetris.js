import { useState } from "react";
import Board from "./Board";
import NextBlock from "./NextBlock";
import Score from "./Score";
import { randomPiece } from "../../gamePieces";

function Tetris() {
  const [playing, setPlaying] = useState(true);
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    gamePiece: randomPiece().shape,
    collision: false,
  });
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    return Array.from(Array(20), () => new Array(12).fill([0, "clear"]));
  }

  function updatePlayer(playerObj) {
    setPlayer((prev) => ({
      ...prev,
      position: {
        x: (prev.position.x += playerObj.position.x),
        y: (prev.position.y += playerObj.position.y),
      },
      collision: playerObj.collision,
    }));
  }

  function movePlayer(direction) {
    updatePlayer({ x: direction, y: 0, collision: false });
  }

  function dropPlayer() {
    updatePlayer({ x: 0, y: 1, collision: false });
  }

  function handleKeyPress(e) {
    if (playing) {
      if (e.key === "ArrowLeft") movePlayer(-1);
      else if (e.key === "ArrowRight") movePlayer(1);
      else if (e.key === "ArrowDown") dropPlayer();
    }
  }

  return (
    <div
      className="tetris-wrapper"
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyPress}
    >
      <div className="tetris-container">
        <Board createBoard={board} />
        <div className="side-container">
          <NextBlock />
          <Score />
        </div>
      </div>
    </div>
  );
}

export default Tetris;
