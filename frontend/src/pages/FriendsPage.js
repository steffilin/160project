import React from 'react';
import FriendList from './FriendList';
import { useNavigate, Outlet } from 'react-router-dom';

const dummyFriendList = [
  {
    name: "John Doe",
    gender: 'male',
    age: 22,
    location: 'Berkeley',
    paceMinutes: 8,
    paceSeconds: 30,
    runCount: 1,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: "Jane Doe",
    gender: 'female',
    age: 22,
    location: 'Berkeley',
    paceMinutes: 9,
    paceSeconds: 30,
    runCount: 10,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  },
  {
    name: "Joe Schmoe",
    gender: 'male',
    age: 22,
    location: 'Berkeley',
    paceMinutes: 9,
    paceSeconds: 45,
    runCount: 4,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  },
];

function FriendsPage() {
  return (
    <div>
      <h2>My Friends</h2>
      <FriendList friendList={dummyFriendList} />
    </div>
  );
}

function FriendsLayout() {
  return (
    <Outlet />
  );
}

export { FriendsLayout, FriendsPage };
