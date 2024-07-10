// src/components/Login.js
import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './Login.css';
import { fetchUserData } from '../api';

const salt = 'random_salt_value'; // In a real-world app, use a more secure salt strategy.

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const user = await fetchUserData();
      const hashedPassword = CryptoJS.SHA256(user.login.password + salt).toString();
      setStoredUser({
        username: user.login.username,
        passwordHash: hashedPassword,
      });
    };
    getUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storedUser) return;
    const inputPasswordHash = CryptoJS.SHA256(password + salt).toString();
    if (username === storedUser.username && inputPasswordHash === storedUser.passwordHash) {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div class="text-center">
							<br />
							<h4>Sample Login</h4>
							<p><b>Username -</b> beautifultiger295<br/><b>Password - </b>selena</p>
				</div>
      </form>
    </div>
  );
};

export default Login;
