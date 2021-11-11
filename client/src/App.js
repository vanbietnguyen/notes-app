import './scss/app.scss';
import NotesContainer from './containers/NotesContainer.js'
// import { v4 as uuid } from 'uuid';

function App() {
  
  
  const dragOver = event => {
    event.stopPropagation();
    event.preventDefault();
  }

  return (
    <div className="App" onDragOver={dragOver}>

      {/* <LoginContainer /> */}
      <NotesContainer />
      

    </div>
  );
}

export default App;
