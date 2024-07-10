// src/components/FriendsList.js
import React, { useState, useEffect } from 'react';
import FriendCard from './FriendCard';
import FriendModal from './FriendModal';
import './FriendsList.css';
import './FriendsList.scss'; // Import SCSS file

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20); // Assuming we have 500 friends, 25 per page => 20 pages
  const [inputPage, setInputPage] = useState(1);
  const [error, setError] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null); // State for selected friend
  const resultsPerPage = 25;

  const fetchFriends = async (page) => {
    const response = await fetch(`https://randomuser.me/api/?seed=lll&page=${page}&results=${resultsPerPage}`);
    const data = await response.json();
    setFriends(data.results);
    // Assuming the total number of friends is fixed at 500 for this example.
  };

  useEffect(() => {
    fetchFriends(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setInputPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setError('');
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setInputPage((prevPage) => Math.max(prevPage - 1, 1));
    setError('');
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
    setError('');
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      let pageNumber = parseInt(inputPage, 10);
      if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
        setError(`Please enter a valid page number between 1 and ${totalPages}`);
      } else {
        setCurrentPage(pageNumber);
        setError('');
      }
    }
  };

  const handleCardClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseModal = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="friends-list">
      <h2>Friends List</h2>
      <div className="friends-list-cards">
        {friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} onClick={() => handleCardClick(friend)} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
        />
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {selectedFriend && <FriendModal friend={selectedFriend} onClose={handleCloseModal} />}
    </div>
  );
};

export default FriendsList;
