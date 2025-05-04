import React from 'react';
import FriendList from './FriendList';
import { useFriendList } from '../FriendContext';
import { useNavigate, Outlet } from 'react-router-dom';



function FriendsPage() {

  const dummyFriendList = useFriendList();
  return (
    <div>
      <h2>My Friends</h2>
      <FriendList friendList={dummyFriendList} />
    </div>
  );
}

function FriendsLayout() {
  return (
    <Outlet />
  );
}

export { FriendsLayout };
export default FriendsPage;
