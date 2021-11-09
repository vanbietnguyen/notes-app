
// import React, { useEffect, useRef } from 'react';
// import { Stage, Layer, Line } from 'react-konva';

// const CanvasArea2 = ({onClearLines, clearLines, drawPointer, tool, lines, setLines}) => {

//     const isDrawing = useRef(false);
//     const stageRef = useRef(false)

//     useEffect(() => {
//         if(!lines.length) startOver(stageRef.current)
//     }, [lines])

//     let userStrokeStyle = '#EE92C2';
//     // let guestStrokeStyle = '#F0C987';

//     // const startOver = (stage) => {
//     //     if(lines.length) return
//     //     console.log(stage, 'stage')
//     //     // const stage = e.target.getStage();
//     //     stage.clear()
//     // }
  
//     const handleMouseDown = ({ nativeEvent }) => {
//         if(!drawPointer) return 
//         const { offsetX, offsetY } = nativeEvent;
//         isDrawing.current = true;
//         this.prevPos = { offsetX, offsetY };
//     };
  
//     const handleMouseMove = ({ nativeEvent }) => {
//         if (isDrawing.current) {
//             const { offsetX, offsetY } = nativeEvent;
//             const offSetData = { offsetX, offsetY };
//             // Set the start and stop position of the paint event.
//             const positionData = {
//               start: { ...this.prevPos },
//               stop: { ...offSetData },
//             };
//             // Add the position to the line array
//             setLines([...lines, positionData]);
//             this.paint(this.prevPos, offSetData, this.userStrokeStyle);
//           }
//     };
  
//     const handleMouseUp = (e) => {
  
//     };
  
//     return (
//       <div>

//       </div>
//     );
// }

// export default CanvasArea2;