import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const testArray = [{
  tool: 'pen', 
  points: [161.21875, 395.359375, 161.21875, 395.359375, 161.21875, 395.359375, 163.21875, 395.359375, 169.21875, 395.359375, 180.21875, 392.359375, 197.21875, 385.359375, 213.21875, 376.359375, 228.21875]
}]

const CanvasArea = ({onClearLines, clearLines, drawPointer, tool, lines, setLines}) => {

  const isDrawing = useRef(false);
  const stageRef = useRef(false)

  // check if image exists in db
  // const [loadedDrawing, setLoadedDrawing] = useState(false)

  // useEffect(async() => {
  //   // get image
  //   // if image exists, set loaded drawing to true
  //   // set initial lines to drawing
  // })


  // useEffect(() => {
  //   if(!lines.length) startOver(stageRef.current)
  // }, [lines])

  const startOver = (stage) => {
    if(lines.length) return
    stage.clear()
  }

  const handleMouseDown = (e) => {
    if(!drawPointer) return 
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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

  const handleMouseUp = (e) => isDrawing.current = false;

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