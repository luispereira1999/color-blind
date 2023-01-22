const ENEMY_TYPE = {
   HORIZONTAL: 0,
   VERTICAL: 1
}

const MOVEMENT_SENSE = {
   RIGHT: 0,
   LEFT: 1,
   TOP: 2,
   BOTTOM: 3
}

class EnemySprite {
   constructor(animation, x, y, width, height, type, speed = 1.0, numberOfTilesToMove = 3) {
      this.animation = animation;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.type = type;
      this.speed = speed;
      this.numberOfTilesToMove = numberOfTilesToMove;

      this.movementSense = MOVEMENT_SENSE.RIGHT;
      this.startX = this.x;
      this.startY = this.y;
   }

   getBounds() {
      return {
         left: this.x,
         right: this.width * this.animation.scale,
         top: this.y,
         bottom: this.height * this.animation.scale,
      }
   }

   update(tileSize, tileMapScale) {
      this.move(tileSize, tileMapScale);
   }

   move(tileSize, tileMapScale) {
      if (this.type === ENEMY_TYPE.HORIZONTAL) {
         if (this.movementSense === MOVEMENT_SENSE.LEFT) {
            this.x -= this.speed;
            if (this.x < this.startX) {
               this.movementSense = MOVEMENT_SENSE.RIGHT;
            }

            return;
         }

         // se o inimigo atingir o limite de andar à direita
         if (this.x > (this.startX + this.numberOfTilesToMove * tileSize * tileMapScale) - (tileSize * tileMapScale) + (tileSize / 2)) {
            this.movementSense = MOVEMENT_SENSE.LEFT;
            return;
         }

         // andar automaticamente até ao limite
         this.x += this.speed;
      } else {
         if (this.movementSense === MOVEMENT_SENSE.TOP) {
            this.y -= this.speed;
            if (this.y < this.startY) {
               this.movementSense = MOVEMENT_SENSE.BOTTOM;
            }

            return;
         }

         // se o inimigo atingir o limite de andar à direita
         if (this.y > (this.startY + this.numberOfTilesToMove * tileSize * tileMapScale) - (tileSize * tileMapScale) - (tileSize / 4)) {
            this.movementSense = MOVEMENT_SENSE.TOP;
            return;
         }

         // andar automaticamente até ao limite
         this.y += this.speed;
      }
   }

   draw(context) {
      this.animation.draw(context, this.x, this.y);
   }
}

export {
   ENEMY_TYPE,
   MOVEMENT_SENSE,
   EnemySprite
} 