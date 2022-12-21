"use strict";

class TileMapManager {
   constructor(tileSize, map, width, height, scale = 1) {
      this.tileSize = tileSize;
      this.map = map;
      this.width = width;
      this.height = height;
      this.scale = scale;

      this.tiles = {};
      this.tiles.layers = [];

      this.startPlayerPosition = {};
      this.startDoorPosition = {};
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
               case 21:
                  tile = new TileSprite(tileNumber, TILE_TYPE.PASSABLE);
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
               case 22:
               case 23:
               case 24:
               case 25:
               case 26:
               case 27:
               case 28:
               case 29:
               case 30:
                  tile = new TileSprite(tileNumber, TILE_TYPE.BLOCK);
                  break;
               case 99:  // personagem principal
                  position = this.getPosition(column * this.tileSize * this.scale, row * this.tileSize * this.scale);
                  this.startPlayerPosition = position;
                  break;
               case 98:  // inimigos na horizontal
                  position = this.getPosition(column * this.tileSize * this.scale, row * this.tileSize * this.scale);
                  position.tileNumber = 98
                  this.startEnemiesPosition.push(position);
                  break;
               case 97:  // lâmpada
                  position = this.getPosition(column * this.tileSize * this.scale, row * this.tileSize * this.scale);
                  this.startLampsPosition.push(position);
                  break;
               case 96:  // porta (fim do nível)
                  position = this.getPosition(column * this.tileSize * this.scale, row * this.tileSize * this.scale);
                  this.startDoorPosition = position;
                  break;
               case 95:  // inimigos na vertical
                  position = this.getPosition(column * this.tileSize * this.scale, row * this.tileSize * this.scale);
                  position.tileNumber = 95
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
   }

   drawMap(context, currentMap) {
      for (let row = 0; row < currentMap.length; row++) {
         for (let column = 0; column < currentMap[row].length; column++) {
            let tile = currentMap[row][column];

            if (tile != null) {
               context.drawImage(tile.image, column * this.tileSize * this.scale, row * this.tileSize * this.scale, this.tileSize * this.scale, this.tileSize * this.scale);
            }
         }
      }
   }
}