import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '../styles/main.css';
import '../styles/LandingLayout.css';

function LandingLayout() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'home') {
            navigate('/landing');
        } else {
            navigate(`/landing/${tab}`);
        }
    };

    return (
        <div>
            {/* Top Bar (full width) */}
            <div className="top-bar">
                <img
                    src="/user.png"
                    alt="Profile"
                    onClick={() => navigate('/profile')}
                />
                <h2>My RunLink</h2>
            </div>

            {/* Landing Container (only for tabs and content) */}
            <div className="landing-container">
                {/* Tabs */}
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
