import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css"; // Styling for chatbot

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5005/chat", {
        message: input,
      });
      setMessages([...newMessages, { from: "bot", text: res.data.response }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbox">
          <div className="chat-header">
            AI Chatbot
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
