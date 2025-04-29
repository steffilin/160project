import React, { useState } from 'react';
import MatchToast from './pages/MatchToast';  
import '../styles/matchingFriends.css'; 

function MatchingFriends({ currentUserInfo, userList }) {
  const [bestMatch, setBestMatch] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleFindMatch = async () => {
    try {
      const response = await fetch('https://noggin.rea.gent/indirect-bat-9545', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_slzbzunqw2n5qb43ys5faw65y45u3tm8hn2u_ngk',
        },
        body: JSON.stringify({
          Personality: currentUserInfo.Personality,
          runningspeed: currentUserInfo.runningspeed,
          avaiable_time_shot: currentUserInfo.avaiable_time_shot,
          Location: currentUserInfo.Location,
        }),
      });
      const data = await response.text();
      console.log('AI Match result:', data);
      setBestMatch(data);
      setToastMessage(`Matched with ${JSON.parse(data).name}! 🎯`);
    } catch (error) {
      console.error('Error matching friend:', error);
      setToastMessage('Failed to match. Try again!');
    }
  };

  return (
    <div className="matching-friends-container">
      <h2>Find Your Running Partner</h2>
      <button className="match-button" onClick={handleFindMatch}>Find Match</button>

      {bestMatch && (
        <div className="friend-card">
          <div className="friend-info">
            <h3>{JSON.parse(bestMatch).name}</h3>
            <p>{JSON.parse(bestMatch).explanation}</p>
          </div>
        </div>
      )}

      {toastMessage && <MatchToast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
}

export default MatchingFriends;