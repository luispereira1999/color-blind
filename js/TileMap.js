"use strict";

class TileMap {
   constructor(tileSize, map) {
      this.tileSize = tileSize;
      this.map = map;

      this.width = this.map[0].length * this.tileSize;
      this.height = this.map.length * this.tileSize;

      this.wall = this.createTile("wall.png");
      this.dot = this.createTile("yellowDot.png");
      this.pacman = this.createTile("pacman.png");
      this.ghost = this.createTile("ghost.png");
   }

   createTile(fileName) {
      const img = new Image();
      img.src = `./assets/${fileName}`;
      return img;
   }

   draw(canvas, context) {
      this.drawMap(context);
   }

   drawMap(context) {
      for (let row = 0; row < this.map.length; row++) {
         for (let column = 0; column < this.map[row].length; column++) {
            const tile = this.map[row][column];
            let image = null;

            switch (tile) {
               case 0:
                  image = this.dot;
                  break;
               case 1:
                  image = this.wall;
                  break;
               case 2:
                  image = this.pacman;
                  break;
               case 3:
                  image = this.ghost;
                  break;
            }

            if (image != null)
               context.drawImage(image, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
         }
      }
   }
}