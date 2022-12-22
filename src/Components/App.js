import React, { useCallback } from 'react';
import Menu from './Menu';
import '../css/Game.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const drawMenuAnimation = (canvas, context, player) => {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    context.restore();
  };

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);


  return (
    <React.Fragment>
      <div id="menuScreen">
        <Menu drawMenuAnimation={drawMenuAnimation} />
      </div>

      <div className="gameScreen-container">
        <canvas id="gameScreen" width="896" height="576"></canvas>

        <Particles
          init={particlesInit}
          id="tsparticles"
          canvasClassName="tsparticles-canvas-el"

          options={{
            fullScreen: {
              enable: false
            },
          }}
        />
      </div>

      <div id="winPopup">
        <img className="popup-background-image" src="./assets/ui/win-popup.png" alt="Popup de ganhar" />
        <h2 className="popup-description-label"><span id="popupDescription">Muito bem!! Sera que es capaz de fazes isto
          novamente?</span></h2>
        <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
        <button className="popup-go-to-next-level-button" type="button" alt="Próximo nível"></button>
      </div>

      <div id="winLastLevelPopup">
        <img className="popup-background-image" src="./assets/ui/win-popup.png" alt="Popup de ganhar" />
        <h2 className="popup-description-label"><span id="popupDescription">Parabens!! Chegaste ao final do jogo com sucesso. Es um genio.?</span></h2>
        <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
      </div>

      <div id="losePopup">
        <img className="popup-background-image" src="./assets/ui/lose-popup.png" alt="Popup de perder" />
        <h2 className="popup-description-label"><span id="popupDescription">Ups! Bora tentar de novo?</span></h2>
        <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
        <button className="popup-restart-level-button" type="button" alt="Reiniciar nível"></button>
      </div>

      <div id="gameScreenUI">
        <div className="gameScreenUI-container">
          <div className="clock-container">
            <div className="clock-col">
              <p className="clock-minutes clock-timer"></p>
              <p className="clock-label">Minutes</p>
            </div>
            <div className="clock-col">
              <p className="clock-seconds clock-timer"></p>
              <p className="clock-label">Seconds</p>
            </div>
          </div>

          <div id="sequence"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App