import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register button clicked'); // Debugging log
    // Add registration logic here
    onRegister(username); // Call the onRegister function with the username
    alert('Welcome to Muhammad Abd Elfattah JavaScript Back-end Capstone Project!');
    history.push('/'); // Navigate to the main page after registration
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
