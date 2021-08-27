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
  const [rowsCleared, setRowsCleared] = useState(0);

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
      else if (e.key === "ArrowUp") rotatePlayer(player.gamePiece, board);
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

  function rotatePlayer(gamePiece, board) {
    const playerCopy = JSON.parse(JSON.stringify(player));
    const rotation = gamePiece.map((row, idx) =>
      gamePiece.map((col) => col[idx])
    );

    playerCopy.gamePiece = rotation.map((row) => row.reverse());

    const posX = playerCopy.position.x;
    let offset = 1;

    while (detectCollision(playerCopy, board, { x: 0, y: 0 })) {
      playerCopy.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > playerCopy.gamePiece[0].length) {
        playerCopy.gamePiece = rotation.reverse();
        playerCopy.position.x = posX;
        return;
      }
    }
    setPlayer(playerCopy);
  }

  useEffect(() => {
    setRowsCleared(0);

    function removeCompletedRow(board) {
      return board.reduce((accum, curr) => {
        if (curr.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          accum.unshift(new Array(board[0].length).fill([0, "clear"]));
          return accum;
        }
        accum.push(curr);
        return accum;
      }, []);
    }

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

      if (player.collision) {
        startPlayer();
        return removeCompletedRow(updated);
      }

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
