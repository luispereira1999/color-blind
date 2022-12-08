"use strict";

const LAMP_STATE = {
   DISABLE: 0,
   ENABLE: 1
}

class LampSprite {
   constructor(imagePath, x, y, width, height, color, state) {
      this.image = this.setImage(imagePath);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.state = state;

      this.opacity = this.getOpacity();
      this.color = this.convertHexToRGBA(color, this.opacity)
   }

   setImage(path) {
      const image = new Image();
      image.src = path;
      return image;
   }

   getOpacity() {
      let opacity = 0;

      if (this.state == LAMP_STATE.ENABLE) {
         opacity = 0.85;
      } else {
         opacity = 0.45;
      }

      return opacity;
   }

   convertHexToRGBA(hexCode, opacity = 1) {
      let hex = hexCode.replace('#', '');

      if (hex.length === 3) {
         hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
      }

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      if (opacity > 1 && opacity <= 100) {
         opacity = opacity / 100;
      }

      return `rgba(${r},${g},${b},${opacity})`;
   };

   changeOpacityFromRGBA(rgbaCode, opacity = 1) {
      rgbaCode = rgbaCode.replace(/[^,]+(?=\))/, opacity);
      return rgbaCode;
   };

   getBounds() {
      return {
         left: this.x,
         right: this.width,
         top: this.y,
         bottom: this.height,
      }
   }

   draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.drawColor(context);
   }

   drawColor(context) {
      context.beginPath();
      context.arc(
         this.x + 16,
         this.y + 13,
         10,
         0,
         2 * Math.PI,
         false
      );

      this.opacity = this.getOpacity();
      this.color = this.changeOpacityFromRGBA(this.color, this.opacity);

      context.fillStyle = this.color;
      context.fill();
   }
}