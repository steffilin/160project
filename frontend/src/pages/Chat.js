import React, { useState } from 'react';
import '../styles/chat.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([
    { text: 'Hey! Ready to run tomorrow?', sender: 'friend' },
    { text: 'Yes! Let’s meet at 7am?', sender: 'me' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'me' }]);
    setInput('');
  };
  const location = useLocation();
  const navigate = useNavigate();
  const friend = location.state?.user;
  if (!friend) {
    return (
      <p>No friend selected. Please return to your friends list.</p>
    );
  }

  const handleExit = () => {
    navigate("..");
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat with {friend.name}
        <div className="exit-button" onClick={handleExit}>×</div>
      </div>
      <div className="chat-messages">
        {
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === 'me' ? 'message-sent' : 'message-received'}`}
            >
              {msg.text}
            </div>
          ))
        }
      </div>
      <div className="chat-input-container">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
