import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tetris from "./components/Tetris/Tetris";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tetris" component={Tetris} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
