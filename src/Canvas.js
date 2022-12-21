import React from 'react'
import useCanvas from './useCanvas'

const Canvas = props => {
   const { draw, ...rest } = props
   const canvasRef = useCanvas(draw)

   return <canvas id="menuAnimation" width="896" height="576" ref={canvasRef} {...rest} />
}

export default Canvas