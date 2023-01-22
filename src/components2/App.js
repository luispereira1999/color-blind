import React from "react";
import Menu from "./Menu";
import Game from "./Game";
import cursorParticles from "../particles/CursorParticles.js";

function App() {
  const tsParticles = window.tsParticles;

  // prevenir que só é chamado uma vez, quando a página é carregada
  React.useEffect(() => {
    tsParticles.load("tsparticlesCursor", cursorParticles);
  });

  return (
    <React.Fragment>
      {/* MENU */}
      <div id="menuScreen">
        <Menu />
      </div>

      {/* JOGO */}
      <div id="gameScreen-container">
        <Game />
      </div>

      {/* PARTÍCULAS - CURSOR */}
      <div id="tsparticlesCursor"></div>
    </React.Fragment>
  );
}

export default App