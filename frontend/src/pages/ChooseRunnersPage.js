
import React, { createElement, useState } from 'react';
// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/FriendList.css';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { useFriendList } from '../FriendContext';


  
function FriendCard({ user, isSelected, onToggle }) {
    const navigate = useNavigate();
  
    const handleChatClick = (e) => {
      e.stopPropagation(); 
      navigate('chat', { state: { user } });
    };
  
    return (
      <div className="friend-card">
        <div className="checkbox">
            <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(user.name)}
            />
        </div>
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

  
function ChooseRunnersPage() {

    const location = useLocation();
    const { eventName, location: runLocation, time } = location.state || {};

    const navigate = useNavigate();
    const [selectedFriends, setSelectedFriends] = useState([]);

    const dummyFriendList = useFriendList();

    const toggleFriend = (name) => {
        setSelectedFriends(prev =>
            prev.includes(name)
            ? prev.filter(n => n !== name)
            : [...prev, name]
        );
    };

    const handleClick = () => {
        navigate('/landing/sent-invite', {
            state: {
              eventName,
              runLocation,
              time,
            },
        });
    }

    return (
        <div>
            <div className="friend-list-container">
                {dummyFriendList.map((friend, index) => (
                    <FriendCard key={index} user={friend} 
                    isSelected={selectedFriends.includes(friend.name)}
                    onToggle={toggleFriend}/>
                ))}
            </div>

            <button onClick={handleClick}>Send Invite</button>
        </div>
        

        
      );
}

export default ChooseRunnersPage;


