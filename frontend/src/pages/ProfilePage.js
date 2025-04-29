// src/pages/ProfilePage.js
import React, { useState } from 'react';
import '../styles/main.css';
import { useNavigate } from 'react-router-dom';

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
    preferredTimeBlocks: [],
    paceTolerance: '',
    preferredRunType: '',
    preferredGender: '',
    preferredMinAge: '',
    preferredMaxAge: '',
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }

  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setProfile((prev) => {
      const alreadySelected = prev.preferredTimeBlocks.includes(value);
      return {
        ...prev,
        preferredTimeBlocks: alreadySelected
          ? prev.preferredTimeBlocks.filter((v) => v !== value)
          : [...prev.preferredTimeBlocks, value]
      };
    });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data:', profile);
    navigate('/landing');

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
              Typical running pace (minutes per mile)
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
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              This helps others get to know you better!
            </p>

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
              <button type="button" onClick={() => setCurrentStep(4)} style={{ flex: 1 }}>
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h2 style={{ textAlign: "center" }}>When Are You Usually Free to Run?</h2>
            {/* <p style={{ textAlign: "center", marginBottom: "20px" }}>
              Select all times that you usually like to run for each day of the week.
            </p> */}

            {/* Time block headers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", marginBottom: "10px", fontWeight: "bold" }}>
              <div></div>
              <div style={{ textAlign: "center" }}>Morning</div>
              <div style={{ textAlign: "center" }}>Midday</div>
              <div style={{ textAlign: "center" }}>Afternoon</div>
              <div style={{ textAlign: "center" }}>Evening</div>
            </div>

            {/* Day rows */}
            {Object.keys(profile.availability).map((day) => (
              <div
                key={day}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #ddd"
                }}
              >

                <div>{day}</div>
                {["Morning", "Midday", "Afternoon", "Evening"].map((block) => (
                  <div key={block} style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={profile.availability[day].includes(block)}
                      onChange={(e) => {
                        setProfile((prev) => {
                          const currentBlocks = prev.availability[day];
                          const updatedBlocks = e.target.checked
                            ? [...currentBlocks, block]
                            : currentBlocks.filter((b) => b !== block);
                          return {
                            ...prev,
                            availability: {
                              ...prev.availability,
                              [day]: updatedBlocks
                            }
                          };
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* Back and Next Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="button" onClick={() => setCurrentStep(3)} style={{ flex: 1 }}>
                Back
              </button>
              <button type="button" onClick={() => setCurrentStep(5)} style={{ flex: 1 }}>
                Next
              </button>
            </div>
          </>
        )}


        {currentStep === 5 && (
          <>
            <h2 style={{ textAlign: "center" }}>Setting Your Preferences</h2>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              Great! Now let's set a few preferences to help us match you with the best running partners.
              You can let us know if you care about pace, distance, or who you like to run with — or skip if you don't have strong preferences.
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="button" onClick={() => setCurrentStep(4)} style={{ flex: 1 }}>
                Back
              </button>
              <button type="button" onClick={() => setCurrentStep(6)} style={{ flex: 1 }}>
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 6 && (
          <>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              Set your matching preferences.
            </p>

            {/* Pace tolerance */}
            <label style={{ fontSize: "14px", color: "#555" }}>
              How close to your own pace are you comfortable matching with?
            </label>
            <select
              name="paceTolerance"
              value={profile.paceTolerance}
              onChange={handleChange}
              style={{ width: "93%" }}
            >
              <option value="">Select Preference</option>
              <option value="15">Within ±15 seconds per mile</option>
              <option value="30">Within ±30 seconds per mile</option>
              <option value="60">Within ±1 minute per mile</option>
              <option value="any">No preference</option>
            </select>

            {/* Preferred run type */}
            <label style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
              What type of runs are you looking for?
            </label>
            <select
              name="preferredRunType"
              value={profile.preferredRunType}
              onChange={handleChange}
              style={{ width: "93%" }}
            >
              <option value="">Select Run Type</option>
              <option value="short">Short (1–3 miles)</option>
              <option value="medium">Medium (3–6 miles)</option>
              <option value="long">Long (6+ miles)</option>
              <option value="any">No preference</option>
            </select>

            {/* Preferred partner gender */}
            <label style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
              Do you prefer running with a specific gender?
            </label>
            <select
              name="preferredGender"
              value={profile.preferredGender}
              onChange={handleChange}
              style={{ width: "93%" }}
            >
              <option value="">No Preference</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>

            {/* Preferred partner age range */}
            <label style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
              Preferred age range?
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number"
                name="preferredMinAge"
                placeholder="Min Age"
                value={profile.preferredMinAge}
                onChange={handleChange}
                style={{ width: "45%" }}
              />
              <input
                type="number"
                name="preferredMaxAge"
                placeholder="Max Age"
                value={profile.preferredMaxAge}
                onChange={handleChange}
                style={{ width: "45%" }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="button" onClick={() => setCurrentStep(5)} style={{ flex: 1 }}>
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
