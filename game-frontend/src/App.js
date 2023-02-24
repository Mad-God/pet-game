import "./App.css";
import ChooseName from "./Components/Auth/ChooseName";
import Menu from "./Components/Auth/Menu";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Maze from "./Components/Maze/Maze";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorMessage from "./Components/Error";
import { ToastContainer, toast } from 'react-toastify';

// for persist
import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/lib/persistStore";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

function App() {
  return (
    <PersistGate persistor={persistor}>
      <div className="App ">
        <Provider store={store}>
          <span className="font-weight-bold h1">Pet Game Testing </span>
          <ErrorMessage />
          <div className="p-3 bg-gradient bg-info bg-opacity-10">
            <Router>
              <Routes>
                {/* <Route index element={<Login />} /> */}
                <Route path="/" element={<Menu />}></Route>
                <Route path="/lobby/" element={<ChooseName />}></Route>
                <Route exact path="/maze/" element={<Maze />} />
              </Routes>
            </Router>
          </div>
        </Provider>
      </div>
      <ToastContainer />
    </PersistGate>
  );
}

export default App;
