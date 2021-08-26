import { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import NextBlock from "./NextBlock";
import Score from "./Score";
import gamePieces, { randomPiece } from "../../gamePieces";

function Tetris() {
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    gamePiece: gamePieces[0].shape,
    collision: false,
  });
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    return Array.from(Array(21), () => new Array(10).fill([0, "clear"]));
  }

  function startGame() {
    setBoard(createBoard());
    setPlaying(true);
    startPlayer();
  }

  const startPlayer = useCallback(() => {
    setPlayer({
      position: { x: 3, y: 0 },
      gamePiece: randomPiece().shape,
      collision: false,
    });
  }, []);

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
    } else {
      if (e.key === " ") startGame();
    }
  }

  function updatePlayer(playerObj) {
    setPlayer((prev) =>
      console.log((prev.position.x += playerObj.position.x))({
        ...prev,
        position: {
          x: (prev.position.x += playerObj.position.x),
          y: (prev.position.y += playerObj.position.y),
        },
        collision: playerObj.collision,
      })
    );
  }

  useEffect(() => {
    function updatedBoard(prev) {
      const updated = prev.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      player.gamePiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            updated[y + player.position.y][x + player.position.x] = [
              value,
              `${player.collision ? "merged" : "clear"}`,
            ];
          }
        });
      });

      return updated;
    }
    setBoard((prev) => updatedBoard(prev));
  }, [player]);

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
