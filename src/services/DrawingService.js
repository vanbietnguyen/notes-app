class DrawingService {

    static mouseMove(e, lines, setLines) {
      const stage = e.target.getStage();

      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      
      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      return setLines(lines.concat())
    }

    static mouseDown(e, lines, tool, setLines) {
      const pos = e.target.getStage().getPointerPosition();
      let line = { tool, points: [pos.x, pos.y] }
      let newLines = [...lines, line]
      return setLines(newLines);
    }

    static throttle(callback, delay) {
        let previousCall = new Date().getTime();
        return function() {
          const time = new Date().getTime();
    
          if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
          }
        };
    }

}


export default DrawingService;
