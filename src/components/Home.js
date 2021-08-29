import { Link } from "react-router-dom";
import tetrisIcon from "../img/tetris.png";

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Minigame Playland</h1>
        <h3>Please select a game to play</h3>
      </div>
      <div className="games-container">
        <div className="tetris-icon">
          <Link to="/tetris">
            <div>
              <img src={tetrisIcon} alt="tetris icon" />
              <p>Tetris</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
