import React, { useCallback } from 'react';
import '../css/Game.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import winPopupImage from '../assets/ui/win-popup.png';
import losePopupImage from '../assets/ui/lose-popup.png';

function Game() {
   const particlesInit = useCallback(async engine => {
      await loadFull(engine);
   }, []);

   return (
      <React.Fragment>
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

         <div id="winPopup">
            <img className="popup-background-image" src={winPopupImage} alt="Popup de ganhar" />
            <h2 className="popup-description-label"><span id="popupDescription">Muito bem!! Sera que es capaz de fazes isto
               novamente?</span></h2>
            <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
            <button className="popup-go-to-next-level-button" type="button" alt="Próximo nível"></button>
         </div>

         <div id="winLastLevelPopup">
            <img className="popup-background-image" src={winPopupImage} alt="Popup de ganhar" />
            <h2 className="popup-description-label"><span id="popupDescription">Parabens!! Chegaste ao final do jogo com sucesso. Es um genio!</span></h2>
            <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
         </div>

         <div id="losePopup">
            <img className="popup-background-image" src={losePopupImage} alt="Popup de perder" />
            <h2 className="popup-description-label"><span id="popupDescription">Ups! Bora tentar de novo?</span></h2>
            <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
            <button className="popup-restart-level-button" type="button" alt="Reiniciar nível"></button>
         </div>
      </React.Fragment>
   );
}

export default Game