// src/pages/ProfilePage.js
import React, { useState } from 'react';
import '../styles/main.css';

function ProfilePage() {
  const [profile, setProfile] = useState({
    location: '',
    pace: '',
    bio: ''
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data:', profile);
    // Send to backend
  };

  return (
    <div className="form-container">
      <h2>Fill Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="location" placeholder="Location" onChange={handleChange} />
        <select name="pace" onChange={handleChange}>
          <option value="">Select Pace</option>
          <option value="7:00 min/mile">7:00 min/mile</option>
          <option value="8:30 min/mile">8:30 min/mile</option>
          <option value="10:00 min/mile">10:00 min/mile</option>
        </select>
        <textarea name="bio" placeholder="Self Introduction" onChange={handleChange} />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfilePage;
