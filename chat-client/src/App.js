import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./App.css"; // Import your CSS file for styling

const socket = io("http://localhost:3001"); // Replace with your server URL

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState(""); // New state for sender's name

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = () => {
    if (message && senderName) {
      const messageData = {
        senderName,
        message,
      };
      socket.emit("message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="app-container">
      <h1>Chat App</h1>
      <div className="message-container">
        {messages.map((data, index) => (
          <div
            key={index}
            className={`message ${
              data.senderName === senderName ? "right" : "left"
            }`}
          >
            <strong>{data.senderName}: </strong>
            {data.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="Your Name"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
