"use strict";

class ColorService {
   getColors(numberOfColors) {
      return new Promise((resolve, reject) => {
         fetch(`https://www.colr.org/json/colors/random/${numberOfColors}`, {
            method: "GET"
         }).then(data => resolve(data))
            .catch(error => reject(error));
      });
   }
}