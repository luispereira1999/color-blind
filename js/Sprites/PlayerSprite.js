"use strict";

const PLAYER_STATE = {
   ALIVE: 0,
   DEAD: 1
}

class PlayerSprite {
   constructor(animation, x, y, width, height, speed = 1.0) {
      this.animation = animation;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;

      this.moveLeft = false;
      this.moveRight = false;
      this.moveUp = false;
      this.moveDown = false;
      this.lampPressed = false;
      this.state = PLAYER_STATE.ALIVE;

      this.keyboard = new KeyboardManager();
      this.keyboard.addKeydown(this.onKeydownPressed);
      this.keyboard.addKeyup(this.onKeyupPressed);
      this.keyboard.addKeypress(this.onKeypressPressed);
   }

   getBounds() {
      return {
         left: this.x,
         right: this.width * this.animation.scale,
         top: this.y,
         bottom: this.height * this.animation.scale,
      }
   }

   onKeypressPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case KeyboardManager.Keys.SPACE:
            this.lampPressed = true;
            break;
      }
   }

   onKeydownPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case KeyboardManager.Keys.LEFT:
            this.moveLeft = true;
            break;
         case KeyboardManager.Keys.RIGHT:
            this.moveRight = true;
            break;
         case KeyboardManager.Keys.UP:
            this.moveUp = true;
            break;
         case KeyboardManager.Keys.DOWN:
            this.moveDown = true;
            break;
         case KeyboardManager.Keys.SPACE:
            this.lampPressed = true;
            break;
      }
   }

   onKeyupPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case KeyboardManager.Keys.LEFT:
            this.moveLeft = false;
            break;
         case KeyboardManager.Keys.RIGHT:
            this.moveRight = false;
            break;
         case KeyboardManager.Keys.UP:
            this.moveUp = false;
            break;
         case KeyboardManager.Keys.DOWN:
            this.moveDown = false;
            break;
         case KeyboardManager.Keys.SPACE:
            this.lampPressed = false;
            break;
      }
   }

   update(tiles, tileSize, tileMapScale, door, enemies, lamps, sequence) {
      // guardar valores do movimento anterior, para se houver colisão voltar ao valores do movimento anterior
      const oldX = this.x;
      const oldY = this.y;
      this.move();

      // colisões com tilemap
      let colliding = false;
      tiles.layers.forEach((currentMap, index) => {
         // verificar apenas colisões na camada 2 do mapa, pois definiu-se que as paredes/objetos ficam todos nessa camada 
         if (index == 1) {
            colliding = this.checkCollisionsWithTileMap(currentMap, tileSize, tileMapScale);
         }
      });

      if (colliding) {
         this.x = oldX;
         this.y = oldY;
      }

      // colisões com porta
      colliding = false;
      colliding = this.checkCollisionsWithDoor(door);

      if (colliding) {
         this.x = oldX;
         this.y = oldY;
      }

      // colisões com inimigos
      colliding = false;
      colliding = this.checkCollisionsWithEnemies(enemies);

      if (colliding) {
         this.state = PLAYER_STATE.DEAD;
      }

      // colisões com lâmpadas
      let collider = {};
      collider = this.checkCollisionsWithLamps(lamps);

      if (collider.collidingStatus) {
         // se colidir com alguma lâmpada e se a tecla de ligar a lâmpada for pressionada
         if (this.checkLampPressed()) {
            let elementStillNotRegistered = this.findNextElementStillNotRegistered(sequence);

            if (elementStillNotRegistered != null) {
               // se a lâmpada ligada for a próxima da sequência ainda não registada
               if (collider.collidingLamp.color == elementStillNotRegistered.color) {
                  // registar na sequência e ligar lâmpada 
                  sequence[collider.collidingLampIndex].registered = true;
                  lamps[collider.collidingLampIndex].state = LAMP_STATE.ENABLE;

                  const opacity = lamps[collider.collidingLampIndex].getOpacity();
                  const color = lamps[collider.collidingLampIndex].changeOpacityFromRGBA(lamps[collider.collidingLampIndex].color, opacity);

                  const numberOfElementsRegistered = UIUtil.countSequenceElementsRegistered("sequence", "sequence-circle", "sequence-registered");

                  const currentDiv = document.getElementById(`sequence-element-${numberOfElementsRegistered + 1}`);
                  currentDiv.style.backgroundColor = color;
                  currentDiv.style.borderColor = "white";
                  currentDiv.classList.add("sequence-registered");

                  const audio = new Audio('./assets/sounds/lamp-enable-sound.wav');
                  audio.play();
               } else {
                  const audio = new Audio('./assets/sounds/lamp-error-sound.mp3');
                  audio.play();
               }
            }

            this.lampPressed = false;
         }

         this.x = oldX;
         this.y = oldY;
      }
   }

   findNextElementStillNotRegistered(sequence) {
      let elementStillNotRegistered = null;
      let lowest = 99;
      let currentLowest;

      // encontrar o próximo elemento da sequência AINDA não registado
      for (var i = sequence.length - 1; i >= 0; i--) {
         currentLowest = sequence[i].position;

         if (currentLowest < lowest && !sequence[i].registered) {
            elementStillNotRegistered = sequence[i];
            lowest = currentLowest;
         }
      }

      return elementStillNotRegistered;
   }

   move() {
      if (this.moveLeft && !this.moveRight) {
         this.x -= this.speed;
      }
      if (this.moveRight && !this.moveLeft) {
         this.x += this.speed;
      }
      if (this.moveUp && !this.moveDown) {
         this.y -= this.speed;
      }
      if (this.moveDown && !this.moveUp) {
         this.y += this.speed;
      }
   }

   checkCollisionsWithTileMap(currentMap, tileSize, tileMapScale) {
      let colliding = false;

      for (let row = 0; row < currentMap.length; row++) {
         if (row != null) {
            for (let column = 0; column < currentMap[row].length; column++) {
               const tile = currentMap[row][column];

               if (tile == null) {
                  continue;
               }

               if (tile.type != TILE_TYPE.BLOCK) {
                  continue;
               }

               const tileBounds = {
                  left: column * tileSize * tileMapScale,
                  right: tileSize * tileMapScale,
                  top: row * tileSize * tileMapScale,
                  bottom: tileSize * tileMapScale,
               }

               if (CollisionUtil.isCollide(this.getBounds(), tileBounds)) {
                  colliding = true;
               }
            }
         }
      }

      return colliding;
   }

   checkCollisionsWithDoor(door) {
      let colliding = false;

      if (CollisionUtil.isCollide(this.getBounds(), door.getBounds())) {
         colliding = true;
      }

      return colliding;
   }

   checkCollisionsWithEnemies(enemies) {
      let colliding = false;

      enemies.forEach(enemy => {
         if (CollisionUtil.isCollide(this.getBounds(), enemy.getBounds())) {
            colliding = true;
         }
      });

      return colliding;
   }

   checkCollisionsWithLamps(lamps) {
      let collidingStatus = false;
      let collidingLamp = null;
      let collidingLampIndex = -1;

      lamps.forEach((lamp, index) => {
         if (CollisionUtil.isCollide(this.getBounds(), lamp.getBounds())) {
            collidingStatus = true;
            collidingLamp = lamp;
            collidingLampIndex = index;
         }
      });

      return {
         collidingStatus: collidingStatus,
         collidingLamp: collidingLamp,
         collidingLampIndex: collidingLampIndex
      };
   }

   checkLampPressed() {
      if (this.lampPressed) {
         return true;
      } else {
         return false;
      }
   }

   draw(context) {
      this.animation.draw(context, this.x, this.y);
   }
}