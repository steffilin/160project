// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

import LandingLayout from './pages/LandingLayout';
import LandingHome from './pages/LandingHome';
import FindRunnersPage from './pages/FindRunnersPage';
import FriendsPage from './pages/FriendsPage';
import CreateRunPage from './pages/CreateRunPage';


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
          <Route path="friends" element={<FriendsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
