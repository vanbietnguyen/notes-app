import axios from 'axios'
import config from '../config.js'

class DrawingService {
  static async getLines(setLines, linesRef) {
    try {
      let result = await axios.get(`${config.SERVER_URI}api/lines/`)

      for(let line of result.data) {
          delete line._id
          delete line.__v
      }
      setLines(result.data)
      // linesRef.current = result.data
      return result.data
      // console.log(result.data, 'lines')
    } catch (e) {
        return e
    }
  }
  static mouseMove(e, lines, setLines) {
    const stage = e.target.getStage();

    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    let lastPoint = [point.x, point.y]
    lastLine.points = lastLine.points.concat(lastPoint);

    
    // replace last
    setLines([...lines])
    return lastPoint
  }

  static mouseDown(e, lines, tool, setLines) {
    const pos = e.target.getStage().getPointerPosition();
    let line = { tool, points: [pos.x, pos.y] }
    console.log(line, 'line in mousedown')
    let newLines = [...lines, line]
    setLines(newLines);
    return line
  }

  static async mouseUp(line) {
    try {
      await axios.post(`${config.SERVER_URI}api/lines/add`, { line })
    } catch(e) {
      return e
    }
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
