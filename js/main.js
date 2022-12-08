"use strict";

const menuCanvas = document.getElementById("menuAnimation");
const menuContext = menuCanvas.getContext("2d");

let animationPlayer = null;
let player = null;

animationPlayer = new AnimationManager("./assets/sprites/player-sprite.png", 64, 100, 14, 18, 1.35);
player = new PlayerSprite(
   animationPlayer,
   700,
   290,
   animationPlayer.frameWidth,
   animationPlayer.frameHeight
);

this.timer = new TimerManager(20000, true);

const drawAnimation = () => {
   menuContext.save();
   menuContext.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
   player.draw(menuContext, player.x, player.y);
   menuContext.restore();
};

const loop = () => {
   // continuar ciclo do jogo até acabar o tempo
   if (!player != null) {
      drawAnimation();
      requestAnimationFrame(loop);
   }
};

loop();

function startGame() {
   const gameCanvas = document.getElementById("gameScreen");
   const gameContext = gameCanvas.getContext("2d");

   const gameManager = new GameManager(gameCanvas, gameContext);
   gameManager.startLevel();
}