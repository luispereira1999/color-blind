"use strict";

class Game {
   constructor(canvas, context, tileMap) {
      this.canvas = canvas;
      this.context = context;
      this.tileMap = tileMap;

      this.player = new Player(this.tileMap.pacman, 0, 0, 32, 32);
   }

   loop = () => {
      window.requestAnimationFrame(this.loop, this.canvas);
      this.update();
      this.draw();
   }

   update() {

   }

   draw() {
      this.context.save();

      this.tileMap.draw(this.canvas, this.context);
      this.player.draw(this.context);

      this.context.restore();
   }
}