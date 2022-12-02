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

   update() {
      this.move();
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

   draw(context) {
      context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
   }
}