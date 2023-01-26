import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Login({ setNames, names, setName, name }) {
  const [current_name, setCurrentName] = useState("");
  // var name_input_value = ""
  const [input_name, setInputName] = useState("");
  useEffect(() => {
    // Update the document title using the browser API
    (async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/get-names/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNames(res.data.names);
    })();
    return function cleanup(event) {
      console.log(`called second useeffect input_name: ${input_name}, name: ${name}, event: ${event}`);
      const input_used = input_name ? setName(input_name) : null;
    };
  }, []);
  

  // useEffect(() => {
  //   const input_used = input_name? setName(input_name):null;
  //   console.log("caled second useeffect ", input_used)
  // }, [Link])

  function set_name_from_radio_button(name_selected) {
    setName(name_selected);
    console.log(name_selected, "here in event listener");
    setCurrentName(name_selected);
    setInputName("");
  }

  function set_name_from_input(event) {
    console.log(event, "here in input event listener");
    setName(event.target.value)
    setInputName(event.target.value);
  }

  return (
    <div className="container d-block bg-success py-5 d-flex align-items-center justify-content-center">
      <div className="align-items-center d-block">
        <h1 className="m-2 text-primary fw-bold text-bg-dark">Login</h1>
        <hr></hr>
        <div className="d-block">
          <h3>Choose a Names for yourself: </h3>

          {names.map((item, index) => {
            return (
              <React.Fragment key={new Date().getTime() + index}>
                <input
                  type="radio"
                  onChange={(event) => {
                    set_name_from_radio_button(item, event);
                  }}
                  id={item + index.toString()}
                  name="name-selected"
                  checked={name === item ? true : false}
                  value={item}
                />
                <label className="mx-2 h5" htmlFor={item + index.toString()}>
                  {item}
                </label>
                <br />
              </React.Fragment>
            );
          })}
          <button
            onClick={() => {setName(""); setCurrentName("")}}
            className="d-block align-center centre"
          >
            Deselect
          </button>
          <label className="mx-2 my-3 h5" htmlFor="name-input">
            Enter a new gamertag:{" "}
          </label>
          <input
            type="text"
            id="name-input"
            maxLength={30}
            onChange={(event) => {
              set_name_from_input(event);
            }}
            value={input_name}
            disabled={current_name}
          />
          <hr />
          <h4 className="b-3 bg-dark my-3 p-2">Currently Selected: {name}</h4>
          {name || input_name ? (
            <Link id="maze-link" to="/maze">
              Go to the maze
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
