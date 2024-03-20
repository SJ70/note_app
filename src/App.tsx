import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './stylesheets/App.css';
import Notes from './components/Notes';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Notes selectedTag={null}></Notes>}></Route>
          <Route path='/:tag' element={<></>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
