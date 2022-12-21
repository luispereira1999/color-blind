import React from 'react';
// import Canvas from './Canvas';
import Menu from './Menu';

function App() {
  const onLoadMenu = (canvas, context, player) => {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    context.restore();
  };

  // const draw = (canvas, context, player) => {
  //   context.save();
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   player.draw(context);
  //   context.restore();
  // }

  // return <Canvas draw={draw} />

  return (
    <React.Fragment>
      <div id="menuScreen">
        <Menu loadMenu={onLoadMenu} />
      </div>
    </React.Fragment>
  );
}

export default App