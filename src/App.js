import React from 'react'
import Canvas from './Canvas'

function App() {
  const draw = (canvas, context, player) => {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    context.restore();
  }

  return <Canvas draw={draw} />
}

export default App