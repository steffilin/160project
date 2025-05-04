import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingHome.css';

// --- Mock Data (Adjusted + Added Scheduled Runs) ---
const mockUserName = "Jane";

const mockUpcomingRun = {
  id: 'run123',
  partnerName: 'Alex K.',
  date: '2025-05-05', // Today is 2025-05-04, so this is Tomorrow
  time: '08:00',
  location: 'Memorial Glade',
};

const mockWeeklyStats = {
  runs: 3,
  distance: 15.2,
};

const mockRecentRuns = [
    { id: 'r1', date: 'Yesterday', distance: 5, unit: 'km', partner: 'Sarah J.'},
    { id: 'r2', date: 'May 2', distance: 7.5, unit: 'km', partner: null},
];

// ADDED: Mock data for scheduled runs list
const mockScheduledRuns = [
  { id: 'sched1', partnerName: 'Alex K.', date: '2025-05-05', time: '08:00', location: 'Memorial Glade' },
  { id: 'sched2', partnerName: 'Mike R.', date: '2025-05-08', time: '18:00', location: 'Ohlone Greenway' },
  { id: 'sched3', partnerName: null, date: '2025-05-10', time: '07:30', location: 'Lake Merritt Loop' },
  { id: 'sched4', partnerName: 'Chris P.', date: '2025-05-12', time: '12:00', location: 'Strawberry Canyon' },
];


