// src/components/ChatAssistant.jsx
import React, { useState } from "react";
import "./ChatAssistant.css";
import { FaRobot, FaTimes } from "react-icons/fa";

// Example local endpoint for LM Studio. Adjust as needed.
const LOCAL_AI_ENDPOINT = "http://192.168.1.2:5001";

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Toggle the side panel
  const togglePanel = () => {
    setOpen((prev) => !prev);
  };

  // Handle sending a user message
  const handleSend = async () => {
    if (message.trim() === "") return;

    // 1) Add user message to chat
    const userMsg = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    // 2) Optionally call local AI endpoint to get response
    try {
      const response = await fetch(LOCAL_AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });
      if (!response.ok) {
        throw new Error(`AI request failed with status ${response.status}`);
      }
      const data = await response.json();
      // Suppose the AI text is in data.reply
      const aiReply = data.reply || "No reply from AI.";
      const aiMsg = { text: aiReply, sender: "ai" };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error calling local AI:", error);
      // You could show an error message in the chat
      const errorMsg = { text: "Error connecting to AI.", sender: "ai" };
      setMessages((prev) => [...prev, errorMsg]);
    }

    // Clear user input
    setMessage("");
  };

  return (
    <>
      {/* Floating AI Button (hidden if the panel is open) */}
      {!open && (
        <div className="chat-assistant-button" onClick={togglePanel}>
          <FaRobot size={24} color="#fff" />
        </div>
      )}

      {/* Chat Side Panel */}
      <div className={`chat-panel ${open ? "open" : ""}`}>
        <div className="chat-panel-header">
          <h3>AI Assistant</h3>
          <button className="close-btn" onClick={togglePanel}>
            <FaTimes size={20} />
          </button>
        </div>
        <div className="chat-messages">
          {messages.length === 0 ? (
            <p className="chat-placeholder">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))
          )}
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;
