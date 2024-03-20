import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './stylesheets/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/:tag' element={<></>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
