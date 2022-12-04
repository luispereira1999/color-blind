"use strict";

class Animation {
   constructor(spriteSheet, frameWidth, frameHeight) {
      this.spriteSheet = this.setSpriteSheet(spriteSheet);
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;

      this.scale = 0.5;
      this.frameIndex = 0;
      this.count = 0;
   }

   setSpriteSheet(spriteSheet) {
      const img = new Image();
      img.src = spriteSheet;
      return img;
   }

   draw(context, x, y) {
      context.drawImage(
         this.spriteSheet,
         this.frameIndex * this.frameWidth, 0,
         this.frameWidth, this.frameHeight,
         x, y,
         this.frameWidth * this.scale, this.frameHeight * this.scale
      );

      this.count++;
      if (this.count > 18) {
         this.frameIndex++;
         this.count = 0;
      }

      if (this.frameIndex > 3) {
         this.frameIndex = 0;
      }
   }
}