import React from 'react'
import '../css/Menu.css';
import useMenuAnimation from '../hooks/useMenuAnimation'
import UIUtil from '../Utils/UIUtil'

const Menu = (props) => {
   const drawMenuAnimation = props.drawMenuAnimation;
   const canvasRef = useMenuAnimation(drawMenuAnimation);

   const onStartGame = () => {
      console.log("onStartGame");
   }

   const onDisplayCredits = () => {
      const displayStateLogo = UIUtil.getDisplayState("logo");
      const displayStateControls = UIUtil.getDisplayState("controlsImage");

      if (displayStateControls != "none") {
         UIUtil.toggleScreen("creditsText", true);
         const creditsText = "Jogo desenvolvido no âmbito da unidade curricular de\n" +
            "Programação e Desenvolvimento Web,\n" +
            "realizado no Instituto Politécnico do Cávado e do Ave.\n\n" +
            "Equipa:\n" +
            "- Luís Pereira\n" +
            "- Vânia Pereira\n\n" +
            "Barcelos, Dezembro 2022\n" +
            "© Direitos reservados.";
         UIUtil.changeText("creditsText", creditsText);

         UIUtil.toggleScreen("controlsImage", false);
         UIUtil.toggleScreen("logo", false);
         return;
      }

      if (displayStateLogo == "none") {
         UIUtil.toggleScreen("logo", true);
         UIUtil.toggleScreen("creditsText", false);
      } else {
         UIUtil.toggleScreen("logo", false);
         UIUtil.toggleScreen("creditsText", true);

         const creditsText = "Jogo desenvolvido no âmbito da unidade curricular de\n" +
            "Programação e Desenvolvimento Web,\n" +
            "realizado no Instituto Politécnico do Cávado e do Ave.\n\n" +
            "Equipa:\n" +
            "- Luís Pereira\n" +
            "- Vânia Pereira\n\n" +
            "Barcelos, Dezembro 2022\n" +
            "© Direitos reservados.";
         UIUtil.changeText("creditsText", creditsText);
      }
   }

   const onDisplayControls = () => {
      const displayStateLogo = UIUtil.getDisplayState("logo");
      const displayStateCredits = UIUtil.getDisplayState("creditsText");

      if (displayStateCredits != "none") {
         UIUtil.toggleScreen("creditsText", false);
         UIUtil.toggleScreen("controlsImage", true);
         UIUtil.toggleScreen("logo", false);
         return;
      }

      if (displayStateLogo == "none") {
         UIUtil.toggleScreen("logo", true);
         UIUtil.toggleScreen("controlsImage", false);
      } else {
         UIUtil.toggleScreen("controlsImage", true);
         UIUtil.toggleScreen("logo", false);
      }
   }

   return (
      <React.Fragment>
         <canvas id="menuAnimation" width="896" height="576" ref={canvasRef} />

         <img className="image-background" src="./assets/backgrounds/menu-background.jpg" alt="Imagem de fundo" />
         <img className="logo" id="logo" src="./assets/logo.png" alt="Color Blind" />
         <img className="controls-image" id="controlsImage" src="./assets/ui/controls-image.png" alt="Controlos" />

         <h1 className="credits-text" id="creditsText"></h1>

         <div className="buttons" id="buttons">
            <button className="blob-btn" id="button-start-game" onClick={onStartGame}>
               Novo Jogo
               <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                  </span>
               </span>
            </button>

            <button className="blob-btn" id="button-display-credits" onClick={onDisplayCredits}>
               Creditos
               <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                  </span>
               </span>
            </button>

            <button className="blob-btn" id="button-display-controls" onClick={onDisplayControls}>
               Controlos
               <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                     <span className="blob-btn__blob"></span>
                  </span>
               </span>
            </button>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
               <defs>
                  <filter id="goo">
                     <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                     <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                        result="goo"></feColorMatrix>
                     <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                  </filter>
               </defs>
            </svg>
         </div>

         <h3 className="copyright-text">2022 &#169; Color Blind</h3>
      </React.Fragment>
   );
}

export default Menu