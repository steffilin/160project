import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ScheduleRunPage.css";

function ScheduleRunPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Default runner information
  const defaultRunner = {
    name: "Running Partner",
    pace: "8:30 min/km",
    preferredRunType: "Medium distance",
    goal: "General fitness",
  };

  // Runner information from state
  const [runner, setRunner] = useState(defaultRunner);

  // Schedule details
  const [day, setDay] = useState("Monday");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [meetLocation, setMeetLocation] = useState("");
  const [mapPosition, setMapPosition] = useState({
    lat: 37.8715,
    lng: -122.273,
  }); // Default to Berkeley
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Set tomorrow's date as default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);

    // Load data from state if available
    if (location.state) {
      if (location.state.runner) setRunner(location.state.runner);
      if (location.state.day) setDay(location.state.day);
      if (location.state.startTime) setStartTime(location.state.startTime);
      if (location.state.endTime) setEndTime(location.state.endTime);
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [location.state]);

  const timeOptions = [];
  for (let h = 5; h < 22; h++) {
    // 5 AM to 9:30 PM
    const hour = h.toString().padStart(2, "0");
    timeOptions.push(`${hour}:00`, `${hour}:30`);
  }

  const handleMapClick = (event) => {
    // Simplified map interaction - in a real app would use actual coordinates
    setMeetLocation("Selected location on map");
  };

  const handleSendInvitation = () => {
    // Create invitation object with all the details
    const invitation = {
      runner: runner.name,
      runnerId: runner.id,
      day,
      date,
      startTime,
      endTime,
      meetLocation,
      message,
    };

    console.log("Sending invitation:", invitation);

    // Navigate to confirmation page
    navigate("/landing/sent-invite", {
      state: { invitation },
    });
  };

  const handleCancel = () => {
    // Navigate back to find-runners page
    navigate("/landing/find-runners");
  };

  return (
    <div className="schedule-run-container">
      <h2 className="page-title">Schedule Run</h2>

      <div className="runner-card">
        <h3>Running with:</h3>
        <div className="runner-info">
          <div className="runner-name">{runner.name}</div>
          <div className="runner-details">
            <div className="runner-pace">Pace: {runner.pace}</div>
            <div className="runner-type">
              Run Type: {runner.preferredRunType}
            </div>
            {runner.goal && (
              <div className="runner-goal">Goal: {runner.goal}</div>
            )}
          </div>
        </div>
      </div>

      <div className="schedule-section">
        <h3>When do you want to run?</h3>

        <div className="form-group">
          <label>Day:</label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="time-group">
          <div className="form-group">
            <label>Start Time:</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>End Time:</label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="location-section">
        <h3>Where do you want to meet?</h3>

        <div className="map-container">
          {/* Mock map with placeholder image to ensure it always displays */}
          <div className="mock-map" onClick={handleMapClick}>
            <div className="map-placeholder">
              <div className="map-background"></div>
              <div className="map-instruction">
                Tap to select a meeting location
              </div>
              <div className="map-marker"></div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Meeting Location:</label>
          <input
            type="text"
            value={meetLocation}
            onChange={(e) => setMeetLocation(e.target.value)}
            placeholder="e.g., Berkeley Marina parking lot"
          />
        </div>
      </div>

      <div className="message-section">
        <h3>Add a message (optional):</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Looking forward to running with you!"
          rows={3}
        ></textarea>
      </div>

      <div className="button-group">
        <button
          className="send-invitation-button"
          onClick={handleSendInvitation}
        >
          Send Invitation
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>

      {/* Spacer to ensure content isn't hidden behind fixed button */}
      <div style={{ height: "80px" }}></div>
    </div>
  );
}

export default ScheduleRunPage;
