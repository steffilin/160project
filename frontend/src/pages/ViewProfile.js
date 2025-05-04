import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ViewProfile.css';

function ViewProfile({ profile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);
    const location = useLocation();

    useEffect(() => {
        const event = new CustomEvent('tabChange', { detail: 'profile' });
        window.dispatchEvent(event);
    }, []);

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

    return (
        <>
            {/* Profile Header */}
            <div className="profile-header">
                {isEditing ? (
                    <>
                        <input
                            className="edit-name"
                            type="text"
                            value={editProfile.displayName}
                            onChange={(e) => setEditProfile({ ...editProfile, displayName: e.target.value })}
                            placeholder="Display Name"
                        />
                        <div className="edit-row">
                            <input
                                type="number"
                                value={editProfile.age}
                                onChange={(e) => setEditProfile({ ...editProfile, age: e.target.value })}
                                placeholder="Age"
                            />
                            <select
                                value={editProfile.gender}
                                onChange={(e) => setEditProfile({ ...editProfile, gender: e.target.value })}
                            >
                                <option value="">Gender</option>
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
                        />
                    </>
                ) : (
                    <>
                        <h1>{editProfile.displayName}</h1>
                        <div className="profile-meta">
                            <span>{editProfile.age} yrs</span>
                            <span>{editProfile.gender}</span>
                        </div>
                        <div className="profile-location">{editProfile.location}</div>
                    </>
                )}
            </div>

            {/* Running Info */}
            <div className="info-list">
                <div className="info-item">
                    <span className="label">Pace:</span>
                    {isEditing ? (
                        <div className="edit-pace">
                            <input
                                type="number"
                                value={editProfile.paceMinutes}
                                onChange={(e) => setEditProfile({ ...editProfile, paceMinutes: e.target.value })}
                                placeholder="Min"
                            />
                            <span>:</span>
                            <input
                                type="number"
                                value={editProfile.paceSeconds}
                                onChange={(e) => setEditProfile({ ...editProfile, paceSeconds: e.target.value })}
                                placeholder="Sec"
                            />
                        </div>
                    ) : (
                        <span className="value">{editProfile.paceMinutes}:{editProfile.paceSeconds} min/mile</span>
                    )}
                </div>
                <div className="info-item">
                    <span className="label">Goal:</span>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editProfile.goal}
                            onChange={(e) => setEditProfile({ ...editProfile, goal: e.target.value })}
                            placeholder="Goal"
                        />
                    ) : (
                        <span className="value">{editProfile.goal || 'No specific goal'}</span>
                    )}
                </div>
                <div className="info-item">
                    <span className="label">Run type:</span>
                    {isEditing ? (
                        <select
                            value={editProfile.preferredRunType}
                            onChange={(e) => setEditProfile({ ...editProfile, preferredRunType: e.target.value })}
                        >
                            <option value="">Select Run Type</option>
                            <option value="short">Short (1-3 miles)</option>
                            <option value="medium">Medium (3-6 miles)</option>
                            <option value="long">Long (6+ miles)</option>
                            <option value="any">No preference</option>
                        </select>
                    ) : (
                        <span className="value">{editProfile.preferredRunType || 'No preference'}</span>
                    )}
                </div>
                <div className="info-item">
                    <span className="label">Pace tolerance:</span>
                    {isEditing ? (
                        <select
                            value={editProfile.paceTolerance}
                            onChange={(e) => setEditProfile({ ...editProfile, paceTolerance: e.target.value })}
                        >
                            <option value="">Select Preference</option>
                            <option value="15">±15 sec/mile</option>
                            <option value="30">±30 sec/mile</option>
                            <option value="60">±1 min/mile</option>
                            <option value="any">No preference</option>
                        </select>
                    ) : (
                        <span className="value">{editProfile.paceTolerance}</span>
                    )}
                </div>
            </div>

            {/* About Me */}
            <div className="section">
                <h2>About Me</h2>
                {isEditing ? (
                    <textarea
                        value={editProfile.bio}
                        onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                        placeholder="Share a little about yourself..."
                    />
                ) : (
                    <p className="bio">{editProfile.bio}</p>
                )}
            </div>

            {/* Availability Calendar */}
            <div className="section">
                <h2>Availability</h2>
                <div className="calendar">
                    <div className="time-header"></div>
                    {[
                        { label: 'Morning', range: '6AM-10AM' },
                        { label: 'Midday', range: '10AM-2PM' },
                        { label: 'Afternoon', range: '2PM-6PM' },
                        { label: 'Evening', range: '6PM-10PM' },
                    ].map((time) => (
                        <div key={time.label} className="time-header">
                            {time.range}
                        </div>
                    ))}

                    {Object.entries(editProfile.availability).map(([day, times]) => (
                        <React.Fragment key={day}>
                            <div className="day-label">{day}</div>
                            {['Morning', 'Midday', 'Afternoon', 'Evening'].map((block) => (
                                <div
                                    key={block}
                                    className={`time-slot ${times.includes(block) ? 'available' : ''} ${isEditing ? 'editable' : ''}`}
                                    onClick={() => isEditing && toggleAvailability(day, block)}
                                >
                                    {times.includes(block) ? '✓' : ''}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Match Preferences */}
            <div className="section">
                <h2>Match Preferences</h2>
                <div className="preference-item">
                    <span className="label">Preferred gender:</span>
                    {isEditing ? (
                        <select
                            value={editProfile.preferredGender}
                            onChange={(e) => setEditProfile({ ...editProfile, preferredGender: e.target.value })}
                        >
                            <option value="">No Preference</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                        </select>
                    ) : (
                        <span className="value">{editProfile.preferredGender || 'No preference'}</span>
                    )}
                </div>
                <div className="preference-item">
                    <span className="label">Preferred age range:</span>
                    {isEditing ? (
                        <div className="age-range">
                            <input
                                type="number"
                                value={editProfile.preferredMinAge}
                                onChange={(e) => setEditProfile({ ...editProfile, preferredMinAge: e.target.value })}
                                placeholder="Min"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                value={editProfile.preferredMaxAge}
                                onChange={(e) => setEditProfile({ ...editProfile, preferredMaxAge: e.target.value })}
                                placeholder="Max"
                            />
                        </div>
                    ) : (
                        <span className="value">{editProfile.preferredMinAge} - {editProfile.preferredMaxAge}</span>
                    )}
                </div>
            </div>

            <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
        </>
    );
}

export default ViewProfile;