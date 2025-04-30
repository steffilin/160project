
import React from 'react';
import FriendList from './FriendList';

const dummyFriendList = [
  {
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
  },
  {
    name: "Jane Doe",
    gender: 'female',
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
  },
  {
    name: "Joe Schmoe",
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

export default FriendsPage;
