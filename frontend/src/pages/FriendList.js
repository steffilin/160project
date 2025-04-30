import React, { useState } from 'react';
import '../styles/FriendList.css';

const exampleFriend = {
  name: "John Doe",
  gender: 'male',
  age: 22,
  location: 'Berkeley',
  paceMinutes: 8,
  paceSeconds: 30,
  runCount: 2,
  availability: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  }
}

function FriendCard({ user }) {
  const handleClick = (event) => {
    console.log(user.name, "clicked");
    // TODO: redirect to chat with "user"
  }

  const card = (
    <div className="friend-card" onClick={handleClick}>
      <div className="friend-card-info">
        <div>{user.name}</div>
        <div>{user.location}</div>
      </div>
      <div className="friend-card-info right">
        <div>Pace: {user.paceMinutes}:{user.paceSeconds}</div>
        <div># Runs: {user.runCount}</div>
      </div>
    </div>
  )
  return card;
};

function FriendList({ friendList }) {
  return (
    <div className="friend-list-container">
      {
        friendList.map((friend) => {
          return (
            <FriendCard user={friend} />
          )
        })
      }
    </div>
  );
}

export default FriendList;
