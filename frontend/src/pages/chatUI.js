import React, { useState } from 'react';
import '../styles/chatUI.css'; 

function ChatUI() {
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

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with Friend</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'me' ? 'message-sent' : 'message-received'}`}
          >
            {msg.text}
          </div>
        ))}
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

export default ChatUI;
