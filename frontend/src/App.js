// src/App.js
import React from 'react';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MatchingFriends from './pages/matchingFriends';


import FriendsPage, { FriendsLayout } from './pages/FriendsPage';

import LandingLayout from './pages/LandingLayout';
import LandingHome from './pages/LandingHome';
import FindRunnersPage from './pages/FindRunnersPage';

import CreateRunPage from './pages/CreateRunPage';
import Chat from './pages/Chat';
import SetFilterPage from './pages/SetFilterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        

        <Route path="/landing" element={<LandingLayout />}>
          <Route index element={<LandingHome />} />
          <Route path="find-runners" element={<FindRunnersPage />} />
          <Route path="create-run" element={<CreateRunPage />} />
          <Route path="friends" element={<FriendsLayout />} >
            <Route path="" element={<FriendsPage />} />
          <Route path="set-filter" element={<SetFilterPage />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
