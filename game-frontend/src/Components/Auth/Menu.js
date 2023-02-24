import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLobbies, addLobby } from "../../store/lobbies";
import { set as setLobby } from "../../store/lobby";
import { set as setError } from "../../store/error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Menu({ lobby }) {
  const navigator = useNavigate();
  const lobbies = useSelector((state) => state.lobbies);
  const dispatch = useDispatch();
  console.log(process.env.REACT_APP_URL);
  // get the list of lobbies' id and set into the lobbies state.
  useEffect(() => {
    dispatch(setLobbies([]));
    (async () => {
      console.log("fetched the names.");
      const res = await axios.get(
        `http://${
          window.location.toString().split(":")[1]
        }:8000/api/get-lobbies/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data: ", res.data)
      toast.success("Fetched all active Lobbies");
      dispatch(setLobbies(res.data));
    })();
  }, []);

  // set the lobby state and redirect to /lobby/
  const join_existing_lobby = (current_lobby) => {
    dispatch(setLobby(current_lobby));
    navigator("/lobby/");
  };

  // get a new lobby id from backend, set it into lobby state and redirect to /lobby/
  const create_a_lobby_and_redirect = async () => {
    try {
      const res = await axios.post(
        `http://${
          window.location.toString().split(":")[1]
        }:8000/api/get-lobbies/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.status == 201) {
        dispatch(setLobby(res.data));
        dispatch(addLobby(res.data));
        navigator("/lobby/");
        console.log("successfully created lobby");
      } else {
        dispatch(setError("1 Could not create a new Lobby !1!"));
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }

    // .then((res) => {
    //   if (res?.status == 201) {
    //     dispatch(setLobby(res.data));
    //     dispatch(addLobby(res.data));
    //     navigator("/lobby/");
    //     console.log("successfully created lobby");
    //   } else {
    //     dispatch(setError("1 Could not create a new Lobby !1!"));
    //   }
    //   console.log("then: ", res);
    // })
    // .catch((error) => {
    //   console.log("catch: ", error);
    //   dispatch(setError("2 Could not create a new Lobby !1!", error));
    //   return;
    // });
  };

  return (
    <div className="">
      <h3>Choose Lobby</h3>
      <div className="row w-50 mx-auto">
        {lobbies.map((current_lobby, index) => {
          return (
            <div key={current_lobby.id} className="p-2 col-4">
              <p className="bg-success">
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <h3>Lobby: {current_lobby.id}</h3>
                  </li>
                  <li>Joined Players: {current_lobby.players}</li>
                </ul>
              </p>
              <button
                className="d-inline btn btn-primary"
                onClick={(event) => {
                  join_existing_lobby(current_lobby);
                }}
              >
                Enter
              </button>
              <br />
            </div>
          );
        })}
      </div>
      <button
        className="d-flex m-auto btn btn-primary"
        onClick={create_a_lobby_and_redirect}
      >
        Create a new lobby
      </button>
      <Link id="maze-link" to="/lobby/">
        Go to the maze
      </Link>
    </div>
  );
}

export default Menu;
