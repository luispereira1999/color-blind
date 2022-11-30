"use strict";

class Player {
   constructor(image, x, y, width, height) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
   }

   draw(context) {
      context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
   }
}