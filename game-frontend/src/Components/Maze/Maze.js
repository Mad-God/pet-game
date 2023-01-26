import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Maze({ name, names }) {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  // var gamertag_created = false;
  const [gamertag_created, setGamertagCreated] = useState(false);

  // useEffect(() => {});

  const url = `ws://127.0.0.1:8000/ws/socket-server/`;

  const chatSocket = new WebSocket(url);
  chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    console.log("Data:", data);
  };

  const onMessageSendEvent = (e) => {
    e.preventDefault();
    let message = "sent from the frontend" + new Date().getTime().toString();
    chatSocket.send(
      JSON.stringify({
        message: message,
      })
    );
    console.log(message);
  };

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
      <button onClick={onMessageSendEvent} className="btn btn-primary">
        Send message
      </button>
    </div>
  );
}

export default Maze;
