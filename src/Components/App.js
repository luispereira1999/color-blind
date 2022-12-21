import React from 'react';
import Menu from './Menu';

function App() {
  const drawMenuAnimation = (canvas, context, player) => {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    context.restore();
  };

  return (
    <React.Fragment>
      <div id="menuScreen">
        <Menu drawMenuAnimation={drawMenuAnimation} />
      </div>
    </React.Fragment>
  );
}

export default App