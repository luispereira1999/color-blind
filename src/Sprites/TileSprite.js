const TILE_TYPE = {
   PASSABLE: 0,
   BLOCK: 1
}

class TileSprite {
   constructor(tileNumber, type) {
      this.tileNumber = tileNumber;
      this.image = this.setImage(tileNumber);
      this.type = type;
   }

   setImage(tileNumber) {
      const image = new Image();
      image.src = `./assets/tiles/${tileNumber}.png`;
      return image;
   }
}

export {
   TILE_TYPE,
   TileSprite
}  