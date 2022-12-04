"use strict";

class Game {
   constructor(canvas, context, tileMap) {
      this.canvas = canvas;
      this.context = context;
      this.tileMap = tileMap;

      const animation = new Animation("./assets/2.png", 64, 100);
      this.player = new Player(
         animation,
         this.tileMap.startLevelPosition.x,
         this.tileMap.startLevelPosition.y,
         animation.frameWidth,
         animation.frameHeight
      );

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

      this.drawBackground();
      this.camera.draw(this.context);
      this.tileMap.draw(this.context);
      this.player.draw(this.context);

      this.context.restore();
   }

   drawBackground() {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }
}