// src/components/FriendModal.js
import React from 'react';
import './FriendModal.css';

const FriendModal = ({ friend, onClose }) => {
  if (!friend) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <img src={friend.picture.large} alt={`${friend.name.first} ${friend.name.last}`} />
        {/* <h2>{friend.name.first} {friend.name.last}</h2> */}
        <p>First Name: {friend.name.first}</p>
        <p>Last Name: {friend.name.last}</p>
        <p>Email: {friend.email}</p>
        <p>D.O.B: {new Date(friend.dob.date).toLocaleDateString()}</p>
        <p>Address: {friend.location.street.number} {friend.location.street.name}, {friend.location.city}, {friend.location.state}, {friend.location.country}</p>
        <p>Phone Number: {friend.phone}</p>
      </div>
    </div>
  );
};

export default FriendModal;
