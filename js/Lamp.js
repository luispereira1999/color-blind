"use strict";

const LAMP_STATE = {
   DISABLE: 0,
   ENABLE: 1
}

class Lamp {
   constructor(imagePath, x, y, width, height, color, state) {
      this.image = this.setImage(imagePath);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.state = state;
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
      this.drawColor(context);
   }

   drawColor(context) {
      context.beginPath();
      context.arc(
         this.x + 16,
         this.y + 13,
         10,
         0,
         2 * Math.PI,
         false
      );

      context.fillStyle = 'rgba(99, 255, 71, 0.45)';
      context.fill();
   }
}