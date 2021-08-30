import { Link } from "react-router-dom";
import tetrisIcon from "../img/tetris.png";
import profile from "../img/profile.jpg";
import github from "../img/github.png";
import linkedin from "../img/linkedin.png";

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-title">
          <h1>Minigame Playland</h1>
          <h3>Iconic 2D Games</h3>
        </div>

        <h3>Please select a game to play</h3>
      </div>
      <div className="games-container">
        <div className="tetris-icon">
          <Link to="/tetris">
            <div>
              <img src={tetrisIcon} alt="tetris-icon" />
              <p>Tetris</p>
            </div>
          </Link>
        </div>
      </div>
      <p className="more-games-message">...and more games to come</p>
      <div className="mission-container">
        <h1>Mission</h1>
        <p>
          Bring back your childhood memories! Play your favorite classic iconic
          2D games.
        </p>
      </div>
      <h1>The Mastermind</h1>
      <div className="profile-container">
        <div className="left-profile-container">
          <img src={profile} alt="seong-jin-profile" />
        </div>

        <div className="right-profile-container">
          <h3>Seong Jin Kim | Software Developer</h3>
          <h3>Javascript, React, Redux, Express, Node.js</h3>
          <div className="social-container">
            <a
              href="https://www.linkedin.com/in/seongjinkimsjk/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={linkedin} alt="linkedin" />
            </a>
            <a
              href="https://github.com/sjkim530"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={github} alt="github" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
