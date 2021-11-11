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
    socket.emit("startLines", lines)   
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    DrawingService.mouseMove(e, lines, setLines)
    DrawingService.throttle(400, socket.emit('drawing', lines))
  };

  const handleMouseUp = (e) => {
    let line = lines[lines.length - 1]
    axios.post('api/lines/add', { line })
    isDrawing.current = false;
  }

  return (
    <div>
      <Stage
        className="canvas-stage"
        ref={stageRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer className="layer" clearBeforeDraw={false}>
          
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
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