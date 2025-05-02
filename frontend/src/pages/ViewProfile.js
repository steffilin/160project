import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ViewProfile.css';

function ViewProfile({ profile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);

    const toggleAvailability = (day, block) => {
        setEditProfile((prev) => {
            const currentBlocks = prev.availability[day];
            const updatedBlocks = currentBlocks.includes(block)
                ? currentBlocks.filter((b) => b !== block)
                : [...currentBlocks, block];

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
                ← Back
            </Link>

            {/* HEADER: Name, Age, Gender, Location */}
            <div className="profile-header-card">
                <div className="header-main">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editProfile.displayName}
                                onChange={(e) => setEditProfile({ ...editProfile, displayName: e.target.value })}
                                placeholder="Display Name"
                            />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <input
                                    type="number"
                                    value={editProfile.age}
                                    onChange={(e) => setEditProfile({ ...editProfile, age: e.target.value })}
                                    placeholder="Age"
                                    style={{ width: '80px' }}
                                />
                                <select
                                    value={editProfile.gender}
                                    onChange={(e) => setEditProfile({ ...editProfile, gender: e.target.value })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                value={editProfile.location}
                                onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                                placeholder="Location"
                                style={{ marginTop: '10px' }}
                            />
                        </>
                    ) : (
                        <>
                            <h2>{editProfile.displayName}</h2>
                            <div className="header-sub">
                                <span>{editProfile.age} yrs</span>
                                <span>{editProfile.gender}</span>
                            </div>
                            <div className="location-text">{editProfile.location}</div>
                        </>
                    )}
                </div>
            </div>

            {/* RUNNING Section */}
            <div className="section-card">
                <div className="section-content">
                    <div className="profile-item">
                        <span>Pace:</span>
                        {isEditing ? (
                            <>
                                <input
                                    type="number"
                                    value={editProfile.paceMinutes}
                                    onChange={(e) => setEditProfile({ ...editProfile, paceMinutes: e.target.value })}
                                    placeholder="Min"
                                    style={{ width: '60px', marginLeft: '10px' }}
                                />
                                <input
                                    type="number"
                                    value={editProfile.paceSeconds}
                                    onChange={(e) => setEditProfile({ ...editProfile, paceSeconds: e.target.value })}
                                    placeholder="Sec"
                                    style={{ width: '60px', marginLeft: '10px' }}
                                />
                            </>
                        ) : (
                            <span>{editProfile.paceMinutes}:{editProfile.paceSeconds} min/mile</span>
                        )}
                    </div>
                    <div className="profile-item">
                        <span>Goal:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editProfile.goal}
                                onChange={(e) => setEditProfile({ ...editProfile, goal: e.target.value })}
                                placeholder="Goal"
                                style={{ marginLeft: '10px' }}
                            />
                        ) : (
                            <span>{editProfile.goal || 'No specific goal'}</span>
                        )}
                    </div>
                    <div className="profile-item">
                        <span>Run type:</span>
                        {isEditing ? (
                            <select
                                value={editProfile.preferredRunType}
                                onChange={(e) => setEditProfile({ ...editProfile, preferredRunType: e.target.value })}
                                style={{ marginLeft: '10px' }}
                            >
                                <option value="">Select Run Type</option>
                                <option value="short">Short (1–3 miles)</option>
                                <option value="medium">Medium (3–6 miles)</option>
                                <option value="long">Long (6+ miles)</option>
                                <option value="any">No preference</option>
                            </select>
                        ) : (
                            <span>{editProfile.preferredRunType || 'No preference'}</span>
                        )}
                    </div>
                    <div className="profile-item">
                        <span>Pace tolerance:</span>
                        {isEditing ? (
                            <select
                                value={editProfile.paceTolerance}
                                onChange={(e) => setEditProfile({ ...editProfile, paceTolerance: e.target.value })}
                                style={{ marginLeft: '10px' }}
                            >
                                <option value="">Select Preference</option>
                                <option value="15">Within ±15 seconds per mile</option>
                                <option value="30">Within ±30 seconds per mile</option>
                                <option value="60">Within ±1 minute per mile</option>
                                <option value="any">No preference</option>
                            </select>
                        ) : (
                            <span>{editProfile.paceTolerance || 'No preference'}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* ABOUT ME (Bio) */}
            <div className="section-card">
                <div className="section-header">About Me</div>
                {isEditing ? (
                    <textarea
                        value={editProfile.bio}
                        onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                        style={{ width: '100%', height: '100px' }}
                    />
                ) : (
                    <p className="bio-text">{editProfile.bio}</p>
                )}
            </div>

            {/* SCHEDULE */}
            <div className="section-card">
                <div className="section-header">Availability</div>

                <div className="calendar-grid">
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
                        {isEditing ? (
                            <select
                                value={editProfile.preferredGender}
                                onChange={(e) => setEditProfile({ ...editProfile, preferredGender: e.target.value })}
                                style={{ marginLeft: '10px' }}
                            >
                                <option value="">No Preference</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                            </select>
                        ) : (
                            <span>{editProfile.preferredGender || 'No preference'}</span>
                        )}
                    </div>
                    <div className="profile-item">
                        <span>Preferred age range:</span>
                        {isEditing ? (
                            <>
                                <input
                                    type="number"
                                    value={editProfile.preferredMinAge}
                                    onChange={(e) => setEditProfile({ ...editProfile, preferredMinAge: e.target.value })}
                                    placeholder="Min Age"
                                    style={{ width: '60px', marginLeft: '10px' }}
                                />
                                <input
                                    type="number"
                                    value={editProfile.preferredMaxAge}
                                    onChange={(e) => setEditProfile({ ...editProfile, preferredMaxAge: e.target.value })}
                                    placeholder="Max Age"
                                    style={{ width: '60px', marginLeft: '10px' }}
                                />
                            </>
                        ) : (
                            <span>{editProfile.preferredMinAge} - {editProfile.preferredMaxAge}</span>
                        )}
                    </div>
                </div>
            </div>

            <button onClick={() => setIsEditing(!isEditing)} style={{ marginTop: '20px' }}>
                {isEditing ? 'Save' : 'Edit Profile'}
            </button>
        </div>
    );
}

export default ViewProfile;
