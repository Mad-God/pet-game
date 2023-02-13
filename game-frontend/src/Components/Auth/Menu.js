import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLobbies, addLobby } from "../../store/lobbies";
import { set as setLobby } from "../../store/lobby";
import { set as setError } from "../../store/error";


function Menu({ lobby }) {
  const navigator = useNavigate();
  const lobbies = useSelector((state) => state.lobbies);
  const dispatch = useDispatch();

  // get the list of lobbies' id and set into the lobbies state.
  useEffect(() => {
    (async () => {
      console.log("fetched the names.")
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
      dispatch(setLobbies(res.data.lobbies));

    })();
  }, []);

  // set the lobby state and redirect to /lobby/
  const join_existing_lobby = (current_lobby) => {
    dispatch(setLobby(current_lobby));
    navigator("/lobby/");
  };

  // get a new lobby id from backend, set it into lobby state and redirect to /lobby/
  const create_a_lobby_and_redirect = () => {
    console.log("called");
    (async () => {
      const res = await axios.get(
        `http://${
          window.location.toString().split(":")[1]
        }:8000/api/get-new-lobby/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch(function (error) {
        dispatch(setError("Could not create a new Lobby !1!"));
        return;
      });
      if(res?.status == 200){

        // setLobby(res.data.lobby);
        dispatch(setLobby(res.data.lobby));
        dispatch(addLobby(res.data.lobby));
        navigator("/lobby/");
        console.log("success")
      }else{
        dispatch(setError("Could not create a new Lobby !1!"));
      }
    })();
    
  };

  return (
    <div className="">
      <h3>Choose Lobby</h3>
      <div className="row w-50 mx-auto">
        {lobbies.map((current_lobby, index) => {
          return (
            <div key={new Date().getTime() + index} className="p-2 col-4">
              <span className="bg-success p-2 mx-5">{current_lobby}</span>
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
