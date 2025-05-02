import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '../styles/main.css';
import '../styles/LandingLayout.css';

function LandingLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const user = {
    name: 'Tong',
    avatar: '/user.png',
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
    if (tab === 'home') {
      navigate('/landing');
    } else {
      navigate(`/landing/${tab}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/');
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="profile-group" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={user.avatar} alt="User" />
          <span className="username">{user.name}</span>
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <div onClick={() => navigate('/profile')}>View Profile</div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        )}
        <h2>RunLink</h2>
      </div>

      {/* Tabs */}
      <div className="landing-container">
        <div className="tabs">
          <div className={`tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>
            Home
          </div>
          <div className={`tab ${activeTab === 'find-runners' ? 'active' : ''}`} onClick={() => handleTabClick('find-runners')}>
            Find Runners
          </div>
          <div className={`tab ${activeTab === 'create-run' ? 'active' : ''}`} onClick={() => handleTabClick('create-run')}>
            Create Run
          </div>
          <div className={`tab ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => handleTabClick('friends')}>
            Friends
          </div>
        </div>

        {/* Content */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LandingLayout;
