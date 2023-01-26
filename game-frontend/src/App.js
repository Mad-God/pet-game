import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Auth/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Maze from "./Components/Maze/Maze";
import { useState } from "react";
// import Router

function App() {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  
  return (
    <div className="App ">
      <span className="font-weight-bold">Hello </span> Hello
      <Router>
        <Routes>
          {/* <Route index element={<Login />} /> */}
          <Route
            path="/"
            element={<Login setNames={setNames} names={names} setName={setName} name={name} />}
          ></Route>
          <Route exact path="/maze/" element={<Maze names={names} name={name} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
