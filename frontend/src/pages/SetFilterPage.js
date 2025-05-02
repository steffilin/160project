// src/pages/SetFilterPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SetFilterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [preference, setPreference] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');

  useEffect(() => {
    if (location.state) {
      setPreference(location.state.preference || '');
      setGender(location.state.gender || '');
      setDay(location.state.day || 'Monday');
      setStartTime(location.state.startTime || '08:00');
      setEndTime(location.state.endTime || '09:00');
    }
  }, [location.state]);

  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, '0');
    timeOptions.push(`${hour}:00`, `${hour}:30`);
  }

  const handleApply = () => {
    navigate('/landing/find-runners', {
      state: { preference, gender, day, startTime, endTime },
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Set Filters</h2>

      <label className="block mb-2 font-medium">Range Preference:</label>
      <select value={preference} onChange={(e) => setPreference(e.target.value)}>
        <option value="">Any</option>
        <option value="Short-distance">Short-distance</option>
        <option value="Long-distance">Long-distance</option>
        <option value="Training">Training</option>
      </select>

      <label className="block mb-2 font-medium mt-4">Gender Preference:</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Any</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label className="block mb-2 font-medium mt-4">Day:</label>
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium mt-4">Start Time:</label>
      <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <label className="block mb-2 font-medium mt-4">End Time:</label>
      <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <button onClick={handleApply} className="mt-6">Apply Filters</button>
    </div>
  );
}

export default SetFilterPage;