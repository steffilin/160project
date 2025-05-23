import React from 'react';
import '../styles/FriendList.css';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';

function FriendCard({ user }) {
  const navigate = useNavigate();

  const handleChatClick = (e) => {
    e.stopPropagation(); 
    navigate('chat', { state: { user } });
  };

  return (
    <div className="friend-card">
      <div className="friend-left">
        <div className="avatar-container">
          <div className={`status-dot ${user.online ? 'online' : 'offline'}`}></div>
          <img src="/user.png" alt="avatar" className="friend-avatar" />
        </div>
        <div className="friend-card-info">
          <div className="name">{user.name}</div>
          <div className="location">{user.location}</div>
        </div>
      </div>

      <div className="friend-card-info right">
        <div className="pace">Pace: {user.paceMinutes}:{user.paceSeconds}</div>
        <div className="runs"># Runs: {user.runCount}</div>
        <FaCommentDots className="chat-icon" onClick={handleChatClick} />
      </div>
    </div>
  );
}

function FriendList({ friendList }) {
  return (
    <div className="friend-list-container">
      {friendList.map((friend, index) => (
        <FriendCard key={index} user={friend} />
      ))}
    </div>
  );
}

export default FriendList;
