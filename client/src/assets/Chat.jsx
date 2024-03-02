import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";

const ENDPOINT = "http://localhost:4500/";

const Chat = ({ userId }) => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");

  const socket = socketIo(ENDPOINT, { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connection", () => {});

    socket.on("receive message", (message) => {
  
      setMessages((messages) => [...messages, message]);
    });

    socket.on("join requested room", (roomId) => {
      setRoom(roomId);
    });

    return () => {
      socket.off('disconnect');
    };
  }, [socket]);

  const requestChat = (targetUserId) => {
    const action = { type: "request chat", userId, targetUserId };
    socket.emit("request chat", action);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit("send message", { roomId: room, message: input });
      setInput("");
    }
  };

  return (
    <div>
      <div>
        {/* implemet to same id  */}
        <button onClick={() => requestChat("targetUserId")}> 
          Chat with User
        </button>
        <form onSubmit={sendMessage}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit">Send</button>
        </form>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
