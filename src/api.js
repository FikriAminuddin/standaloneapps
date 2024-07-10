// src/api.js
export const fetchUserData = async () => {
    const response = await fetch('https://randomuser.me/api/?seed=lll');
    const data = await response.json();
    return data.results[0];
  };
  