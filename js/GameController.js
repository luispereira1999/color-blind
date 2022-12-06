"use strict";

class GameController {
   constructor(canvas, context) {
      this.canvas = canvas;
      this.context = context;
      this.currentLevelIndex = 1;
   }

   startLevel = () => {
      const levelProperties = getLevelProperties(this.currentLevelIndex);
      const level = new Level(
         this.canvas,
         this.context,
         levelProperties.tileMap,
         levelProperties.tileSize,
         levelProperties.time,
         levelProperties.lives
      );

      level.loop(0);  // o parâmetro é necessário para iniciar o relógio de jogo
   }

   restartLevel() {

   }

   nextLevel() {

   }
}