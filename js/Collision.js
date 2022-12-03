"use strict";

function isCollide(rect1, rect2) {
   return (
      rect1.left < rect2.left + rect2.right &&
      rect1.left + rect1.right > rect2.left &&
      rect1.top < rect2.top + rect2.bottom &&
      rect1.bottom + rect1.top > rect2.top
   );
}