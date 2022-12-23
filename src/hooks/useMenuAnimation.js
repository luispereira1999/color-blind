import { useRef, useEffect } from 'react';
import AnimationManager from '../Managers/AnimationManager';
import { PlayerSprite } from '../Sprites/PlayerSprite';

import playerMenuImage from '../assets/sprites/player-menu-sprite.png';

const useMenuAnimation = (drawMenuAnimation) => {
   const canvasRef = useRef(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      let animationPlayer = null;
      let player = null;

      animationPlayer = new AnimationManager(playerMenuImage, 64, 100, 14, 18, 1.35);
      player = new PlayerSprite(
         animationPlayer,
         685,
         295,
         animationPlayer.frameWidth,
         animationPlayer.frameHeight
      );

      const drawAnimation = (canvas, context, player) => {
         context.save();
         context.clearRect(0, 0, canvas.width, canvas.height);
         player.draw(context);
         context.restore();
      };

      const loop = () => {
         if (!player != null) {
            drawAnimation(canvas, context, player);
            window.requestAnimationFrame(loop);
         }
      };

      loop();
   }, [drawMenuAnimation]);

   return canvasRef;
}

export default useMenuAnimation