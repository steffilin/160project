import React, { createContext, useContext } from 'react';

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
const FriendContext = createContext();

export const FriendProvider = ({ children }) => (
  <FriendContext.Provider value={dummyFriendList}>
    {children}
  </FriendContext.Provider>
);

export const useFriendList = () => useContext(FriendContext);
