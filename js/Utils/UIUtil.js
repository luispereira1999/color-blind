"use strict";

class UIUtil {
   static toggleScreen(elementID, toggle) {
      let element = document.getElementById(elementID);
      let display = (toggle) ? 'block' : 'none';
      element.style.display = display;
   }

   static getDisplayState(elementID) {
      let element = document.getElementById(elementID);
      return element.style.display;
   }

   static changeText(elementID, text) {
      let element = document.getElementById(elementID);
      element.innerText = text;
   }
}