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
      this.startLampsPosition = [];

      // definir os tiles de cada camada
      this.map.layers.forEach((currentMap, index) => {
         this.tiles.layers[index] = this.setTiles(currentMap);
      });
   }

   setTiles(currentMap) {
      // declarar array vazio para armazenar os tiles do mapa, com o mesmo número de linhas e colunas
      const tiles = [...Array(this.width / 32)].map(e => Array(this.height / 32));
      let position = {};

      // atribuir cada tile com o respetivo número e adicioná-lo ao array de tiles
      for (let row = 0; row < currentMap.length; row++) {
         for (let column = 0; column < currentMap[row].length; column++) {
            const tileNumber = currentMap[row][column];
            let tile = null;

            switch (tileNumber) {
               case 0:  // chão
               case 20:
                  tile = new Tile(tileNumber, TILE_TYPE.PASSABLE);
                  break;
               case 1:  // paredes
               case 2:
               case 3:
               case 4:
               case 5:
               case 6:
               case 7:
               case 8:
               case 9:
               case 10:
               case 11:
               case 12:
               case 13:
               case 14:
               case 15:
               case 16:
               case 17:
               case 18:
               case 19:
                  tile = new Tile(tileNumber, TILE_TYPE.BLOCK);
                  break;
               case 99:  // personagem principal
                  position = this.getPosition(column * this.tileSize, row * this.tileSize);
                  this.startPlayerPosition = position;
                  break;
               case 98:  // inimigos
                  position = this.getPosition(column * this.tileSize, row * this.tileSize);
                  this.startEnemiesPosition.push(position);
                  break;
               case 97:  // lâmpada
                  position = this.getPosition(column * this.tileSize, row * this.tileSize);
                  this.startLampsPosition.push(position);
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