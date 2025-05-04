import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../styles/ScheduleRunPage.css";

// Map container styles
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "8px",
};

// Berkeley center coordinates
const center = {
  lat: 37.8715,
  lng: -122.273,
};

// Map options
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
};

function ScheduleRunPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef();

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
  const [mapPosition, setMapPosition] = useState(center);

  const [message, setMessage] = useState("");

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB0OuVczmVMrYI_okLKZQJHi1AbbdZJ_4k", // Replace with your actual API key
    libraries: ["places"],
  });

  // Store map instance when it loads
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Handle map click to set marker and location
  const handleMapClick = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMapPosition(newPosition);

    // Reverse geocode to get address (in a real app)
    // For now, just set coordinates as text
    setMeetLocation(
      `Lat: ${newPosition.lat.toFixed(6)}, Lng: ${newPosition.lng.toFixed(6)}`
    );
  }, []);

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
      coordinates: mapPosition,
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

  // Render loading, error, or map
  const renderMap = () => {
    if (loadError) {
      return (
        <div className="map-error">
          Error loading maps. Please check your internet connection.
        </div>
      );
    }

    if (!isLoaded) {
      return <div className="map-loading">Loading map...</div>;
    }

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={mapPosition}
        options={options}
        onClick={handleMapClick}
        onLoad={onMapLoad}
      >
        <Marker position={mapPosition} />
      </GoogleMap>
    );
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
          {renderMap()}
          <div className="map-instruction">
            Tap on the map to select a meeting location
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
