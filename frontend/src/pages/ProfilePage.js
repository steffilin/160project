import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profilePage.css';

function ProfilePage() {
  const [profile, setProfile] = useState({
    displayName: '',
    gender: '',
    age: '',
    location: '',
    paceMinutes: '',
    paceSeconds: '',
    goal: '',
    bio: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Saved:', { ...profile, avatar });
    navigate('/match');
  };

  return (
    <div className="profile-container">
      <h1>🎽 Let’s Set Up Your RunLink Profile!</h1>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="card">
            <h2>🧍 Basic Info</h2>
            <p className="helper-text">Hey! Let’s start with your name and some basic info.</p>

            <label>Upload Your Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setAvatar(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            {avatar && <img src={avatar} alt="Avatar Preview" className="avatar-preview" />}

            <input name="displayName" placeholder="Your Name" value={profile.displayName} onChange={handleChange} />
            <select name="gender" value={profile.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
            <input name="age" type="number" placeholder="Age" value={profile.age} onChange={handleChange} />
            <div className="nav-buttons">
              <button type="button" onClick={() => setStep(2)}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h2>🏃‍♀️ Running Habits</h2>
            <p className="helper-text">Cool! Now let’s talk about your running pace and goals.</p>

            <input name="location" placeholder="Where do you usually run?" value={profile.location} onChange={handleChange} />
            <div className="inline-inputs">
              <input name="paceMinutes" type="number" placeholder="Pace (min)" value={profile.paceMinutes} onChange={handleChange} />
              <input name="paceSeconds" type="number" placeholder="sec" value={profile.paceSeconds} onChange={handleChange} />
            </div>
            <select name="goal" value={profile.goal} onChange={handleChange}>
              <option value="">Your training goal</option>
              <option value="5K">5K</option>
              <option value="10K">10K</option>
              <option value="Half">Half Marathon</option>
              <option value="Full">Full Marathon</option>
            </select>
            <div className="nav-buttons">
              <button type="button" onClick={() => setStep(1)}>Back</button>
              <button type="button" onClick={() => setStep(3)}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h2>🗣️ About You</h2>
            <p className="helper-text">Almost done! A few words about yourself would help others know you better.</p>

            <textarea
              name="bio"
              placeholder="E.g. I love trail running, usually run evenings, training for 10K."
              value={profile.bio}
              onChange={handleChange}
              rows={4}
            />

            <div className="nav-buttons">
              <button type="button" onClick={() => setStep(2)}>Back</button>
              <button type="submit">Finish & Match</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
