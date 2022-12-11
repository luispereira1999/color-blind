"use strict";

class PopupManager {
   constructor(elementID) {
      this.elementID = elementID;
   }

   onBackToMenu() {
      document.querySelector(`#${this.elementID} .popup-back-to-menu-button`).onclick = () => {
         UIUtil.toggleScreen('menuScreen', true);
         UIUtil.toggleScreen('gameScreen', false);
         UIUtil.toggleScreen('gameScreenUI', false);
         UIUtil.toggleScreen(this.elementID, false);
      };
   }
}