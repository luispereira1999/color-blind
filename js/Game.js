"use strict";

class Game {
   constructor(canvas, context, tileMap) {
      this.canvas = canvas;
      this.context = context;
      this.tileMap = tileMap;

      const animation = new Animation("./assets/player.png", 64, 100);
      this.player = new Player(
         animation,
         this.tileMap.startPlayerPosition.x,
         this.tileMap.startPlayerPosition.y,
         animation.frameWidth,
         animation.frameHeight
      );

      this.enemies = [];
      this.tileMap.startEnemiesPosition.forEach(position => {
         const enemy = new Enemy("./assets/enemy.png", position.x, position.y, 32, 47);
         this.enemies.push(enemy);
      });

      this.camera = new Camera(0, 0, 608, 512, this.player, this.tileMap);

      const numberOfColors = 3;
      let colors = [];

      const getColors = new Promise((resolve, reject) => {
         fetch(`https://www.colr.org/json/colors/random/${numberOfColors}`, {
            method: "GET"
         }).then(data => resolve(data))
            .catch(error => reject(error));
      });

      getColors.then(response => {
         response.json().then(data => {
            colors = data.colors;
         })
      });
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
      this.enemies.forEach(enemy => {
         enemy.draw(this.context);
      });
      this.player.draw(this.context);

      this.context.restore();
   }

   drawBackground() {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }
}