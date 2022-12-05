"use strict";

class Level {
   constructor(canvas, context, tileMap, tileSize, levelTime) {
      this.canvas = canvas;
      this.context = context;
      this.tileMap = tileMap;
      this.tileSize = tileSize;

      const animationPlayer = new Animation("./assets/player.png", 64, 100);
      this.player = new Player(
         animationPlayer,
         this.tileMap.startPlayerPosition.x,
         this.tileMap.startPlayerPosition.y,
         animationPlayer.frameWidth,
         animationPlayer.frameHeight
      );

      this.enemies = [];
      this.tileMap.startEnemiesPosition.forEach(position => {
         const animationEnemy = new Animation("./assets/enemy.png", 67, 99);
         const enemy = new Enemy(
            animationEnemy,
            position.x,
            position.y,
            animationEnemy.frameWidth,
            animationEnemy.frameHeight
         );

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

      this.timer = new Timer(levelTime, true);
   }

   loop = (estimatedTime) => {
      if (this.timer.started) {
         this.timer.currentTime = estimatedTime + this.timer.fullTime;
         this.timer.started = false;
      }
      else {
         if (estimatedTime >= this.timer.currentTime) {
            this.timer.finished = true;
         }
      }

      this.timer.currentTimeInSeconds = this.timer.currentTime - estimatedTime;

      // continuar ciclo do jogo até acabar o tempo
      if (!this.timer.finished) {
         this.update();
         this.draw();
         requestAnimationFrame(this.loop);
      }
   }

   update() {
      this.player.update(this.tileMap.tiles, this.tileSize);
      this.camera.update();
   }

   draw() {
      this.context.save();

      this.drawBackground();
      this.camera.draw(this.context);
      this.tileMap.draw(this.context);

      // lâmpada
      this.context.arc(7 * 32 + 15, 1 * 32 + 15, 12, 0, 2 * Math.PI, false);
      this.context.fillStyle = 'rgba(99, 255, 71, 0.75)';
      this.context.fill();

      this.enemies.forEach(enemy => {
         enemy.draw(this.context);
      });
      this.player.draw(this.context);

      this.context.restore();

      // desenhar elementos estáticos em relação ao movimento da câmara
      this.context.font = "bold 20px Arial";
      this.context.fillText(`Tempo: ${Math.floor(this.timer.currentTimeInSeconds / 1000)}`, 10, 30);
      this.context.fillStyle = "white";
   }

   drawBackground() {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }
}