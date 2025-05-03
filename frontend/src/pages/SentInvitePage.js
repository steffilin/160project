import React, { createElement, useState } from 'react';
// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/FriendList.css';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { useFriendList } from '../FriendContext';



function SentInvitePage() {

    const location = useLocation();
    const { eventName, runLocation, time } = location.state || {};


    return (
        <div>
            <p>Your {time} invite for {eventName} at {runLocation} has been sent to the running party!</p>
        </div>
    )
}

export default SentInvitePage;