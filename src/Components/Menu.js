import React from "react";
import "../css/Menu.css";
import GameManager from "../Managers/GameManager";
import UIUtil from "../Utils/UIUtil";

import backgroundImage from "../assets/backgrounds/menu-background.png";
import controlsImage from "../assets/ui/controls-image.png";

function Menu() {
   const onStartGame = () => {
      hideControls();
      hideCredits();
      UIUtil.toggleScreen("tsparticlesCursor", false);

      const gameCanvas = document.getElementById("gameScreen");
      const gameContext = gameCanvas.getContext("2d");
      gameContext.canvas.height = window.innerHeight;

      const gameManager = new GameManager(gameCanvas, gameContext, 5);
      gameManager.startLevel(1);
   }

   const onDisplayControls = () => {
      const creditsDisplay = UIUtil.getDisplayState("creditsText");

      if (creditsDisplay !== "none") {
         hideCredits();
         showControls();
         return;
      }

      showControls();
   }

   const onDisplayCredits = () => {
      const controlsDisplay = UIUtil.getDisplayState("controlsImageContainer");

      if (controlsDisplay !== "none") {
         hideControls();
         showCredits();
         return;
      }

      showCredits();
   }

   const showControls = () => {
      UIUtil.toggleScreen("controlsImageContainer", true);
      UIUtil.toggleScreen("controlsMovement", true);
      UIUtil.toggleScreen("controlsAction", true);
   }

   const hideControls = () => {
      UIUtil.toggleScreen("controlsImageContainer", false);
      UIUtil.toggleScreen("controlsMovement", false);
      UIUtil.toggleScreen("controlsAction", false);
   }

   const showCredits = () => {
      UIUtil.toggleScreen("creditsText", true);
   }

   const hideCredits = () => {
      UIUtil.toggleScreen("creditsText", false);
   }

   return (
      <React.Fragment>
         {/* FUNDO */}
         <img className="image-background" src={backgroundImage} alt="Imagem de fundo" />

         {/* BOTÕES */}
         <div className="button-container-1">
            <button id="button-start-game" onClick={onStartGame}></button>
         </div>
         <div className="button-container-2">
            <button id="button-display-controls" onClick={onDisplayControls}></button>
         </div>
         <div className="button-container-3">
            <button id="button-display-credits" onClick={onDisplayCredits}></button>
         </div>

         {/* CONTROLOS */}
         <div className="controls-image-container" id="controlsImageContainer">
            <img className="controls-image" src={controlsImage} alt="Controlos" />
         </div>
         <p className="controls-movement" id="controlsMovement">Movimento do jogador</p>
         <p className="controls-action" id="controlsAction">Ação (ligar lâmpada / abrir porta)</p>

         {/* CRÉDITOS */}
         <p className="credits-text" id="creditsText">
            Jogo desenvolvido no âmbito da unidade curricular de
            Programação e Desenvolvimento Web,
            realizado no Instituto Politécnico do Cávado e do Ave.<br /><br />

            Equipa:<br />
            - Luís Pereira<br />
            - Vânia Pereira<br /><br />

            Barcelos, Dezembro 2022<br />
            © Direitos reservados.
         </p>
      </React.Fragment>
   );
}

export default Menu