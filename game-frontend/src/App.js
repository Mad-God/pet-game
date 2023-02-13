import "./App.css";
import ChooseName from "./Components/Auth/ChooseName";
import Menu from "./Components/Auth/Menu";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Maze from "./Components/Maze/Maze";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorMessage from "./Components/Error";

function App() {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [lobby, setLobby] = useState(null);
  const [chatSocket, setChatSocket] = useState(null);

  return (
    <div className="App ">
      <Provider store={store}>
        <span className="font-weight-bold h1">Pet Game Testing </span>
        <ErrorMessage />
        <div className="p-3 bg-gradient bg-info bg-opacity-10">
          <Router>
            <Routes>
              {/* <Route index element={<Login />} /> */}
              <Route
                path="/"
                element={
                  <Menu lobbies={lobby} setLobby={setLobby} lobby={lobby} />
                }
              ></Route>
              <Route
                path="/lobby/"
                element={
                  <ChooseName setName={setName} name={name} lobby={lobby} />
                }
              ></Route>
              <Route
                exact
                path="/maze/"
                element={
                  <Maze
                    names={names}
                    name={name}
                    lobby={lobby}
                    chatSocket={chatSocket}
                    setChatSocket={setChatSocket}
                  />
                }
              />
            </Routes>
          </Router>
        </div>
      </Provider>
    </div>
  );
}

export default App;
