// src/components/ChatAssistant.jsx
import React, { useState, useRef, useEffect } from "react";
import "./ChatAssistant.css";
import {
  FaRobot,
  FaTimes,
  FaCaretDown,
  FaCaretUp,
  FaTrash,
} from "react-icons/fa";

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(350); // default width in px
  const [dragging, setDragging] = useState(false);
  const panelRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [aiEndpoint, setAiEndpoint] = useState(
    "http://localhost:5001/v1/chat/completions"
  );

  // Toggle the panel open/close
  const togglePanel = () => setOpen((prev) => !prev);
  const toggleSettings = () => setShowSettings((prev) => !prev);

  // Handle sending a message (using POST)
  const handleSend = async () => {
    if (message.trim() === "") return;
    const userMsg = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const payload = {
        model: "llama-3.2-3b-instruct",
        messages: [
          {
            role: "assistant",
            content:
              //  "You are an AI assistant helping me configure a smart drip irrigation system for a specific plant. The user will tell you the plant’s name, and you will provide temperature range, humidity range, soil moisture level, and irrigation (flow rate, frequency, or triggers) that best suit that plant. Include any special warnings or notes. Return your answer in the Return Format outlined above. use the metric system and celisus. Keep your answers concise, friendly, and practical. style the answer into four sections (Goal, Return Format, Warnings, Context dump)",
              `Goal
              When the user provides the plant’s name, generate a complete set of recommended conditions for that plant, focusing on temperature range, humidity range, soil moisture level, and drip irrigation schedule. The smart automatic irrigation system can use these guidelines to optimize watering times and intervals.
Return Format
When responding, please use the following structure:

Plant Name
Echo back the name of the plant the user provided.
Recommended Conditions
Temperature Range (°C): Provide min–max temperature.
Humidity Range (%): Provide min–max humidity.
Soil Moisture (%): Ideal soil moisture range.
Irrigation Setup:Drip Frequency (e.g., once per day, or only when moisture < X%).
Flow Rate (seconds or ml if known).
Any Seasonal Adjustments (e.g., reduce water in cooler months).
Warnings / Special Instructions
Potential risks if conditions are outside recommended ranges.
Pests or diseases commonly associated with the plant.
Any extra notes on fertilizer, pruning, or sunlight.
Short Rationale
Why these conditions matter for this specific plant.
How the user can monitor or adjust conditions if the environment changes.
Warnings
The user’s local environment (indoor vs. outdoor, climate zone, sunlight, etc.) may differ from standard conditions.
Overly rigid settings can harm the plant if real-world conditions deviate significantly. Encourage occasional manual checks.
Context Dump
System: A smart drip irrigation setup that can measure temperature, humidity, and soil moisture, and adjust irrigation intervals accordingly.
User: Provides a plant name.
Desire: The user wants a clear, step-by-step guide on how to set the environment so their chosen plant thrives under the automated system.
take this as a template:

🌱  [PLANT NAME]


RECOMMENDED CONDITIONS:
  • Temperature: 18–25 °C
  • Humidity: 40–60 %
  • Soil Moisture: 50–65 %
  • Irrigation: ~750 ml/day (drip)

WARNINGS:
  • Avoid overwatering; ensure proper drainage.

WHY:
  • These settings optimize growth for [PLANT NAME] under your smart drip system.

How to Use This Template:
Replace [PLANT NAME] with the user’s chosen plant.
Adjust the numeric ranges as recommended by your AI assistant for each plant.
Keep the sections clear and spaced for a cool, modern look.
`,
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false,
      };

      const response = await fetch(aiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`AI request failed with status ${response.status}`);
      }

      const data = await response.json();
      let aiReply = "No reply from AI.";
      if (data.choices && data.choices[0] && data.choices[0].message) {
        aiReply = data.choices[0].message.content || aiReply;
      } else {
        aiReply = data.reply || aiReply;
      }
      const aiMsg = { text: aiReply, sender: "ai" };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error calling AI:", error);
      const errorMsg = { text: "Error connecting to AI.", sender: "ai" };
      setMessages((prev) => [...prev, errorMsg]);
    }
    setMessage("");
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  // Resizer handlers
  const handleMouseDown = (e) => {
    setDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      // Calculate new width from the right edge of the window
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 200 && newWidth < 600) {
        // set min and max width
        setPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      {/* Floating AI Button (hidden when panel is open) */}
      {!open && (
        <div
          className="chat-assistant-button animate-rise"
          onClick={togglePanel}
        >
          <FaRobot size={24} color="#fff" />
        </div>
      )}

      {/* Chat Side Panel */}
      <div
        ref={panelRef}
        className={`chat-panel ${open ? "open" : ""}`}
        style={{ width: panelWidth, right: open ? 0 : `-${panelWidth}px` }}
      >
        {/* Resizer Handle */}
        <div className="resizer" onMouseDown={handleMouseDown} />

        <div className="chat-panel-header">
          <div className="header-left">
            <h3>AI Assistant</h3>
            <button className="settings-btn" onClick={toggleSettings}>
              {showSettings ? (
                <FaCaretUp size={16} />
              ) : (
                <FaCaretDown size={16} />
              )}
            </button>
          </div>
          <button className="close-btn" onClick={togglePanel}>
            <FaTimes size={20} />
          </button>
        </div>

        {showSettings && (
          <div className="chat-settings">
            <label>Local AI Endpoint:</label>
            <input
              type="text"
              value={aiEndpoint}
              onChange={(e) => setAiEndpoint(e.target.value)}
            />
            <p className="settings-hint">
              E.g. http://localhost:5001/v1/chat/completions
            </p>
          </div>
        )}

        <div className="chat-messages">
          {messages.length === 0 ? (
            <p className="chat-placeholder">No messages yet...</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
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
          <button
            onClick={handleClearChat}
            className="clear-btn"
            title="Clear Chat"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;
