import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import './Agent.css';
import tb from '../../public/images/travbud.png';
import user from '../../public/images/user.jpg';

const Agent = ({ apiKey, assistantId, config = {} }) => {
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);

  // Ref for the transcript container to enable auto-scroll
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => setIsConnected(true));
    vapiInstance.on('call-end', () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });
    vapiInstance.on('speech-start', () => setIsSpeaking(true));
    vapiInstance.on('speech-end', () => setIsSpeaking(false));

    vapiInstance.on('message', (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript((prev) => [...prev, { role: message.role, text: message.transcript }]);
      }
    });

    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error);
      console.error('Vapi error details:', error.details);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  // Auto-scroll to bottom on transcript update
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollTop = transcriptEndRef.current.scrollHeight;
    }
  }, [transcript]);

  const startCall = () => {
    if (vapi) vapi.start(assistantId);
  };

  const endCall = () => {
    if (vapi) vapi.stop();
  };

  return (
    <div className="agent-container">
      <div className="agent-panel">
        <div className="container">
          <div className={`card ${isConnected && isSpeaking ? 'active-border' : ''}`}>
            <img src={tb} className="cardimg" alt="Assistant" />
          </div>
          <div className={`card ${isConnected && !isSpeaking ? 'active-border' : ''}`}>
            <img src={user} className="cardimg" alt="User" />
          </div>
        
        </div>

        <div className="rightside">
          <div
            className="agent-transcript"
            ref={transcriptEndRef}
           
          >
            {transcript.length === 0 ? (
              <p className="agent-empty-msg">Conversation will appear here...</p>
            ) : (
              transcript.map((msg, i) => (
                <div
                  key={i}
                  className={`agent-msg-row ${msg.role === 'user' ? 'user-msg' : 'assistant-msg'}`}
                >
                  <span
                    className={`agent-msg-bubble ${
                      msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="buttons">
            {!isConnected ? (
              <button className="agent-start-btn" onClick={startCall}>
                Talk to Assistant
              </button>
            ) : (
              <button className="agent-start-btn" onClick={startCall}>
                ....
              </button>
            )}
            {isConnected && (
               <div className="agent-header">
            <div className="agent-status">
              <div className={`agent-indicator ${ isSpeaking ? 'speaking' : 'listening'}`}></div>
              <span className="agent-status-text">
                { isSpeaking ? 'Assistant Speaking...' : 'Assistant Listening...'}
              </span>
            </div>
          </div>

            )}
             
            <button className="agent-end-btn" onClick={endCall}>End Call</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;
