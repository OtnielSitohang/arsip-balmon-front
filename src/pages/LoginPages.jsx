import ArsipBalmon from '../pages/ArsipBalom'; // App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const LoginPage = ({ setUsername, setPassword, handleLogin }) => (
  <div>
    <h1>Login</h1>
    <label>
      Username:
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <br />
    <label>
      Password:
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <br />
    <button onClick={handleLogin}>Login</button>
  </div>
);


const LoginPages = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setLoggedIn(true);
        console.log(response);
        console.log(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />} />
          {loggedIn ? (
            <Route path="/" element={<Navigate to="/arsip" />} />
            ) : (
              <Route path="/" element={<Navigate to="/" />} />
              )}
          <Route path="/arsip" element={<ArsipBalmon />} />
        </Routes>
      </div>
    </Router>
   );
};

export default LoginPages;
