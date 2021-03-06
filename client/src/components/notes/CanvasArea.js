/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import DrawingService from '../../services/DrawingService';

const CanvasArea = ({onClearLines, clearLines, drawPointer, tool, lines, setLines, socket}) => {

  const isDrawing = useRef(false);
  const stageRef = useRef(false)


  useEffect(() => {
    if(!lines.length) startOver(stageRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines])

  const startOver = (stage) => stage.clear()

  const handleMouseDown = (e) => {
    if(!drawPointer) return
    isDrawing.current = true;
    let line = DrawingService.mouseDown(e, lines, tool, setLines)
    socket.emit("drawing", line)   
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    let lastPoint = DrawingService.mouseMove(e, lines, setLines)
    DrawingService.throttle(400, socket.emit('drawingMove', lastPoint))
  };

  const handleMouseUp = () => {
    let line = lines[lines.length - 1]
    DrawingService.mouseUp(line)
    isDrawing.current = false;
  }

  return (
    <div>
      <Stage
        className="canvas-stage"
        ref={stageRef}
        width={window.innerWidth * .8}
        height={window.innerHeight * .9}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer className="layer" clearBeforeDraw={false}>
          
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000000"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />))}
        </Layer>
      </Stage>
    </div>
  );
}

export default CanvasArea;