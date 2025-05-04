import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '../styles/main.css';
import '../styles/LandingLayout.css';

function LandingLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const user = {
    name: 'Jane',
    avatar: '/user.png',
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/landing');
    } else if (tab === 'profile') {
      navigate('/landing/profile');
    } else {
      navigate(`/landing/${tab}`);
    }
  };

  useEffect(() => {
    // Listen for tab change events from child components
    const handleTabChange = (event) => {
      if (event.detail) {
        setActiveTab(event.detail);
      }
    };
    
    window.addEventListener('tabChange', handleTabChange);
    
    // Set initial active tab based on current route
    const path = window.location.pathname;
    if (path.includes('/landing/profile')) {
      setActiveTab('profile');
    } else if (path.includes('/landing/find-runners')) {
      setActiveTab('find-runners');
    } else if (path.includes('/landing/create-run')) {
      setActiveTab('create-run');
    } else if (path.includes('/landing/friends')) {
      setActiveTab('friends');
    } else if (path === '/landing') {
      setActiveTab('home');
    }
    
    return () => {
      window.removeEventListener('tabChange', handleTabChange);
    };
  }, []);
  
  return (
    <div className="app-container">
      {/* Top Bar - Just the logo now */}
      <div className="top-bar">
        <h2>RunLink</h2>
      </div>

      {/* Scrollable Content Container */}
      <div className="scrollable-content">
        <div className="landing-container">
          <div className="content-area">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav">
        <div 
          className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`} 
          onClick={() => handleTabClick('home')}
        >
          <div className="nav-icon home-icon"></div>
          <span>Home</span>
        </div>
        <div 
          className={`bottom-nav-item ${activeTab === 'find-runners' ? 'active' : ''}`} 
          onClick={() => handleTabClick('find-runners')}
        >
          <div className="nav-icon find-runners-icon"></div>
          <span>Find Runners</span>
        </div>
        <div 
          className={`bottom-nav-item ${activeTab === 'create-run' ? 'active' : ''}`} 
          onClick={() => handleTabClick('create-run')}
        >
          <div className="nav-icon create-run-icon"></div>
          <span>Create Run</span>
        </div>
        <div 
          className={`bottom-nav-item ${activeTab === 'friends' ? 'active' : ''}`} 
          onClick={() => handleTabClick('friends')}
        >
          <div className="nav-icon friends-icon"></div>
          <span>Friends</span>
        </div>
        <div 
          className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`} 
          onClick={() => handleTabClick('profile')}
        >
          <img src={user.avatar} alt="User" className="profile-icon" />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

export default LandingLayout;