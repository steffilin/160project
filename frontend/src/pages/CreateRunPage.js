
import React, { createElement, useState } from 'react';
// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function CreateRunPage() {
  // const button = ("button");
  // button.innerHtml=
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();


  const handleClick = () => {
    console.log('Select Runners button clicked!');
    // Add your logic here
    console.log('Event Name:', eventName);
    console.log('Location:', location);
    console.log('Time:', time);

    

     // Save values and go to next page
     navigate('/landing/chooserunners', {
      state: {
        eventName,
        location,
        time,
      },
    });

  };

  return (
    <div>
      <h2>Create Party Run</h2>
      <h4>Event Name</h4>
      <input id="event-name" placeholder='Event Name' value={eventName} onChange={(e) => setEventName(e.target.value)}></input>
      <h4>Location</h4>
      <input id="location" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)}></input>
      <h4>Time</h4>
      <input id="time" placeholder='Time' value={time} onChange={(e) => setTime(e.target.value)}></input>

      <button id="btn-select-runner" onClick={handleClick}>Select Runners</button>
    </div>
  );
}

export default CreateRunPage;
