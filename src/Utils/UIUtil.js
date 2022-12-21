class UIUtil {
   static toggleScreen(elementID, toggle, style = "block") {
      let element = document.getElementById(elementID);
      let display = (toggle) ? style : "none";
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

   static createCircleElement(parentID, idName, className) {
      const newElement = document.createElement("div");

      newElement.setAttribute("id", idName);
      newElement.classList.add(className);

      const parentElement = document.getElementById(parentID);
      parentElement.appendChild(newElement);
   }

   static countSequenceElementsRegistered(parentID, elementClass, classToSearch) {
      const childrens = document.getElementById(parentID).getElementsByClassName(elementClass);
      let counter = 0;

      for (let i = 0; i < childrens.length; i++) {
         if (childrens[i].classList.contains(classToSearch)) {
            counter++;
         }
      }

      return counter;
   }
}

export default UIUtil