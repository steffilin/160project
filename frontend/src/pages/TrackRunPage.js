// src/pages/TrackRunPage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api';
import '../styles/TrackRunPage.css'; // Create this CSS file

// --- Map Styles and Options (Optional: You can reuse styles from ScheduleRunPage) ---
const mapContainerStyle = {
  width: '100%',
  height: '300px', // Adjust height as needed
  borderRadius: '8px',
  marginBottom: '20px',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  // Add styles here if desired
};

// --- Component ---
function TrackRunPage() {
  const [isRunning, setIsRunning] = useState(true); // Start running immediately when page loads
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0); // In seconds
  const [distance, setDistance] = useState(0); // In kilometers
  const [currentPosition, setCurrentPosition] = useState(null); // { lat, lng }
  const [path, setPath] = useState([]); // Array of { lat, lng }

  const watchIdRef = useRef(null); // To store the geolocation watch ID

  // --- Google Maps Loader --- (Replace with your key)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB0OuVczmVMrYI_okLKZQJHi1AbbdZJ_4k",
    libraries: ["geometry"], // Geometry library for distance calculation
  });

  // --- Timer Logic ---
  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        // Calculate elapsed time based on start time for accuracy
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup
  }, [isRunning, isPaused, startTime]);

  // --- Geolocation Logic ---
  const handlePositionUpdate = useCallback((position) => {
      const { latitude, longitude } = position.coords;
      const newPosition = { lat: latitude, lng: longitude };
      console.log("Position Update:", newPosition);
      setCurrentPosition(newPosition);

      if (isRunning && !isPaused) {
          setPath((prevPath) => {
              const updatedPath = [...prevPath, newPosition];
              // Calculate distance increment if path has at least 2 points
              if (updatedPath.length >= 2 && window.google && window.google.maps.geometry) {
                 const lastPos = updatedPath[updatedPath.length - 2];
                 const distIncrement = window.google.maps.geometry.spherical.computeDistanceBetween(
                     new window.google.maps.LatLng(lastPos.lat, lastPos.lng),
                     new window.google.maps.LatLng(newPosition.lat, newPosition.lng)
                 );
                 setDistance((prevDist) => prevDist + distIncrement / 1000); // Add distance in km
              }
              return updatedPath;
          });
      }
  }, [isRunning, isPaused]); // Dependencies for the callback

  const handlePositionError = (error) => {
    console.error("Geolocation Error:", error);
    alert(`Error getting location: ${error.message}. Please ensure location services are enabled and permissions granted.`);
    // Handle stopping the run or showing an error state?
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning && !isPaused) {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        setIsRunning(false);
        return;
      }

      // Start watching position
      watchIdRef.current = navigator.geolocation.watchPosition(
        handlePositionUpdate,
        handlePositionError,
        {
          enableHighAccuracy: true,
          timeout: 10000, // Max time to wait for a position
          maximumAge: 0, // Don't use cached position
        }
      );
      console.log("Started watching position, ID:", watchIdRef.current);

    } else {
      // Clear the watch if running stops or pauses
      if (watchIdRef.current !== null) {
        console.log("Stopping watch position, ID:", watchIdRef.current);
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }

    // Cleanup function to clear watch when component unmounts or state changes stop watching
    return () => {
      if (watchIdRef.current !== null) {
         console.log("Cleanup: Stopping watch position, ID:", watchIdRef.current);
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isRunning, isPaused, handlePositionUpdate]); // Rerun effect if running/paused state changes

  // --- Control Handlers ---
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
        console.log("Run Paused");
        // If pausing, stop watching location temporarily? (Optional, depends on desired behavior)
    } else {
        console.log("Run Resumed");
        // If resuming, ensure location watch restarts if it was stopped
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false); // Ensure not paused when stopped
    console.log("Run Stopped");
    // --- TODO: Save the run data ---
    const runData = {
      duration: elapsedTime,
      distance: distance,
      path: path,
      date: new Date().toISOString(),
      // Add average pace, calories burned (estimates), etc.
    };
    console.log("Run Data to Save:", runData);
    alert(`Run Finished!\nDuration: ${formatTime(elapsedTime)}\nDistance: ${distance.toFixed(2)} km`);
    // Example: Save to local storage or send to API
    // localStorage.setItem('lastRun', JSON.stringify(runData));

    // Navigate back to home or to a summary page?
    // navigate('/landing');
  };

  // --- Helper Functions ---
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const calculatePace = () => {
    if (distance === 0 || elapsedTime === 0) return '--:--';
    const paceSecondsPerKm = Math.floor(elapsedTime / distance);
    const minutes = Math.floor(paceSecondsPerKm / 60).toString().padStart(2, '0');
    const seconds = (paceSecondsPerKm % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // --- Render Logic ---
   if (loadError) return <div className="page-container error-message">Error loading map services.</div>;
  // Show loading state for map OR location
  const isLoading = (!isLoaded || (isRunning && !currentPosition));

  return (
    <div className="track-run-container page-container">
      <h2 className="page-title">Tracking Run</h2>

      {/* --- Live Stats Display --- */}
      <div className="live-stats-display">
        <div className="stat-item">
          <span className="stat-value">{formatTime(elapsedTime)}</span>
          <span className="stat-label">Duration</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{distance.toFixed(2)}</span>
          <span className="stat-label">km</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{calculatePace()}</span>
          <span className="stat-label">Pace (min/km)</span>
        </div>
      </div>

        {/* --- Map Display --- */}
        <div className="map-display-area">
         {isLoading && <div className="loading-overlay"><span>Loading Map & Location...</span></div>}
         {isLoaded && (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentPosition || { lat: 37.8715, lng: -122.273 }} // Default center if no position yet
                zoom={currentPosition ? 17 : 14} // Zoom in when position is known
                options={mapOptions}
            >
                {currentPosition && (
                    <Marker position={currentPosition} />
                 )}
                 {path.length > 1 && (
                    <Polyline
                        path={path}
                        options={{
                            strokeColor: '#FF0000', // Red line for path
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                         }}
                    />
                  )}
            </GoogleMap>
          )}
      </div>


      {/* --- Control Buttons --- */}
      <div className="controls">
         {isRunning && (
             <>
                <button onClick={handlePauseResume} className={`button-pause-resume ${isPaused ? 'resume' : 'pause'}`}>
                 {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={handleStop} className="button-stop">Stop & Save</button>
             </>
         )}
         {!isRunning && (
             <p>Run stopped. (Add options to save/discard or navigate)</p>
             // Example: <button onClick={() => navigate('/landing')}>Back to Home</button>
         )}
      </div>

        {/* --- Debug Info (Optional) --- */}
       {/* <div className="debug-info">
            <p>Status: {isRunning ? (isPaused ? 'Paused' : 'Running') : 'Stopped'}</p>
            <p>Position: {currentPosition ? `${currentPosition.lat.toFixed(4)}, ${currentPosition.lng.toFixed(4)}` : 'N/A'}</p>
            <p>Path Points: {path.length}</p>
            <p>Watch ID: {watchIdRef.current}</p>
        </div> */}

    </div>
  );
}

export default TrackRunPage;