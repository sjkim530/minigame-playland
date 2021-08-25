import Tetris from "./Tetris/Tetris";

function Home() {
  return (
    <div>
      <div>
        <h1>Minigame Playland</h1>
        <h3>Please select a game to play</h3>
      </div>
      <div>
        <Tetris />
      </div>
    </div>
  );
}

export default Home;
