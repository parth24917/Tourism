import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import "./Agent.css";

import tb from "../../public/images/travbud.png";
import user from "../../public/images/user.jpg";

import { useNavigate } from "react-router-dom";

const Agent = ({ apiKey, assistantId, config = {} }) => {
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [transcript, setTranscript] = useState([]);

  const transcriptEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);

    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        if (message.transcriptType === "partial") {
          setLiveTranscript(message.transcript);
        }

        if (message.transcriptType === "final") {
          setTranscript((prev) => {
            const last = prev[prev.length - 1];
            // If the last message is from the same role, append to it
            if (last && last.role === message.role) {
              return [
                ...prev.slice(0, -1),
                { role: last.role, text: last.text + " " + message.transcript },
              ];
            }
            // Otherwise create a new bubble
            return [...prev, { role: message.role, text: message.transcript }];
          });

          setLiveTranscript("");
        }
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
      console.error("Vapi error details:", error.details);
    });

    return () => {
      vapiInstance.stop();
    };
  }, [apiKey]);

  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollTop =
        transcriptEndRef.current.scrollHeight;
    }
  }, [transcript]);

  const startCall = () => {
    if (vapi && !isConnected) {
      setTranscript([]);
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi && isConnected) {
      vapi.stop();
    }
  };

  return (
    <div className="agent-panel">
     

        {/* LEFT SIDEBAR */}
        <aside className="agent-sidebar">

          <div className="assistant-profile">
            <div
              className={`assistant-avatar ${
                isConnected ? "assistant-active" : ""
              }`}
            >
              <img src={tb} alt="TravBud AI Assistant" />
            </div>

            <div className="assistant-info">
              <h2>TravBud</h2>
              <p>AI Travel Assistant</p>
            </div>
          </div>

          <div className="assistant-divider"></div>

          <div className="user-profile">
            <img src={user} alt="User" />
            <div>
              <span>You</span>
              <small>Traveler</small>
            </div>
          </div>

          <div className="sidebar-description">
            <span className="sparkle">✦</span>
            <p>
              Plan your perfect trip with TravBud. Tell me where you want to
              go and I'll help you build your itinerary.
            </p>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="agent-main">

          {/* HEADER */}
          <div className="agent-topbar">
            <div>
              <p className="agent-eyebrow">TRVL AI</p>
              <h1>Your Travel Assistant</h1>
            </div>

            <div className="connection-status">
              <span
                className={`status-dot ${
                  isConnected ? "connected" : "offline"
                }`}
              ></span>

              <span>
                {isConnected ? "Connected" : "Ready to talk"}
              </span>
            </div>
          </div>

          {/* CONVERSATION */}
          <div className="conversation-wrapper">

            <div className="conversation-header">
              <div>
                <h3>Conversation</h3>
                <span>
                  {isConnected
                    ? isSpeaking
                      ? "TravBud is speaking"
                      : "TravBud is listening"
                    : "Start a conversation to begin"}
                </span>
              </div>

              {isConnected && (
                <div className="voice-indicator">
                  <span
                    className={`voice-bar ${
                      isSpeaking ? "voice-active" : ""
                    }`}
                  ></span>
                  <span
                    className={`voice-bar ${
                      isSpeaking ? "voice-active" : ""
                    }`}
                  ></span>
                  <span
                    className={`voice-bar ${
                      isSpeaking ? "voice-active" : ""
                    }`}
                  ></span>
                  <span
                    className={`voice-bar ${
                      isSpeaking ? "voice-active" : ""
                    }`}
                  ></span>
                  <span
                    className={`voice-bar ${
                      isSpeaking ? "voice-active" : ""
                    }`}
                  ></span>
                </div>
              )}
            </div>

            <div className="agent-transcript" ref={transcriptEndRef}>

              {transcript.length === 0 ? (
                <div className="empty-conversation">

                  <div className="empty-avatar">
                    <img src={tb} alt="TravBud" />
                  </div>

                  <h3>
                    {isConnected
                      ? "TravBud is ready"
                      : "Start planning your next trip"}
                  </h3>

                  <p>
                    {isConnected
                      ? "Speak naturally and tell TravBud what kind of trip you're looking for."
                      : "Talk to TravBud about destinations, budgets, activities, hotels and itineraries."}
                  </p>

                  {!isConnected && (
                    <div className="suggestion-pills">
                      <span>✈ Find destinations</span>
                      <span>₹ Plan a budget</span>
                      <span>🗺 Build an itinerary</span>
                    </div>
                  )}

                </div>
              ) : (
                transcript.map((msg, i) => (
                  <div
                    key={i}
                    className={`agent-msg-row ${
                      msg.role === "user"
                        ? "user-msg"
                        : "assistant-msg"
                    }`}
                  >
                    <div className="message-avatar">
                      <img
                        src={msg.role === "user" ? user : tb}
                        alt={msg.role === "user" ? "You" : "TravBud"}
                      />
                    </div>

                    <div className="message-content">
                      <span className="message-name">
                        {msg.role === "user" ? "You" : "TravBud"}
                      </span>

                      <div
                        className={`agent-msg-bubble ${
                          msg.role === "user"
                            ? "user-bubble"
                            : "assistant-bubble"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))
              )}
            {liveTranscript && (
              <div className="agent-msg-row assistant-msg">
                <div className="message-avatar">
                  <img src={tb} alt="TravBud" />
                </div>

                <div className="message-content">
                  <span className="message-name">TravBud</span>

                  <div className="agent-msg-bubble assistant-bubble">
                    {liveTranscript}
                  </div>
                </div>
              </div>
            )}

            </div>
          </div>

          {/* CALL STATUS */}
          {isConnected && (
            <div className="live-status">
              <div
                className={`live-orb ${
                  isSpeaking ? "orb-speaking" : "orb-listening"
                }`}
              >
                <img src={tb} alt="TravBud" />
              </div>

              <div className="live-status-text">
                <strong>
                  {isSpeaking
                    ? "TravBud is speaking"
                    : "TravBud is listening"}
                </strong>

                <span>
                  {isSpeaking
                    ? "Please wait while TravBud responds..."
                    : "Go ahead, I'm listening"}
                </span>
              </div>

              <div className="live-waves">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="agent-actions">

            {!isConnected ? (
              <button
                className="start-call-btn"
                onClick={startCall}
              >
                <span className="mic-icon">🎙</span>
                Start conversation
              </button>
            ) : (
              <button
                className="end-call-btn"
                onClick={endCall}
              >
                <span>■</span>
                End conversation
              </button>
            )}

            <button
              className="itinerary-btn"
              onClick={() => navigate("/view-itinerary")}
            >
              <span>View itinerary</span>
              <span className="arrow">→</span>
            </button>

          </div>

        </main>
     
    </div>
  );
};

export default Agent;