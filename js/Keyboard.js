"use strict";

class Keyboard {
   static Keys = {
      LEFT: 37,
      RIGHT: 39,
      UP: 38,
      DOWN: 40
   }

   // quando a tecla é pressionada
   addKeydown(callFunction) {
      document.addEventListener("keydown", callFunction);
   }

   // quando a tecla é solta
   addKeyup(callFunction) {
      document.addEventListener("keyup", callFunction);
   }
}