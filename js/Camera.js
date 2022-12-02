"use strict";

class Camera {
   constructor(x, y, width, height, player, tileMap) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.player = player;
      this.tileMap = tileMap;
   }

   getLeftEdge() {
      return this.x + (this.width * 0.25);
   }
   getRightEdge() {
      return this.x + (this.width * 0.75);
   }
   getTopEdge() {
      return this.y + (this.height * 0.25);
   }
   getBottomEdge() {
      return this.y + (this.height * 0.75);
   }

   update() {
      this.followPlayer();
      this.setLimitsForCameraMovement();
      this.setLimitsForPlayerMovement();
   }

   followPlayer() {
      if (this.player.x < this.getLeftEdge()) {
         this.x = this.player.x - (this.width * 0.25);
      }
      if (this.player.x + this.player.width > this.getRightEdge()) {
         this.x = this.player.x + this.player.width - (this.width * 0.75);
      }
      if (this.player.y < this.getTopEdge()) {
         this.y = this.player.y - (this.height * 0.25);
      }
      if (this.player.y + this.player.height > this.getBottomEdge()) {
         this.y = this.player.y + this.player.height - (this.height * 0.75);
      }
   }

   setLimitsForCameraMovement() {
      if (this.x < 0) {
         this.x = 0;
      }
      if (this.x + this.width > this.tileMap.width) {
         this.x = this.tileMap.width - this.width;
      }
      if (this.y < 0) {
         this.y = 0;
      }
      if (this.y + this.height > this.tileMap.height) {
         this.y = this.tileMap.height - this.height;
      }
   }

   setLimitsForPlayerMovement() {
      if (this.player.x < 0) {
         this.player.x = 0;
      }
      if (this.player.x + this.player.width > this.tileMap.width) {
         this.player.x = this.tileMap.width - this.player.width;
      }
      if (this.player.y < 0) {
         this.player.y = 0;
      }
      if (this.player.y + this.player.height > this.tileMap.height) {
         this.player.y = this.tileMap.height - this.player.height;
      }
   }

   draw(context) {
      context.translate(-this.x, -this.y);
   }
}