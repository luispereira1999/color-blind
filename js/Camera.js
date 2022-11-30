"use strict";

class Camera {
   constructor(x, y, width, height, playerToFollow, map) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.playerToFollow = playerToFollow;
      this.map = map;
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

   followPlayer() {
      if (this.playerToFollow.x < this.getLeftEdge()) {
         this.x = this.playerToFollow.x - (this.width * 0.25);
      }
      if (this.playerToFollow.x + this.playerToFollow.width > this.getRightEdge()) {
         this.x = this.playerToFollow.x + this.playerToFollow.width - (this.width * 0.75);
      }
      if (this.playerToFollow.y < this.getTopEdge()) {
         this.y = this.playerToFollow.y - (this.height * 0.25);
      }
      if (this.playerToFollow.y + this.playerToFollow.height > this.getBottomEdge()) {
         this.y = this.playerToFollow.y + this.playerToFollow.height - (this.height * 0.75);
      }
   }

   setLimitsForCameraMovement() {
      if (this.x < 0) {
         this.x = 0;
      }
      if (this.x + this.width > this.map.width) {
         this.x = this.map.width - this.width;
      }
      if (this.y < 0) {
         this.y = 0;
      }
      if (this.y + this.height > this.map.height) {
         this.y = this.map.height - this.height;
      }
   }

   setLimitsForPlayerMovement() {
      if (this.playerToFollow.x < 0) {
         this.playerToFollow.x = 0;
      }
      if (this.playerToFollow.x + this.playerToFollow.width > this.map.width) {
         this.playerToFollow.x = this.map.width - this.playerToFollow.width;
      }
      if (this.playerToFollow.y < 0) {
         this.playerToFollow.y = 0;
      }
      if (this.playerToFollow.y + this.playerToFollow.height > this.map.height) {
         this.playerToFollow.y = this.map.height - this.playerToFollow.height;
      }
   }

   update() {
      this.followPlayer();
      this.setLimitsForCameraMovement();
      this.setLimitsForPlayerMovement();
   }

   draw(context) {
      context.translate(-this.x, -this.y);
   }
}