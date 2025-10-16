import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [name] = useState("Priyal Sabharwal"); // Default user name
  const [isNameSet, setIsNameSet] = useState(false); // Has chat started
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver] = useState("Rajat Malik");

  // Listen for messages from backend
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  const handleStartChat = () => {
    setIsNameSet(true); // Start chat immediately with default name
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const myMessage = { user: name, message };
    socket.emit("sendMessage", myMessage); // emit only
    setMessage("");

    // Simulated reply from Rajat Malik
    setTimeout(() => {
      const replies = [
        "hnji",
        "Sure!",
        "Okay, Priyal!",
        "mottu",
        "chal bye ab!",
      ];
      const reply = {
        user: receiver,
        message: replies[Math.floor(Math.random() * replies.length)],
      };
      socket.emit("sendMessage", reply);
    }, 800);
  };

  // If chat not started, show start screen
  if (!isNameSet) {
    return (
      <div className="chat-container">
        <h1>💬 Welcome {name}</h1>
        <button onClick={handleStartChat}>Start Chat</button>
      </div>
    );
  }

  // Chat UI after starting
  return (
    <div className="chat-container">
      <h1>💬 Real-Time Chat</h1>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.user === name ? "sent" : "received"}`}
          >
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}