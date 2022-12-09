"use strict";

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
      this.lampClicked = false;

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
            this.lampClicked = true;
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
            this.lampClicked = true;
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
            this.lampClicked = false;
            break;
      }
   }

   update(tiles, tileSize, tileMapScale, enemies, lamps, sequence) {
      // guardar valores do movimento anterior, para se houver colisão voltar ao valores do movimento anterior
      const oldX = this.x;
      const oldY = this.y;
      this.move();
      console.log("scale", tileMapScale)
      let colliding = false;
      tiles.layers.forEach((currentMap, index) => {
         // verificar apenas a camada das paredes
         if (index == 1) {
            colliding = this.checkCollisionsWithTileMap(currentMap, tileSize, tileMapScale);
         }
      });

      if (colliding) {
         this.x = oldX;
         this.y = oldY;
      }

      colliding = false;
      colliding = this.checkCollisionsWithEnemies(enemies);

      if (colliding) {
         this.x = oldX;
         this.y = oldY;
      }

      let collider = {};
      collider = this.checkCollisionsWithLamps(lamps);

      if (collider.collidingStatus) {
         if (this.checkLampClicked()) {
            let elementStillNotRegistered = this.findNextElementStillNotRegistered(sequence);

            if (elementStillNotRegistered != null) {
               if (collider.collidingLamp.color == elementStillNotRegistered.color) {
                  sequence[collider.collidingLampIndex].registered = true;
                  lamps[collider.collidingLampIndex].state = LAMP_STATE.ENABLE;
               }
            }

            this.lampClicked = false;
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

               if (isCollide(this.getBounds(), tileBounds)) {
                  colliding = true;
               }
            }
         }
      }

      return colliding;
   }

   checkCollisionsWithEnemies(enemies) {
      let colliding = false;

      enemies.forEach(enemy => {
         if (isCollide(this.getBounds(), enemy.getBounds())) {
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
         if (isCollide(this.getBounds(), lamp.getBounds())) {
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

   checkLampClicked() {
      if (this.lampClicked) {
         return true;
      } else {
         return false;
      }
   }

   draw(context) {
      this.animation.draw(context, this.x, this.y);
   }
}