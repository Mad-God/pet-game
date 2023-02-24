import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { set as setName } from "../../store/name";
import { set as setNames } from "../../store/names";

function ChooseName({}) {
  // const [names, setNames] = useState([]);
  const lobby = useSelector((state) => state.lobby);
  const names = useSelector((state) => state.names);
  const name = useSelector((state) => state.name);
  const dispatch = useDispatch();

  // get the joined players' names from backend and set into the names state;
  useEffect(() => {
    (async () => {
      // get the names of players joined in current lobby
      console.log(lobby);
      const res = await axios.get(
        `http://${
          window.location.toString().split(":")[1]
        }:8000/api/get-names/?lobby=${lobby}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setNames(res.data.names));
      console.log("reponse: ", res);
      console.log("names: ", res.data.names);
    })();
    return () => {
      console.log("exited chooseName Component");
    };
  }, []);

  function set_name_from_input(event) {
    dispatch(setName(event.target.value));
  }

  // return <>Hello</>;

  return (
    <div className="container d-block bg-success py-5 align-items-center justify-content-center">
      <div className="align-items-center d-flex flex-column w-100">
        <h1 className="m-2 text-primary fw-bold text-bg-dark px-4 w-100">
          You're in Lobby: {lobby.id}
        </h1>

        <div className="mx-auto">
          {/* if there are some players already joined in the lobby, show their list */}
          {names.length > 0 ? (
            <div>
              <h3>Currently Joined in lobby: </h3>
              <div className="row">
                {names.map((item, index) => {
                  return (
                    <div key={new Date().getTime() + index} className="col-3">
                      <p className="m-3 form-control-lg bg-opacity-75 bg-dark">
                        {item}
                      </p>
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}

          <label className="mx-2 my-3 h5" htmlFor="name-input">
            Enter a new gamertag:
          </label>
          <input
            type="text"
            id="name-input"
            maxLength={30}
            onChange={(event) => {
              set_name_from_input(event);
            }}
            value={name}
          />
          <hr />
          {name ? (
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

export default ChooseName;
