
import React, { useEffect } from 'react';
import '../styles/notification.css';

function MatchToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      🎉 {message}
    </div>
  );
}

export default MatchToast;
