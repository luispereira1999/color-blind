"use strict";

class CameraManager {
   constructor(x, y, width, height, player, tileMap) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.player = player;
      this.tileMap = tileMap;
   }

   getBounds() {
      return {
         left: this.x + (this.width * 0.25),
         right: this.x + (this.width * 0.75),
         top: this.y + (this.height * 0.25),
         bottom: this.y + (this.height * 0.75)
      };
   }

   update() {
      this.followPlayer();
      this.setLimitsForCameraMovement();
      this.setLimitsForPlayerMovement();
   }

   followPlayer() {
      if (this.player.x < this.getBounds().left) {
         this.x = this.player.x - (this.width * 0.25);
      }
      if (this.player.x + this.player.width > this.getBounds().right) {
         this.x = this.player.x + this.player.width - (this.width * 0.75);
      }
      if (this.player.y < this.getBounds().top) {
         this.y = this.player.y - (this.height * 0.25);
      }
      if (this.player.y + this.player.height > this.getBounds().bottom) {
         this.y = this.player.y + this.player.height - (this.height * 0.75);
      }
   }

   setLimitsForCameraMovement() {
      if (this.x < 0) {
         this.x = 0;
      }
      if (this.x + this.width > this.tileMap.width * this.tileMap.scale) {
         this.x = this.tileMap.width * this.tileMap.scale - this.width;
      }
      if (this.y < 0) {
         this.y = 0;
      }
      if (this.y + this.height > this.tileMap.height * this.tileMap.scale) {
         this.y = this.tileMap.height * this.tileMap.scale - this.height;
      }
   }

   setLimitsForPlayerMovement() {
      if (this.player.x < 0) {
         this.player.x = 0;
      }
      if (this.player.x + this.player.width > this.tileMap.width * this.tileMap.scale) {
         this.player.x = (this.tileMap.width - this.player.width) * this.tileMap.scale;
      }
      if (this.player.y < 0) {
         this.player.y = 0;
      }
      if (this.player.y + this.player.height > this.tileMap.height * this.tileMap.scale) {
         this.player.y = (this.tileMap.height - this.player.height) * this.tileMap.scale;
      }
   }

   draw(context) {
      // desenhar o mapa em função das posições x e y da câmara
      context.translate(-this.x, -this.y);
   }
}