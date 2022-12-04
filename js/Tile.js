"use strict";

const TILE_TYPE = {
   PASSABLE: 0,
   BLOCK: 1
}

class Tile {
   constructor(tileNumber, type) {
      this.tileNumber = tileNumber;
      this.image = this.setImage(tileNumber);
      this.type = type;
   }

   setImage(tileNumber) {
      const image = new Image();
      image.src = `./assets/${tileNumber}.png`;
      return image;
   }
}