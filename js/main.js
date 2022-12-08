"use strict";

function startGame() {
   const canvas = document.getElementById("gameScreen");
   const context = canvas.getContext("2d");

   const gameManager = new GameManager(canvas, context);
   gameManager.startLevel();
}