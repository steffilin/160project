// src/App.js
import React from 'react';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { FriendProvider } from './FriendContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MatchingFriends from './pages/matchingFriends';
import ViewProfile from './pages/ViewProfile';

import FriendsPage, { FriendsLayout } from './pages/FriendsPage';

import LandingLayout from './pages/LandingLayout';
import LandingHome from './pages/LandingHome';
import FindRunnersPage from './pages/FindRunnersPage';
import ScheduleRunPage from './pages/ScheduleRunPage';

import CreateRunPage from './pages/CreateRunPage';
import ChooseRunnersPage from './pages/ChooseRunnersPage';
import SentInvitePage from './pages/SentInvitePage';
import Chat from './pages/Chat';
import SetFilterPage from './pages/SetFilterPage';

// Import the new pages
import ScheduledRunsPage from './pages/ScheduledRunsPage';
import TrackRunPage from './pages/TrackRunPage';
import RunHistoryPage from './pages/RunHistoryPage';

const dummyUserInfo = {
  Personality: 'social',
  runningspeed: '8:30 min/mile',
  avaiable_time_shot: 'Tuesday 7--9am',
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
    preferredRunType: 'Medium (3 -- 6 miles)',
    preferredGender: 'No preference',
    preferredMinAge: 25,
    preferredMaxAge: 40,
  };

  return (
    <FriendProvider>
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/match" element={<MatchingFriends currentUserInfo={dummyUserInfo} />} />

        <Route path="/landing" element={<LandingLayout />}>
          <Route index element={<LandingHome />} />
          <Route path="find-runners" element={<FindRunnersPage />} />
          <Route path="create-run" element={<CreateRunPage />} />
          <Route path="chooserunners" element={<ChooseRunnersPage />} />
          <Route path="schedule-run" element={<ScheduleRunPage />} />
          <Route path="sent-invite" element={<SentInvitePage />} />
          <Route path="set-filter" element={<SetFilterPage />} />
          <Route path="profile" element={<ViewProfile profile={dummyProfile} />} />
          
          {/* --- New Routes --- */}
          <Route path="scheduled-runs" element={<ScheduledRunsPage />} /> {/* View scheduled runs */}
          <Route path="track-run" element={<TrackRunPage />} />        {/* Live run tracking page */}
          <Route path="history" element={<RunHistoryPage />} />        {/* Completed run history */}

          <Route path="friends" element={<FriendsLayout />} >
            <Route path="" element={<FriendsPage />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </FriendProvider>
  );
}

export default App;