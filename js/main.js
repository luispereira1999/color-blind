"use strict";

onLoadMenu();

function onLoadMenu() {
   const menuCanvas = document.getElementById("menuAnimation");
   const menuContext = menuCanvas.getContext("2d");

   let animationPlayer = null;
   let player = null;

   animationPlayer = new AnimationManager("./assets/sprites/player-sprite.png", 64, 100, 14, 18, 1.35);
   player = new PlayerSprite(
      animationPlayer,
      685,
      295,
      animationPlayer.frameWidth,
      animationPlayer.frameHeight
   );

   const drawAnimation = () => {
      menuContext.save();
      menuContext.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
      player.draw(menuContext, player.x, player.y);
      menuContext.restore();
   };

   // fazer ciclo para animar a personagem no menu
   const loop = () => {
      if (!player != null) {
         drawAnimation();
         requestAnimationFrame(loop);
      }
   };

   loop();
}

function onStartGame() {
   const gameCanvas = document.getElementById("gameScreen");
   const gameContext = gameCanvas.getContext("2d");

   const gameManager = new GameManager(gameCanvas, gameContext, 5);
   gameManager.startLevel(1);
}

function onDisplayCredits() {
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

function onDisplayControls() {
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