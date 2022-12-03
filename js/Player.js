"use strict";

class Player {
   constructor(image, x, y, width, height) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.speed = 1;

      this.moveLeft = false;
      this.moveRight = false;
      this.moveUp = false;
      this.moveDown = false;

      this.keyboard = new Keyboard();
      this.keyboard.addKeydown(this.onKeydownPressed);
      this.keyboard.addKeyup(this.onKeyupPressed);
   }

   centerInScreen(tileMapWidth, tileMapHeight) {
      this.x = (tileMapWidth - this.width) / 2;
      this.y = (tileMapHeight - this.height) / 2;
   }

   getBounds() {
      return {
         left: this.x,
         right: this.height,
         top: this.y,
         bottom: this.width,
      }
   }

   onKeydownPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case Keyboard.Keys.LEFT:
            this.moveLeft = true;
            break;
         case Keyboard.Keys.RIGHT:
            this.moveRight = true;
            break;
         case Keyboard.Keys.UP:
            this.moveUp = true;
            break;
         case Keyboard.Keys.DOWN:
            this.moveDown = true;
            break;
      }
   }

   onKeyupPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case Keyboard.Keys.LEFT:
            this.moveLeft = false;
            break;
         case Keyboard.Keys.RIGHT:
            this.moveRight = false;
            break;
         case Keyboard.Keys.UP:
            this.moveUp = false;
            break;
         case Keyboard.Keys.DOWN:
            this.moveDown = false;
            break;
      }
   }

   update(tiles) {
      // guardar valores do movimento anterior, para se houver colisão voltar ao valores do movimento anterior
      const oldX = this.x;
      const oldY = this.y;
      this.move();

      // verificar colisões para cada camada do mapa
      let colliding = false;
      tiles.layers.forEach((currentMap, index) => {
         // verificar apenas a camada de objetos/paredes colisiveis
         if (index == 1) {
            colliding = this.checkCollision(currentMap);
         }
      });

      if (colliding) {
         this.x = oldX;
         this.y = oldY;
      }
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

   checkCollision(currentMap) {
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
                  left: column * tileSize,
                  right: 32,
                  top: row * tileSize,
                  bottom: 32,
               }

               if (isCollide(this.getBounds(), tileBounds)) {
                  colliding = true;
               }
            }
         }
      }

      return colliding;
   }

   draw(context) {
      context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
   }
}