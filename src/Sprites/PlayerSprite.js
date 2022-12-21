// "use strict";

import KeyboardManager from '../Managers/KeyboardManager'

const PLAYER_STATE = {
   ALIVE: 0,
   DEAD: 1,
   ALIVE_AND_FREE: 2
}

class PlayerSprite {
   constructor(animation, x, y, width, height, speed = 1.0) {
      this.animation = animation;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;

      this.moveLeft = false;
      this.moveRight = false;
      this.moveUp = false;
      this.moveDown = false;
      this.actionPressed = false;
      this.state = PLAYER_STATE.ALIVE;
      this.moveBlocked = false;
      this.doorOpened = false;

      this.keyboard = new KeyboardManager();
      this.keyboard.addKeypress(this.onKeypressPressed);
      this.keyboard.addKeydown(this.onKeydownPressed);
      this.keyboard.addKeyup(this.onKeyupPressed);

      this.lampEnableAudio = new Audio('./assets/sounds/lamp-enable-sound.wav');
      this.lampErrorAudio = new Audio('./assets/sounds/lamp-error-sound.mp3');
      this.wallAudio = new Audio('./assets/sounds/wall-sound.mp3');
      this.walkAudio = new Audio('./assets/sounds/walk-sound.mp3');
      this.doorAudio = new Audio('./assets/sounds/door-sound.mp3');
   }

   onKeydownPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case KeyboardManager.Keys.LEFT:
            this.moveLeft = true;
            this.walkAudio.play();
            this.walkAudio.volume = 0.75;
            break;
         case KeyboardManager.Keys.RIGHT:
            this.moveRight = true;
            this.walkAudio.play();
            this.walkAudio.volume = 0.75;
            break;
         case KeyboardManager.Keys.UP:
            this.moveUp = true;
            this.walkAudio.play();
            this.walkAudio.volume = 0.75;
            break;
         case KeyboardManager.Keys.DOWN:
            this.moveDown = true;
            this.walkAudio.play();
            this.walkAudio.volume = 0.75;
            break;
      }
   }

   onKeyupPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case KeyboardManager.Keys.LEFT:
            this.moveLeft = false;
            break;
         case KeyboardManager.Keys.RIGHT:
            this.moveRight = false;
            break;
         case KeyboardManager.Keys.UP:
            this.moveUp = false;
            break;
         case KeyboardManager.Keys.DOWN:
            this.moveDown = false;
            break;
      }
   }

   onKeypressPressed = (event) => {
      const keyPressed = event.keyCode;

      switch (keyPressed) {
         case KeyboardManager.Keys.SPACE:
            this.actionPressed = true;
            break;
      }
   }

   draw(context) {
      this.animation.draw(context, this.x, this.y);
   }
}

export default PlayerSprite