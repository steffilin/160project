import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import './ViewProfile.css';

function ViewProfile({ profile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);
    const toggleAvailability = (day, block) => {
        setEditProfile((prev) => {
            const currentBlocks = prev.availability[day];
            const updatedBlocks = currentBlocks.includes(block)
                ? currentBlocks.filter((b) => b !== block) // remove
                : [...currentBlocks, block];               // add

            return {
                ...prev,
                availability: {
                    ...prev.availability,
                    [day]: updatedBlocks,
                },
            };
        });
    };
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <Link
                to="/landing"
                style={{
                    textDecoration: 'none',
                    color: '#0066ff',
                    fontSize: '14px',
                    marginBottom: '20px',
                    display: 'inline-block'
                }}
            >
                Back
            </Link>

            {/* HEADER: Name, Age, Gender, Location */}
            <div className="profile-header-card">
                <div className="header-main">
                    <h2>{profile.displayName}</h2>
                    <div className="header-sub">
                        <span>{profile.age} yrs</span>
                        <span>{profile.gender}</span>
                    </div>
                </div>
                <div className="location-text">{profile.location}</div>
            </div>

            {/* RUNNING Section */}
            <div className="section-card">
                <div className="section-content">
                    <div className="profile-item"><span>Pace:</span> <span>{profile.paceMinutes}:{profile.paceSeconds} min/mile</span></div>
                    <div className="profile-item"><span>Goal:</span> <span>{profile.goal || 'No specific goal'}</span></div>
                    <div className="profile-item"><span>Run type:</span> <span>{profile.preferredRunType || 'No preference'}</span></div>
                    <div className="profile-item"><span>Pace tolerance:</span> <span>{profile.paceTolerance || 'No preference'}</span></div>
                </div>
            </div>

            {/* ABOUT ME (Bio) */}
            <div className="section-card">
                <div className="section-header">About Me</div>
                <p className="bio-text">{profile.bio}</p>
            </div>

            {/* SCHEDULE */}
            <div className="section-card">
                <div className="section-header">Availability</div>

                <div className="calendar-grid">
                    {/* Top Row: Blank + Time Blocks */}
                    <div className="calendar-cell calendar-header"></div>
                    {[
                        { label: 'Morning', range: '6AM-10AM' },
                        { label: 'Midday', range: '10AM-2PM' },
                        { label: 'Afternoon', range: '2PM-6PM' },
                        { label: 'Evening', range: '6PM-10PM' },
                    ].map((time) => (
                        <div key={time.label} className="calendar-cell calendar-header">
                            <div>{time.range}</div>
                        </div>
                    ))}

                    {/* For each Day */}
                    {Object.entries(editProfile.availability).map(([day, times]) => (
                        <React.Fragment key={day}>
                            <div className="calendar-cell calendar-day">{day}</div>
                            {['Morning', 'Midday', 'Afternoon', 'Evening'].map((block) => (
                                <div
                                    key={block}
                                    className={`calendar-cell ${times.includes(block) ? 'available' : ''} ${isEditing ? 'editable' : ''}`}
                                    onClick={() => isEditing && toggleAvailability(day, block)}
                                >
                                    {times.includes(block) ? '' : ''}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>



            {/* MATCH PREFERENCES */}
            <div className="section-card">
                <div className="section-header">Match Preferences</div>
                <div className="section-content">
                    <div className="profile-item">
                        <span>Preferred gender:</span>
                        <span>{profile.preferredGender || 'No preference'}</span>
                    </div>
                    <div className="profile-item">
                        <span>Preferred age range:</span>
                        <span>{profile.preferredMinAge} - {profile.preferredMaxAge}</span>
                    </div>
                </div>
            </div>


            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Save' : 'Edit Profile'}
            </button>

        </div>
    );
}

export default ViewProfile;
