"use strict";

class AnimationManager {
   constructor(spriteSheet, frameWidth, frameHeight, numberOfFrames, frameRate, scale = 1, stop = false) {
      this.spriteSheet = this.setSpriteSheet(spriteSheet);
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;
      this.numberOfFrames = numberOfFrames;
      this.frameRate = frameRate;
      this.scale = scale;

      this.frameIndex = 0;
      this.count = 0;
      this.angleInDegrees = 0;

      this.stop = stop;
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

      if (!this.stop) {
         this.count++;
         if (this.count > this.frameRate) {
            this.frameIndex++;
            this.count = 0;
         }

         if (this.frameIndex > this.numberOfFrames - 1) {
            this.frameIndex = 0;
         }
      }
   }
}