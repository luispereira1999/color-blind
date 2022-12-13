"use strict";

class DoorSprite {
   constructor(animation, x, y, width, height) {
      this.animation = animation;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
   }

   getBounds() {
      return {
         left: this.x,
         right: this.width * this.animation.scale,
         top: this.y,
         bottom: this.height * this.animation.scale,
      }
   }

   draw(context) {
      this.animation.draw(context, this.x, this.y);
   }
}