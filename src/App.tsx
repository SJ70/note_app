import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './stylesheets/App.css';
import Notes, { NotesType } from './components/Notes';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar/>
        <Routes>
          <Route path='/' element={<Notes notesType={NotesType.ALL}/>}></Route>
          <Route path='/tag/:selectedTagId' element={<Notes notesType={NotesType.TAGGED}/>}></Route>
          <Route path='/deleted' element={<Notes notesType={NotesType.DELETED}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
