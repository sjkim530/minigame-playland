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

  // function startPlayer() {
  const startPlayer = useCallback(() => {
    setPlayer({
      position: { x: 3, y: 0 },
      gamePiece: randomPiece().shape,
      collision: false,
    });
  }, []);
  // }

  function movePlayer(direction) {
    if (direction > 0) {
      if (!detectCollision(player, board, { x: direction, y: 0 }))
        updatePlayer({ x: direction - 0.5, y: 0, collision: false });
    } else {
      if (!detectCollision(player, board, { x: direction, y: 0 }))
        updatePlayer({ x: direction + 0.5, y: 0, collision: false });
    }
  }

  function dropPlayer() {
    if (!detectCollision(player, board, { x: 0, y: 1 }))
      updatePlayer({ x: 0, y: 0.5, collision: false });
    else updatePlayer({ x: 0, y: 0, collision: true });
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
    setPlayer((prev) => ({
      ...prev,
      position: {
        x: (prev.position.x += playerObj.x),
        y: (prev.position.y += playerObj.y),
      },
      collision: playerObj.collision,
    }));
  }

  function detectCollision(player, board, { x: posX, y: posY }) {
    for (let y = 0; y < player.gamePiece.length; y++) {
      for (let x = 0; x < player.gamePiece[0].length; x++) {
        if (player.gamePiece[y][x] !== 0) {
          if (
            !board[y + player.position.y + posY] ||
            !board[y + player.position.y + posY][
              x + player.position.x + posX
            ] ||
            board[y + player.position.y + posY][
              x + player.position.x + posX
            ][1] !== "clear"
          )
            return true;
        }
      }
    }
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

      if (player.collided) startPlayer();

      return updated;
    }
    setBoard((prev) => updatedBoard(prev));
  }, [player, startPlayer]);

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
