import { useRef, useEffect } from 'react'
import AnimationManager from './Managers/AnimationManager'
import PlayerSprite from './Sprites/PlayerSprite'

const useCanvas = draw => {
   const canvasRef = useRef(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      // let animationFrameId

      let animationPlayer = null;
      let player = null;

      animationPlayer = new AnimationManager("./assets/sprites/player-menu-sprite.png", 64, 100, 14, 18, 1.35);
      player = new PlayerSprite(
         animationPlayer,
         685,
         295,
         animationPlayer.frameWidth,
         animationPlayer.frameHeight
      );

      // const drawAnimation = () => {
      //    console.log(player)
      //    context.save();
      //    context.clearRect(0, 0, canvas.width, canvas.height);
      //    player.draw(context, player.x, player.y);
      //    context.restore();
      // };
      // drawAnimation();

      const render = () => {
         if (!player != null) {
            // drawAnimation();
            // requestAnimationFrame(loop);
            if (!player != null) {
               draw(canvas, context, player);
               window.requestAnimationFrame(render);
            }
         }
      }

      render();
   }, [draw])

   return canvasRef
}

export default useCanvas