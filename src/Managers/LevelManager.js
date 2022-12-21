class LevelManager {
   constructor(canvas, context, tileMap, levelTime, musicPath) {
      this.canvas = canvas;
      this.context = context;
      this.tileMap = tileMap;
      this.loadedLevel = false;

      this.init(levelTime, musicPath);
   }

   async init(levelTime, musicPath) {
      const animationPlayer = new AnimationManager("./assets/sprites/player-walk-sprite.png", 64, 100, 4, 21, 0.75);
      this.player = new PlayerSprite(
         animationPlayer,
         this.tileMap.startPlayerPosition.x,
         this.tileMap.startPlayerPosition.y,
         animationPlayer.frameWidth,
         animationPlayer.frameHeight,
         4.0
      );

      const animationDoor = new AnimationManager("./assets/sprites/door-sprite.png", 141.25, 128, 4, 50, 1, true);
      this.door = new DoorSprite(
         animationDoor,
         this.tileMap.startDoorPosition.x - 14,
         this.tileMap.startDoorPosition.y,
         animationDoor.frameWidth,
         animationDoor.frameHeight
      );

      this.enemies = [];
      this.tileMap.startEnemiesPosition.forEach(position => {
         const animationEnemy = new AnimationManager("./assets/sprites/enemy-sprite.png", 67, 99, 11, 18, 0.75, true);
         let enemy = null;

         if (position.tileNumber == 98) {
            enemy = new EnemySprite(
               animationEnemy,
               position.x,
               position.y,
               animationEnemy.frameWidth,
               animationEnemy.frameHeight,
               ENEMY_TYPE.HORIZONTAL,
               0.25,
               4
            );
         } else {
            enemy = new EnemySprite(
               animationEnemy,
               position.x,
               position.y,
               animationEnemy.frameWidth,
               animationEnemy.frameHeight,
               ENEMY_TYPE.VERTICAL,
               0.25,
               4
            );
         }

         this.enemies.push(enemy);
      });

      this.camera = new CameraManager(0, 0, this.canvas.width, this.canvas.height, this.player, this.tileMap);

      // o número de lâmpadas é igual ao número de cores, visto que cada lâmpada tem uma cor
      const numberOfColors = this.tileMap.startLampsPosition.length;
      this.colors = await this.getColors(numberOfColors);

      this.lamps = [];
      this.tileMap.startLampsPosition.forEach((position, index) => {
         const lamp = new LampSprite(
            "./assets/sprites/lamp-sprite.png",
            position.x,
            position.y,
            34,
            28,
            2.0,
            this.colors[index].hex,
            LAMP_STATE.DISABLE
         );

         this.lamps.push(lamp);
      });

      const positions = [];
      for (let i = 0; i < numberOfColors; i++) {
         positions[i] = i + 1;
      }

      const randomPositions = this.shufflePositions(positions);
      this.sequence = [];
      this.lamps.forEach((lamp, index) => {
         this.sequence.push({
            color: lamp.color,
            position: randomPositions[index],
            registered: false
         });
      });

      this.timer = new TimerManager(levelTime, true);

      // mostrar/esconder elementos HTML
      UIUtil.toggleScreen("menuScreen", false);
      UIUtil.toggleScreen("gameScreen", true);
      UIUtil.toggleScreen("gameScreenUI", true, "flex");

      document.getElementById("sequence").textContent = '';

      this.sequence.forEach((element, index) => {
         UIUtil.createCircleElement("sequence", `sequence-element-${index + 1}`, "sequence-circle");
      });

      this.music = this.startMusic(musicPath);
      this.music.volume = 0.75;

      this.loadedLevel = true;
   }

   startMusic(musicPath) {
      const audio = new Audio(musicPath);
      audio.play();
      return audio;
   }

   stopMusic() {
      this.music.pause();
   }

   getColors = async (numberOfColors) => {
      const colorService = new ColorService();

      const colorsResponse = colorService.getColors(numberOfColors)
         .then(response => {
            return response.json().then(data => {
               return data.colors;
            })
         })
         .catch(error => {
            console.log(error)
         });

      return await colorsResponse;
   }

   shufflePositions(positions) {
      let numberOfPositions = positions.length;
      let randomPosition = 0;
      let randomPositions = [];

      while (numberOfPositions--) {
         randomPosition = Math.floor(Math.random() * (numberOfPositions + 1));
         randomPositions.push(positions[randomPosition]);

         // remover posição inserida, para não voltar a repeti-la
         positions.splice(randomPosition, 1);
      }

      return randomPositions;
   }

   update() {
      this.player.update(this.tileMap.tiles, this.tileMap.tileSize, this.tileMap.scale, this.door, this.enemies, this.lamps, this.sequence);
      this.enemies.forEach(enemy => {
         enemy.update(this.tileMap.tileSize, this.tileMap.scale);
      })
      this.camera.update();
   }

   draw() {
      this.context.save();

      this.drawBackground();

      this.camera.draw(this.context);

      this.tileMap.draw(this.context);
      this.door.draw(this.context);
      this.player.draw(this.context);
      this.enemies.forEach(enemy => {
         enemy.draw(this.context);
      });
      this.lamps.forEach(lamp => {
         lamp.draw(this.context);
      });

      this.context.restore();

      // desenhar elementos estáticos em relação ao movimento da câmara (UI)
      const timeFormatted = this.formatTimeToDisplay();
      const minutesAndSeconds = timeFormatted.split(":");
      this.drawTime(minutesAndSeconds[0], minutesAndSeconds[1]);
   }

   drawBackground() {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }

   formatTimeToDisplay() {
      return new Date(Math.floor(this.timer.currentTimeInSeconds / 1000) * 1000).toISOString().substring(14, 19);
   }

   drawTime(minutes, seconds) {
      document.documentElement.style.setProperty("--timer-minutes", "'" + minutes + "'");
      document.documentElement.style.setProperty("--timer-seconds", "'" + seconds + "'");
   }
}

export default LevelManager