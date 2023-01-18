import React from "react";
import Menu from "./Menu";
import Game from "./Game";

function App() {
  return (
    <React.Fragment>
      <div id="menuScreen">
        <Menu />
      </div>

      <div className="gameScreen-container">
        <Game />
      </div>
    </React.Fragment>
  );
}

export default App