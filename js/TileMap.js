"use strict";

class TileMap {
   constructor(tileSize, map, width, height) {
      this.tileSize = tileSize;
      this.map = map;
      this.width = width;
      this.height = height;

      this.tiles = {};
      this.tiles.layers = [];

      // definir os tiles de cada camada
      this.map.layers.forEach((currentMap, index) => {
         this.tiles.layers[index] = this.setTiles(currentMap);
      });

      this.dot = this.setImage(0);
      this.wall = this.setImage(1);
      this.pacman = this.setImage(2);
      this.ghost = this.setImage(3);
      this.floor = this.setImage(4);
   }

   setTiles(currentMap) {
      // declarar array vazio para armazenar os tiles do mapa, com o mesmo número de linhas e colunas
      const tiles = [...Array(31)].map(e => Array(38));

      // atribuir cada tile com o respetivo número e adicioná-lo ao array de tiles
      for (let row = 0; row < currentMap.length; row++) {
         for (let column = 0; column < currentMap[row].length; column++) {
            const tileNumber = currentMap[row][column];
            let tile = null;

            switch (tileNumber) {
               case 0:  // chão
                  tile = new Tile(tileNumber, TILE_TYPE.PASSABLE);
                  break;
               case 1:  // paredes
               case 4:  // objeto
                  tile = new Tile(tileNumber, TILE_TYPE.BLOCK);
                  break;
               case 2:  // personagem principal
                  this.pacman = this.setImage(2);
                  break;
               // case 3:  // inimigo
                  // tile = new Tile(tileNumber, TILE_TYPE.BLOCK);
                  // break;
            }

            if (tile != null) {
               tiles[row][column] = tile;
            }
         }
      }

      return tiles;
   }

   setImage(tileNumber) {
      const img = new Image();
      img.src = `./assets/${tileNumber}.png`;
      return img;
   }

   draw(context) {
      // desenhar cada camada do mapa
      this.tiles.layers.forEach((currentMap) => {
         this.drawMap(context, currentMap);
      });

      // context.fillStyle = "rgba(255, 255, 255, 0.5)";
      // context.fillRect(32 * 0, 32 * 5, 32, 32);
   }

   drawMap(context, currentMap) {
      for (let row = 0; row < currentMap.length; row++) {
         for (let column = 0; column < currentMap[row].length; column++) {
            let tile = currentMap[row][column];

            if (tile != null) {
               context.drawImage(tile.image, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
         }
      }
   }
}