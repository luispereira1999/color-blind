"use strict";

class Game {
   constructor(canvas, context, tileMap) {
      this.canvas = canvas;
      this.context = context;
      this.tileMap = tileMap;
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

      this.context.restore();
   }
}