// --- Component ---
function LandingHome() {
  const navigate = useNavigate();

  const handleStartQuickRun = () => {
    console.log("Starting Quick Run...");
    navigate('track-run');
  };

  const handleViewRunDetails = (runId) => {
    // For now, navigate to the generic scheduled runs list page
    // Later, you might pass the runId: navigate(`/landing/scheduled-runs/${runId}`);
    navigate(`/landing/scheduled-runs`);
  };

  const handleViewHistory = () => {
    navigate(`/landing/history`);
  };

   const handleFindPartners = () => {
     navigate('/landing/find-runners');
   };

   // Get today's date strings for comparison
   const today = new Date(); // Use current date from system
   const tomorrow = new Date(today);
   tomorrow.setDate(today.getDate() + 1);
   const todayStr = today.toISOString().split('T')[0];
   const tomorrowStr = tomorrow.toISOString().split('T')[0];

   const getRelativeDate = (dateStr) => {
       try {
            if (!dateStr) return ''; // Handle cases where date might be missing
            if (dateStr === todayStr) return 'Today';
            if (dateStr === tomorrowStr) return 'Tomorrow';
            const dateObj = new Date(dateStr + 'T00:00:00'); // Ensure parsing as local date
            // Check if date is within the next week for more relative terms? (Optional)
            // const oneWeekFromNow = new Date(today);
            // oneWeekFromNow.setDate(today.getDate() + 7);
            // if (dateObj > tomorrow && dateObj <= oneWeekFromNow) {
            //     return dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., Mon, Tue
            // }
            return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., May 5
       } catch (e) {
            console.error("Error parsing date:", dateStr, e);
            return dateStr; // Fallback
       }
   }

  return (
    <div className="landing-home-container page-container"> {/* Added page-container for consistency */}
      {/* --- 1. Welcome Message --- */}
      <h2 className="welcome-message">
        Ready to run, {mockUserName}?
      </h2>

      {/* --- 2. Upcoming Run Notification --- */}
      {mockUpcomingRun ? (
        <div className="notification-bar">
          Next run with <strong>{mockUpcomingRun.partnerName}</strong>: {' '}
          {getRelativeDate(mockUpcomingRun.date)} at {mockUpcomingRun.time}. {' '}
          <a href="#" onClick={(e) => { e.preventDefault(); handleViewRunDetails(mockUpcomingRun.id); }}>
            View Details
          </a>
        </div>
      ) : (
        <div className="no-notification">
            Schedule your next run! <a href="#" onClick={(e) => { e.preventDefault(); navigate('/landing/schedule-run'); }}>Plan one now</a>
            {' '}or <a href="#" onClick={(e) => { e.preventDefault(); handleFindPartners(); }}>Find a partner?</a>
        </div>
      )}

      {/* --- 3. Combined Row (Run Button + Stats) --- */}
      <div className="run-stats-row">
          {/* RUN Button Block */}
          <div className="run-button-block" onClick={handleStartQuickRun} role="button" tabIndex="0">
              RUN
          </div>

          {/* Condensed Stats Block */}
          <div className="stats-block-condensed">
              <div className="stat-item-condensed">
                  <span className="stat-value-condensed">{mockWeeklyStats.runs}</span>
                  <span className="stat-label-condensed">Runs</span>
              </div>
              <div className="stat-item-condensed">
                  <span className="stat-value-condensed">{mockWeeklyStats.distance}</span>
                  {/* Adjusted label for clarity */}
                  <span className="stat-label-condensed">km This Week</span>
              </div>
          </div>
      </div>

      {/* --- ADDED: 4. Scheduled Runs Section --- */}
      <div className="scheduled-runs-section dashboard-card">
        <h3 className="card-title">Scheduled Runs</h3>
        <div className="card-content">
          {mockScheduledRuns.length > 0 ? (
            // Display only the first few runs, e.g., 3
            mockScheduledRuns.slice(0, 3).map(run => (
              <div key={run.id} className="scheduled-run-item">
                <div className="run-item-datetime">
                  <span className="run-item-date">{getRelativeDate(run.date)}</span>
                  <span className="run-item-time">{run.time}</span>
                </div>
                <div className="run-item-details">
                  <span className="run-item-location">{run.location}</span>
                  {run.partnerName && <span className="run-item-partner">w/ {run.partnerName}</span>}
                  {!run.partnerName && <span className="run-item-partner solo">Solo Run</span>}
                </div>
                 <button onClick={() => handleViewRunDetails(run.id)} className="button-icon" aria-label="View run details">
                    &gt; {/* Simple arrow, consider an icon */}
                 </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#777' }}>You have no runs scheduled.</p>
          )}
        </div>
         {/* Link to view all scheduled runs if there are more than shown */}
         {mockScheduledRuns.length > 3 && ( // Show button only if there are more runs than displayed
            <button onClick={() => navigate('/landing/scheduled-runs')} className="button-secondary">
                View All Scheduled ({mockScheduledRuns.length})
            </button>
         )}
         {mockScheduledRuns.length === 0 && ( // Suggest scheduling if none exist
             <button onClick={() => navigate('/landing/schedule-run')} className="button-secondary">
                Schedule a Run
            </button>
         )}
      </div>


      {/* --- 5. Recent Activity Card --- */}
      {mockRecentRuns.length > 0 && (
        <div className="dashboard-card">
            <h3 className="card-title">Recent Activity</h3>
            <div className="card-content">
                {mockRecentRuns.slice(0, 3).map(run => ( // Show max 3 recent runs
                    <div key={run.id} className="recent-run-item">
                        <div>
                            <span className="run-details">{run.distance} {run.unit}</span>
                            {run.partner && <span style={{color: '#555', marginLeft: '5px'}}> w/ {run.partner}</span>}
                        </div>
                        <span className="run-date">{run.date}</span> {/* Use getRelativeDate here too? */}
                    </div>
                ))}
            </div>
            <button onClick={handleViewHistory} className="button-secondary">
                View Full History
            </button>
        </div>
      )}
      {/* Placeholder if no recent runs */}
      {mockRecentRuns.length === 0 && (
            <div className="dashboard-card">
                <h3 className="card-title">Recent Activity</h3>
                <p className="card-content" style={{textAlign: 'center', color: '#777'}}>Your recent runs will appear here.</p>
            </div>
        )}

    </div>
  );
}

export default LandingHome;