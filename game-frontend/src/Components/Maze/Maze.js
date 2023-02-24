import React, { useEffect, useState } from "react";
import { Link, resolvePath, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


function Maze({}) {
  const [msg_counter, setMsgCounter] = useState(0);
  const [recieved_messages, setRecievedMsg] = useState("");
  const name = useSelector((state) => state.name);
  const lobby = useSelector((state) => state.lobby);
  const names = useSelector((state) => state.names);


  const [chatSocket, setChatSocket] = useState(null);


  /*
  MESSAGE TYPES:
    on client connect:
      client recieve "connected" and maze status
      peers recieve "xyz" joined and their position
      update the maze
    
    on message recieve from peer:
      get the position, sender peer, plant type
      update the maze

    on message send from client:
      update the maze
      send position, client name, plant type
    on client disconnect:
      remove all plants
      client recieve "disconnected"
      peers recieve "xyz left"
      update maze
  */


  // when a message is recieved from backend
  const messageRecivedFunction = function (e) {
    console.log("2", recieved_messages, "------", JSON.parse(e.data).message);
    setRecievedMsg(recieved_messages.concat(JSON.parse(e.data).message));
  };

  
  
  useEffect(() => {
    const ws_url = `ws://${
      window.location.toString().split(":")[1]
    }:8000/ws/lobby/${lobby}/${name}`;
    const socket = new WebSocket(ws_url);

    socket.addEventListener('open', () => {
      setChatSocket(socket);
      console.log("chat socket set: ", chatSocket)

    });

    socket.addEventListener('close', () => {
      socket.onmessage = messageRecivedFunction;
      setChatSocket(null);
    });

    return () => {
      socket.close();
    };
  }, []);




  // send a message to backend
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

  return (
    <div>
      This is the maze !<Link to="/">Exit Lobby</Link>
      <h3>
        You joined as {name} in lobby {lobby}
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
