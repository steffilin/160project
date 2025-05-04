// src/pages/ScheduledRunsPage.js
import React from 'react';
import '../styles/ScheduledRunsPage.css'; // Create this CSS file

// --- Mock Data (Replace with actual data fetching) ---
const mockScheduledRuns = [
  {
    id: 'run123',
    partnerName: 'Alex K.',
    date: '2025-05-05',
    time: '08:00',
    location: 'Memorial Glade',
    status: 'Confirmed', // Could be 'Pending', 'Confirmed'
  },
  {
    id: 'run456',
    partnerName: 'Sarah J.',
    date: '2025-05-07',
    time: '18:30',
    location: 'Ohlone Greenway',
    status: 'Confirmed',
  },
   {
    id: 'run789',
    partnerName: 'Mike P.',
    date: '2025-05-06',
    time: '07:00',
    location: 'Campus Perimeter',
    status: 'Pending Approval', // Example of an outgoing request not yet accepted
  },
];
// const mockScheduledRuns = []; // Use when no runs are scheduled

function ScheduledRunsPage() {

  // Helper function for date formatting (similar to LandingHome)
  const getRelativeDate = (dateStr) => {
       const today = new Date();
       const tomorrow = new Date(today);
       tomorrow.setDate(today.getDate() + 1);
       const todayStr = today.toISOString().split('T')[0];
       const tomorrowStr = tomorrow.toISOString().split('T')[0];
       try {
            if (dateStr === todayStr) return 'Today';
            if (dateStr === tomorrowStr) return 'Tomorrow';
            const dateObj = new Date(dateStr + 'T00:00:00');
            return dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
       } catch (e) { return dateStr; }
   }

  const handleCancelRun = (runId) => {
      // Add logic to cancel a run (API call, update state)
      alert(`Cancel run ${runId}? (Implement logic)`);
      console.log(`Cancelling run ${runId}`);
  }

  const handleViewChat = (runId, partnerName) => {
       // Add logic to navigate to chat with the partner for this run
      //  alert(`Maps to chat with ${partnerName} for run ${runId}? (Implement logic)`);
       // navigate(`/landing/friends/chat?partner=${partnerName}`); // Example navigation
  }

  return (
    <div className="scheduled-runs-container page-container">
      <h2 className="page-title">Scheduled Runs</h2>

      {mockScheduledRuns.length === 0 ? (
        <p className="no-runs-message">You have no upcoming runs scheduled.</p>
      ) : (
        <div className="runs-list">
          {mockScheduledRuns.map((run) => (
            <div key={run.id} className={`run-card ${run.status.replace(/\s+/g, '-')}`}>
              <div className="run-card-header">
                 <span className="run-partner">{run.partnerName}</span>
                 <span className={`run-status ${run.status.replace(/\s+/g, '-')}`}>{run.status}</span>
              </div>
              <div className="run-card-body">
                 <p className="run-time">
                    <strong>{getRelativeDate(run.date)}</strong> at {run.time}
                 </p>
                 <p className="run-location">📍 {run.location}</p>
              </div>
               <div className="run-card-actions">
                    {/* Show Cancel only if appropriate (e.g., status is Confirmed or Pending) */}
                    {(run.status === 'Confirmed' || run.status === 'Pending Approval') && (
                        <button onClick={() => handleCancelRun(run.id)} className="button-cancel">Cancel</button>
                    )}
                    {/* Show Chat button (example) */}
                    <button onClick={() => handleViewChat(run.id, run.partnerName)} className="button-chat">Chat</button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledRunsPage;