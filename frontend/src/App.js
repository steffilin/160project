import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import FindRunnerPage from './pages/FindRunnerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/find-runner" element={<FindRunnerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
