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
    DrawingService.mouseDown(e, lines, tool, setLines)
    socket.emit("drawing", lines)   
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    DrawingService.mouseMove(e, lines, setLines)
    DrawingService.throttle(400, socket.emit('drawing', lines))
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
        // style={{margin: '10vw'}}
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
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default CanvasArea;