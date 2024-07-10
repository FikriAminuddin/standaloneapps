// src/App.js
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import FriendsList from './components/FriendsList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <FriendsList /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
