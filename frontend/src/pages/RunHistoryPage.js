// src/pages/RunHistoryPage.js
import React from 'react';
import '../styles/RunHistoryPage.css'; // Create this CSS file

// --- Mock Data (Replace with actual data fetching/local storage) ---
const mockRunHistory = [
  {
    id: 'rh1',
    date: '2025-05-03T18:30:00Z', // ISO format is good for sorting
    duration: 2705, // seconds (e.g., 45:05)
    distance: 7.5, // km
    pace: 361, // seconds per km (e.g., 6:01 min/km)
    partner: null,
    locationDesc: 'Ohlone Greenway Loop', // Optional description
  },
  {
    id: 'rh2',
    date: '2025-05-01T07:00:00Z',
    duration: 1810, // 30:10
    distance: 5.0, // km
    pace: 362, // 6:02 min/km
    partner: 'Alex K.',
    locationDesc: 'Campus Perimeter',
  },
  {
    id: 'rh3',
    date: '2025-04-28T08:00:00Z',
    duration: 3300, // 55:00
    distance: 8.2, // km
    pace: 402, // 6:42 min/km
    partner: 'Sarah J.',
    locationDesc: 'Strawberry Canyon Trail',
   },
];
// Sort history chronologically (newest first)
mockRunHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

// const mockRunHistory = []; // Use if no history yet

function RunHistoryPage() {

  // --- Helper Functions (reuse or place in a utils file) ---
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    if (hours > 0) {
        return `${hours.toString()}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const formatPace = (paceSecondsPerKm) => {
     if (!paceSecondsPerKm || paceSecondsPerKm <= 0) return '--:--';
    const minutes = Math.floor(paceSecondsPerKm / 60).toString().padStart(2, '0');
    const seconds = (paceSecondsPerKm % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds} min/km`;
  };

   const formatDate = (dateString) => {
        try {
            const dateObj = new Date(dateString);
            return dateObj.toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
             });
        } catch (e) {
            return dateString;
        }
    }

  return (
    <div className="run-history-container page-container">
      <h2 className="page-title">Run History</h2>

      {mockRunHistory.length === 0 ? (
        <p className="no-history-message">You haven't recorded any runs yet. Go for a run!</p>
      ) : (
        <div className="history-list">
          {mockRunHistory.map((run) => (
            <div key={run.id} className="history-card">
                <div className="history-card-header">
                    <span className="history-date">{formatDate(run.date)}</span>
                    {run.partner && <span className="history-partner">w/ {run.partner}</span>}
                 </div>
                <div className="history-card-body">
                     <div className="history-stat">
                        <span className="stat-label">Distance:</span>
                        <span className="stat-value">{run.distance.toFixed(2)} km</span>
                     </div>
                    <div className="history-stat">
                        <span className="stat-label">Duration:</span>
                        <span className="stat-value">{formatTime(run.duration)}</span>
                     </div>
                     <div className="history-stat">
                        <span className="stat-label">Avg Pace:</span>
                        <span className="stat-value">{formatPace(run.pace)}</span>
                     </div>
                 </div>
                 {run.locationDesc && <p className="history-location">📍 {run.locationDesc}</p>}
                  {/* Add button to view map/details if available */}
                  {/* <button className="button-view-details">View Details</button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RunHistoryPage;