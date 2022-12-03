"use strict";

class Game {
   constructor(canvas, context, tileMap) {
      this.canvas = canvas;
      this.context = context;
      this.tileMap = tileMap;

      this.player = new Player(this.tileMap.pacman, 1 * this.tileMap.tileSize, 1 * this.tileMap.tileSize, this.tileMap.tileSize, this.tileMap.tileSize);
      this.player.centerInScreen(this.tileMap.width, this.tileMap.height);

      this.camera = new Camera(0, 0, 608, 512, this.player, this.tileMap);
   }

   loop = () => {
      window.requestAnimationFrame(this.loop, this.canvas);
      this.update();
      this.draw();
   }

   update() {
      this.player.update(this.tileMap.tiles);
      this.camera.update();
   }

   draw() {
      this.context.save();

      // fundo
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.camera.draw(this.context);
      this.tileMap.draw(this.context);
      this.player.draw(this.context);

      this.context.restore();
   }
}