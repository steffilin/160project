// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MatchingFriends from './pages/matchingFriends';
import ViewProfile from './pages/ViewProfile';

import FriendsPage, { FriendsLayout } from './pages/FriendsPage';

import LandingLayout from './pages/LandingLayout';
import LandingHome from './pages/LandingHome';
import FindRunnersPage from './pages/FindRunnersPage';

import CreateRunPage from './pages/CreateRunPage';
import ChooseRunnersPage from './pages/ChooseRunnersPage';
import Chat from './pages/Chat';

const dummyUserInfo = {
  Personality: 'social',
  runningspeed: '8:30 min/mile',
  avaiable_time_shot: 'Tuesday 7–9am',
  Location: 'UC Berkeley campus',
};

function App() {
  const dummyProfile = {
    displayName: 'Jane Smith',
    gender: 'Female',
    age: 29,
    location: 'Berkeley, CA',
    paceMinutes: 8,
    paceSeconds: 30,
    goal: 'Half Marathon',
    bio: 'Love early morning trail runs!',
    availability: {
      Monday: ['Morning', 'Evening'],
      Tuesday: ['Afternoon'],
      Wednesday: [],
      Thursday: ['Morning'],
      Friday: ['Evening'],
      Saturday: ['Morning', 'Afternoon'],
      Sunday: [],
    },
    paceTolerance: '±30 sec',
    preferredRunType: 'Medium (3 – 6 miles)',
    preferredGender: 'No preference',
    preferredMinAge: 25,
    preferredMaxAge: 40,
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/view-profile" element={<ViewProfile profile={dummyProfile} />} />

        <Route path="/match" element={<MatchingFriends currentUserInfo={dummyUserInfo} />} />

        <Route path="/landing" element={<LandingLayout />}>
          <Route index element={<LandingHome />} />
          <Route path="find-runners" element={<FindRunnersPage />} />
          <Route path="create-run" element={<CreateRunPage />} />
          <Route path="chooserunners" element={<ChooseRunnersPage />} />
          <Route path="friends" element={<FriendsLayout />} >
            <Route path="" element={<FriendsPage />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
