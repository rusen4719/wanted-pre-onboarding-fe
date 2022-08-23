import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Todo from './routes/Todo';

function App() {
  return (
    <div className="App">
      <h2 className='title'>todos</h2>
      <BrowserRouter>
        <Routes>
         <Route path='/' element={<Login></Login>}></Route>
         <Route path='/signup' element={<Signup></Signup>}></Route>
         <Route path='/todo' element={<Todo></Todo>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
