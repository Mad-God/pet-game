import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import io from 'socket.io-client';


// const url = `ws://127.0.0.1:8000/ws/lobby/lobby1`;
// const socket = io(url);


function Maze({ name, names }) {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [gamertag_created, setGamertagCreated] = useState(false);
  const [msg_counter, setMsgCounter] = useState(0);
//   const url = `ws://127.0.0.1:8000/ws/lobby/lobby1`;
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [lastPong, setLastPong] = useState(null);
    
//   socket.on('connect', (e) => {
//     setIsConnected(true);
//     console.log(e)
//   });
    const [socket, setSocket] = useState(null);

    useEffect(() => {
    const url = `ws://${window.location.hostname}:8000/ws/lobby/lobby1`
    console.log(url)
    const newSocket = io(url);
    setSocket(newSocket);
    return () => newSocket.close();
    }, [setSocket]);

  useEffect(() => {
    (async () => {
      const url = "http://localhost:8000/api/join-lobby/";
      const formData = new FormData();
      formData.append("name", name);
      const response = await axios.post(url, formData);
      console.log(response);
      setGamertagCreated(response.data.created);
    })();
  }, []);

  return (
    <div>
      This is the maze !<Link to="/">Exit Lobby</Link>
      <h3>
        {" "}
        You joined as{" "}
        {gamertag_created ? (
          <span className="badge badge-success bg-success p-2"> new </span>
        ) : (
          <></>
        )}
        {name}
      </h3>
      {names.map((name, index) => {
        return <h5 key={index}>{name}</h5>;
      })}
      <button className="btn btn-primary">
        Send message
      </button>
    </div>
  );
}

export default Maze;
