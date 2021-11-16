import './scss/app.scss';
import NotesContainer from './containers/NotesContainer.js'
import VideoContainer from './containers/VideoContainer'

function App() {
  
  
  const dragOver = event => {
    event.stopPropagation();
    event.preventDefault();
  }

  return (
    <div className="App" onDragOver={dragOver}>

      {/* <LoginContainer /> */}
      <NotesContainer />
      <VideoContainer />

    </div>
  );
}

export default App;
