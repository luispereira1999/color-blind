"use strict";

class Keyboard {
   static Keys = {
      LEFT: 37,
      RIGHT: 39,
      UP: 38,
      DOWN: 40,
      SPACE: 32
   }

   // quando a tecla é pressionada uma vez
   addKeypress(callFunction) {
      document.addEventListener("keypress", callFunction);
   }

   // quando a tecla é pressionada e não solta
   addKeydown(callFunction) {
      document.addEventListener("keydown", callFunction);
   }

   // quando a tecla é solta
   addKeyup(callFunction) {
      document.addEventListener("keyup", callFunction);
   }
}