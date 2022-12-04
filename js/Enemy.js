"use strict";

class Enemy {
   constructor(imagePath, x, y, width, height) {
      this.image = this.setImage(imagePath);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
   }

   setImage(path) {
      const image = new Image();
      image.src = path;
      return image;
   }

   getBounds() {
      return {
         left: this.x,
         right: this.width,
         top: this.y,
         bottom: this.height,
      }
   }

   draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
   }
}