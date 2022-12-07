"use strict";

function startGame() {
   toggleScreen('menuScreen', false);
   toggleScreen('gameScreen', true);

   const canvas = document.getElementById("gameScreen");
   const context = canvas.getContext("2d");

   const gameController = new GameController(canvas, context);
   gameController.startLevel();
}

function toggleScreen(elementId, toggle) {
   let element = document.getElementById(elementId);
   let display = (toggle) ? 'block' : 'none';
   element.style.display = display;
}

function getLevelProperties(levelIndex) {
   let map;
   let tileSize;
   let width;
   let height;
   let tileMap;
   let time;
   let lives;

   switch (levelIndex) {
      case 1:
         map = {
            layers: [[
               [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
               [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
               [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
            ],
            [
               [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 98, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 97, -1, -1, -1, -1, -1, -1, 5, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, 98, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, 11, 15, 15, 15, 15, 12, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, 13, 2, 2, 2, 2, 14, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, 99, -1, -1, 9, 9, 9, 9, 9, 9, -1, -1, -1, -1, -1, 97, -1, -1, -1, 5, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, 97, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 19, 2, 2, 18, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 4, 4, 4, 4, 4, 4, 4, 4, 9, 9, 9, 9, 4, 4, 4, 4, 17, -1, -1, -1, -1, 8, 4, 4, 4, 4, 4, 7, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, 4, 4, 4, 4, 4, -1, -1, -1, -1, 5, 4, 4, 4, 4, 4, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, 4, 4, 18, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 4, 4, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 15, 15, 15, 12, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 4, 4, 4, 4, 4, 7, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 13, 2, 2, 2, 14, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 9, 9, 9, 9, 9, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, 5],
               [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7]
            ]]
         };

         tileSize = 32;
         width = map.layers[0][0].length * 32;
         height = map.layers[0].length * 32;
         tileMap = new TileMap(tileSize, map, width, height);

         time = 120000;  // milissegundos
         lives = 3;
         break;
      case 2:
         map = {
            layers: [[
               [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, -1, -1, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, -1, -1, -1, -1, -1, -1, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, -1, -1, -1, -1, -1, -1, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, -1, -1, -1, -1, -1, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, -1, -1, -1, -1, -1, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1, 20, 20, 20, 20, -1, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -1],
               [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            ],
            [
               [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, 99, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 3, -1, -1, -1, 4, 4, 4, 17, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, 16, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, 4, 4, 4, 4, 4, 4, 7, -1, -1, -1, -1, 5, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, 4, 4, 4, 4, 18, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, 16, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 17, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, 8, 4, 4, 4, 4, 4, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, 16, 4, 4, 4, 4, 4, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, 19, 4, 4, 4, 4, 4, 4, 4, 4, 18, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
               [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7],
            ]]
         };

         tileSize = 32;
         width = map.layers[0][0].length * 32;
         height = map.layers[0].length * 32;
         tileMap = new TileMap(tileSize, map, width, height);

         time = 60000;  // milissegundos
         lives = 3;
         break;
   }

   return {
      tileSize: tileSize,
      width: width,
      height: height,
      tileMap: tileMap,
      time: time,
      lives: lives
   }
}