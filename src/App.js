import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Form from "./Form";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="App">
    { !showChat ? (
    <div className="joinChatContainer">
    <h3>join a chat</h3>
    <input
    type="text"
    placeholder="john..."
    onChange={(event) => {
      setUsername(event.target.value);
    }}
    />
    <input
    type="text"
    placeholder="room Id..."
    onChange={(event) => {
      setRoom(event.target.value);
    }}
    />
    <button onClick={joinroom}>Join Room</button>
    </div>
    
    ):
    <Form socket={socket} username={username} room={room} />
  }
    </div>
  );
}

export default App;
