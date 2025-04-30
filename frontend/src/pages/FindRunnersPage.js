import React from 'react';
import MatchingFriends from './matchingFriends';

const dummyUserInfo = {
  Personality: 'social',
  runningspeed: '8:30',
  avaiable_time_shot: 'Tuesday 7–9am',
  Location: 'UC Berkeley',
};

function FindRunnersPage() {
  return (
    <div className="find-runners-container">
      
      <MatchingFriends currentUserInfo={dummyUserInfo} />
    </div>
  );
}

export default FindRunnersPage;
