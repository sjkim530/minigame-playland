import { useCallback, useEffect, useRef, useState } from "react";
import Board from "./Board";
import NextBlock from "./NextBlock";
import Score from "./Score";
import Legend from "./Legend";
import gamePieces, { randomPiece } from "../../gamePieces";
import GoBack from "../GoBack";

function Tetris() {
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    gamePiece: gamePieces[0].shape,
    collision: false,
  });
  const [board, setBoard] = useState(createBoard());
  const [linesCleared, setLinesCleared] = useState(0);
  const [dropSpeed, setDropSpeed] = useState(null);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [displayBoard, setDisplayBoard] = useState(createNewBlockBoard());
  const [nextBlock, setNextBlock] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  function createBoard() {
    return Array.from(Array(20), () => new Array(10).fill([0, "clear"]));
  }

  function createNewBlockBoard() {
    return Array.from(Array(4), () => new Array(4).fill([0, "clear"]));
  }

  function startGame() {
    setBoard(createBoard());
    setDisplayBoard(createNewBlockBoard());
    setPlaying(true);
    startPlayer();
    setDropSpeed(1000);
    setScore(0);
    setRows(0);
    setLevel(1);
    startNextBlockDisplay(displayBoard);
    setGameOver(false);
  }

  const startPlayer = useCallback(() => {
    setPlayer({
      position: { x: 3, y: 0 },
      gamePiece: randomPiece().shape,
      collision: false,
    });
  }, []);

  const startNextBlockDisplay = useCallback((prev) => {
    const nextBlock = randomPiece().shape;
    const updated = prev.map((row) =>
      row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
    );

    nextBlock.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          updated[y][x] = [value, "clear"];
        }
      });
    });

    setDisplayBoard(updated);
    setNextBlock(nextBlock);
  }, []);

  const startNextBlock = useCallback(() => {
    setPlayer({
      position: { x: 3, y: 0 },
      gamePiece: nextBlock,
      collision: false,
    });
  }, [nextBlock]);

  function movePlayer(direction) {
    if (direction > 0) {
      if (!detectCollision(player, board, { x: direction, y: 0 }))
        updatePlayer({ x: direction, y: 0, collision: false });
    } else {
      if (!detectCollision(player, board, { x: direction, y: 0 }))
        updatePlayer({ x: direction, y: 0, collision: false });
    }
  }

  function dropPlayer() {
    if (!detectCollision(player, board, { x: 0, y: 1 }))
      updatePlayer({ x: 0, y: 1, collision: false });
    else {
      if (player.position.y < 1) {
        setDropSpeed(null);
        setPlaying(false);
        setGameOver(true);
      }
      updatePlayer({ x: 0, y: 0, collision: true });
    }
  }

  function handleKeyPress(e) {
    e.stopPropagation();
    e.preventDefault();
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

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => {
          clearInterval(id);
        };
      }
    }, [delay]);
  }

  useInterval(() => {
    dropPlayer();
  }, dropSpeed);

  const updateLevelAndDropSpeed = useCallback(() => {
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDropSpeed((prev) => prev - 100);
    }
  }, [level, rows]);

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];
    if (linesCleared > 0) {
      setScore((prev) => prev + linePoints[linesCleared - 1] * level);
      setRows((prev) => prev + linesCleared);
    }
  }, [level, linesCleared]);

  useEffect(() => {
    setLinesCleared(0);

    function removeCompletedLine(board) {
      return board.reduce((accum, curr) => {
        if (curr.findIndex((cell) => cell[0] === 0) === -1) {
          setLinesCleared((prev) => prev + 1);
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
        startNextBlock();
        startNextBlockDisplay(displayBoard);
        return removeCompletedLine(updated);
      }

      return updated;
    }

    setBoard((prev) => updatedBoard(prev));
  }, [
    player,
    playing,
    displayBoard,
    startPlayer,
    startNextBlockDisplay,
    startNextBlock,
  ]);

  useEffect(() => {
    calcScore();
  }, [calcScore, linesCleared, score]);

  useEffect(() => {
    updateLevelAndDropSpeed();
  }, [updateLevelAndDropSpeed]);

  return (
    <div
      className="tetris-wrapper"
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyPress}
    >
      {gameOver ? (
        <div className="game-over">
          <div className="game-over-text">
            <h1>GAME OVER</h1>
            <p>Press the SPACEBAR to play again</p>
          </div>
        </div>
      ) : (
        <span></span>
      )}
      <GoBack />
      <p className="start-game-message">
        **To Start Game, click on screen, then hit your Spacebar**
      </p>

      <div className="tetris-container">
        <Board createBoard={board} />
        <div className="side-container">
          <NextBlock displayBoard={displayBoard} />
          <Score score={score} rows={rows} level={level} />
          <Legend />
        </div>
      </div>
    </div>
  );
}

export default Tetris;
