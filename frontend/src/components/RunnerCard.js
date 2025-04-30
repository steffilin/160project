import React from 'react';

export default function RunnerCard({ user, onSelect }) {
  return (
    <div onClick={() => onSelect(user)} className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-sm text-gray-600">Distance: {user.distance} km</p>
      <p className="text-sm text-gray-600">Gender: {user.gender}</p>
      <p className="text-sm text-gray-600">Preference: {user.preference}</p>
    </div>
  );
}
