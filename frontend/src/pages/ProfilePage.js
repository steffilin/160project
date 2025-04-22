// src/pages/ProfilePage.js
import React, { useState } from 'react';
import '../styles/main.css';

function ProfilePage() {
  const [profile, setProfile] = useState({
    displayName: '',
    gender: '',
    age: '',
    location: '',
    paceMinutes: '',
    paceSeconds: '',
    goal: '',
    bio: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data:', profile);
    // TODO: Send to backend later
  };

  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center" }}>Complete Your Profile</h1>

      {/* Step-specific description */}
      {currentStep === 1 && (
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          This helps personalize your profile and find similar runners!
        </p>
      )}
      {currentStep === 2 && (
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          This helps match you based on location and pace.
        </p>
      )}
      {currentStep === 3 && (
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          This helps others get to know you better!
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <>
            <input
              name="displayName"
              placeholder="Displayed Name"
              value={profile.displayName}
              onChange={handleChange}
            />
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              style={{ width: "93%" }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={profile.age}
              onChange={handleChange}
            />

            <button type="button" onClick={() => setCurrentStep(2)} style={{ marginTop: "20px" }}>
              Next
            </button>
          </>
        )}

        {/* Step 2: Running Details */}
        {currentStep === 2 && (
          <>
            <label style={{ fontSize: "14px", color: "#555" }}>
              Where do you live?
            </label>
            <input
              name="location"
              placeholder="Location (City, State)"
              value={profile.location}
              onChange={handleChange}
            />
            <label style={{ fontSize: "14px", color: "#555" }}>
              Typical running pace (minutes per mile or km)
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                name="paceMinutes"
                type="number"
                placeholder="Minutes"
                value={profile.paceMinutes}
                onChange={handleChange}
                style={{ width: "45%" }}
              />
              <span>min</span>
              <input
                name="paceSeconds"
                type="number"
                placeholder="Seconds"
                value={profile.paceSeconds}
                onChange={handleChange}
                style={{ width: "45%" }}
              />
              <span>sec</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "14px", color: "#555" }}>
                Training Goal (Optional)
              </label>
              <select
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                style={{ width: "93%" }}
              >
                <option value="">No specific goal</option>
                <option value="5K">5K</option>
                <option value="10K">10K</option>
                <option value="Half Marathon">Half Marathon</option>
                <option value="Full Marathon">Full Marathon</option>
                <option value="Other">Other</option>
              </select>
            </div>



            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="button" onClick={() => setCurrentStep(1)} style={{ flex: 1 }}>
                Back
              </button>
              <button type="button" onClick={() => setCurrentStep(3)} style={{ flex: 1 }}>
                Next
              </button>
            </div>

          </>
        )}

        {/* Step 3: Bio */}
        {currentStep === 3 && (
          <>
            <textarea
              name="bio"
              placeholder="Write a short introduction (e.g., favorite runs, goals, fun facts)"
              value={profile.bio}
              onChange={handleChange}
              style={{ height: "100px" }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="button" onClick={() => setCurrentStep(2)} style={{ flex: 1 }}>
                Back
              </button>
              <button type="submit" style={{ flex: 1 }}>
                Save Profile
              </button>
            </div>

          </>
        )}

      </form>
    </div>
  );
}

export default ProfilePage;
