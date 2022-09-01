import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup, Todo } from "./pages";

function App() {
  return (
    <div className="App">
      <h2 className="title">todos</h2>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
