"use strict";

class TileMap {
   constructor(tileSize, map, width, height) {
      this.tileSize = tileSize;
      this.map = map;
      this.width = width;
      this.height = height;

      this.tiles = {};
      this.tiles.layers = [];

      this.startPlayerPosition = {};
      this.startEnemiesPosition = [];

      // definir os tiles de cada camada
      this.map.layers.forEach((currentMap, index) => {
         this.tiles.layers[index] = this.setTiles(currentMap);
      });
   }

   setTiles(currentMap) {
      // declarar array vazio para armazenar os tiles do mapa, com o mesmo número de linhas e colunas
      const tiles = [...Array(31)].map(e => Array(38));
      let position = {};

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
                  position = this.getPosition(row * this.tileSize, column * this.tileSize);
                  this.startPlayerPosition = position;
                  break;
               case 3:  // inimigos
                  position = this.getPosition(row * this.tileSize, column * this.tileSize);
                  this.startEnemiesPosition.push(position);
                  break;
            }

            if (tile != null) {
               tiles[row][column] = tile;
            }
         }
      }

      return tiles;
   }

   getPosition(x, y) {
      return {
         x: x,
         y: y
      }
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