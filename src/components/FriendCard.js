// src/components/FriendCard.js
import React from 'react';
import './FriendCard.css';

const FriendCard = ({ friend, onClick }) => {
  return (
    <div className="friend-card" onClick={onClick}>
      <img src={friend.picture.large} alt={`${friend.name.first} ${friend.name.last}`} />
      <div className="friend-card-details">
        {/* <h3>{friend.name.first} {friend.name.last}</h3> */}
        <p>First Name: {friend.name.first}</p>
        <p>Last Name: {friend.name.last}</p>
        <p>Email: {friend.email}</p>
        <p>Phone Number: {friend.phone}</p>
      </div>
    </div>
  );
};

export default FriendCard;
