class KeyboardManager {
   static Keys = {
      LEFT: 65,
      RIGHT: 68,
      UP: 87,
      DOWN: 83,
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

export default KeyboardManager