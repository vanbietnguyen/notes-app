/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const CanvasArea = ({onClearLines, clearLines, drawPointer, tool, lines, setLines}) => {

  const isDrawing = useRef(false);
  const stageRef = useRef(false)


  useEffect(() => {
    if(!lines.length) startOver(stageRef.current)
  }, [lines])

  const startOver = (stage) => {
    if(lines.length) return
    stage.clear()
  }

  const handleMouseDown = (e) => {
    if(!drawPointer) return 
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    console.log(lines, 'lines')
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();

    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = (e) => {
    // send lines to backend here
    let line = lines[lines.length - 1]
    console.log(line, 'line')
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