import React, { createElement, useState } from 'react';
// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/FriendList.css';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { useFriendList } from '../FriendContext';



function SentInvitePage() {
    return (
        <div>
            <p>Your invite has been sent to the running party!</p>
        </div>
    )
}

export default SentInvitePage;