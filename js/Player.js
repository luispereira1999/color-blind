"use strict";

class Player {
   constructor(image, x, y, width, height) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.moveLeft = false;
      this.moveRight = false;
      this.moveUp = false;
      this.moveDown = false;

      this.keys = {
         LEFT: 37,
         RIGHT: 39,
         UP: 38,
         DOWN: 40
      }

      // quando a tecla é pressionada
      window.addEventListener("keydown", this.onKeydownPressed);

      // quando a tecla é solta
      window.addEventListener("keyup", this.onKeyupPressed);
   }

   centerInScreen(mapWidth, mapHeight) {
      this.x = (mapWidth - this.width) / 2;
      this.y = (mapHeight - this.height) / 2;
   }

   onKeydownPressed = (event) => {
      const key = event.keyCode;

      switch (key) {
         case this.keys.LEFT:
            this.moveLeft = true;
            break;
         case this.keys.RIGHT:
            this.moveRight = true;
            break;
         case this.keys.UP:
            this.moveUp = true;
            break;
         case this.keys.DOWN:
            this.moveDown = true;
            break;
      }
   }

   onKeyupPressed = (event) => {
      const key = event.keyCode;

      switch (key) {
         case this.keys.LEFT:
            this.moveLeft = false;
            break;
         case this.keys.RIGHT:
            this.moveRight = false;
            break;
         case this.keys.UP:
            this.moveUp = false;
            break;
         case this.keys.DOWN:
            this.moveDown = false;
            break;
      }
   }

   update() {
      this.move();
   }

   move() {
      if (this.moveLeft && !this.moveRight) {
         this.x -= 2;
      }
      if (this.moveRight) {
         this.x += 2;
      }
      if (this.moveUp && !this.moveDown) {
         this.y -= 2;
      }
      if (this.moveDown && !this.moveUp) {
         this.y += 2;
      }
   }

   draw(context) {
      context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
   }
}