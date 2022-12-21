import React from 'react'
import useCanvas from '../hooks/useCanvas'

const Canvas = (props) => {
   const draw = props.draw;
   const canvasRef = useCanvas(draw);

   return <canvas id="menuAnimation" width="896" height="576" ref={canvasRef} />
}

export default Canvas