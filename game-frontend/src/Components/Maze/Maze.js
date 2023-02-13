import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


function Maze({}) {
  const [gamertag_created, setGamertagCreated] = useState(false);
  const [msg_counter, setMsgCounter] = useState(0);
  const [recieved_messages, setRecievedMsg] = useState("");
  const name = useSelector((state) => state.name);
  const lobby = useSelector((state) => state.lobby);
  const names = useSelector((state) => state.names);


  const [chatSocket, setChatSocket] = useState(null);
  // when a message is recieved from backend
  const onMessageSendEvent = (e) => {
    e.preventDefault();
    let message = "sent from the frontend" + msg_counter;
    setMsgCounter(msg_counter + 1);
    if (chatSocket) {
      chatSocket.send(
        JSON.stringify({
          message: message,
          sender: 0,
        })
      );
    }
  };

  useEffect(() => {
    // connect to the webSocket using the lobby and name
    const ws_url = `ws://${
      window.location.toString().split(":")[1]
    }:8000/ws/lobby/${lobby}/${name}`;

    let new_cs = new WebSocket(ws_url);
    setChatSocket(new_cs);

    new_cs.onmessage = function (e) {
      console.log("2", recieved_messages, "------", JSON.parse(e.data).message);
      setRecievedMsg(recieved_messages.concat(JSON.parse(e.data).message));
    };

    return () => {
      new_cs.send(
        JSON.stringify({
          message: `disconnect`,
          sender: name,
          disconnect:true,
        })
      );
      new_cs.close();
      setChatSocket(null);
    };
  }, []);

  return (
    <div>
      This is the maze !<Link to="/">Exit Lobby</Link>
      <h3>
        You joined as
        {gamertag_created ? (
          <span className="badge badge-success bg-success p-2"> new </span>
        ) : (
          <></>
        )}
        {name} in lobby {lobby}
      </h3>
      {names.map((name, index) => {
        return <h5 key={index}>{name}</h5>;
      })}
      <button onClick={onMessageSendEvent} className="btn btn-primary">
        Send message
      </button>
      <br></br>
      <p className="flex p-5 m-5"> {recieved_messages}</p>
    </div>
  );
}

export default React.memo(Maze);
