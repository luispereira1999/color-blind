import React from "react";
import "../css/Game.css";

import winPopupImage from "../assets/ui/win-popup.png";
import losePopupImage from "../assets/ui/lose-popup.png";

function Game() {
   return (
      <React.Fragment>
         {/* ECRÃ DO JOGO */}
         <canvas id="gameScreen" width="1152" height="576"></canvas>
       
         {/* PARTÍCULAS */}
         <div id="tsparticles"></div>

         {/* TEMPO E SEQUÊNCIA DE CORES */}
         <div id="gameScreenUI">
            <div className="gameScreenUI-container">
               <div className="clock-container">
                  <div className="clock-col">
                     <p className="clock-minutes clock-timer"></p>
                     <p className="clock-label">Minutos</p>
                  </div>
                  <div className="clock-col">
                     <p className="clock-seconds clock-timer"></p>
                     <p className="clock-label">Segundos</p>
                  </div>
               </div>

               <div id="sequence"></div>
            </div>
         </div>

         {/* POPUPS */}
         <div id="winPopup">
            <img className="popup-background-image" src={winPopupImage} alt="Popup de ganhar" />
            <h2 className="popup-description-label"><span id="popupDescription">Será que consegues outra vez?</span></h2>
            <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
            <button className="popup-go-to-next-level-button" type="button" alt="Próximo nível"></button>
         </div>

         <div id="winLastLevelPopup">
            <img className="popup-background-image" src={winPopupImage} alt="Popup de ganhar" />
            <h2 className="popup-description-label"><span id="popupDescription">Chegaste ao final do jogo !!</span></h2>
            <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
         </div>

         <div id="losePopup">
            <img className="popup-background-image" src={losePopupImage} alt="Popup de perder" />
            <h2 className="popup-description-label"><span id="popupDescription">Bora tentar de novo?</span></h2>
            <button className="popup-back-to-menu-button" type="button" alt="Voltar ao menu"></button>
            <button className="popup-restart-level-button" type="button" alt="Reiniciar nível"></button>
         </div>
      </React.Fragment>
   );
}

export default Game