"use strict";

function startGame() {
   const canvas = document.getElementById("gameScreen");
   const context = canvas.getContext("2d");

   const gameController = new GameController(canvas, context);
   gameController.startLevel();
}