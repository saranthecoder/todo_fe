import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert('Please fill out all fields!');
      return;
    }

    try {
        // Send signup data to the backend
        const response = await axios.post('http://localhost:3000/api/signupUser', {
            username,
            email,
            password,
        });
        
        console.log(response)
      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response) {
        alert(`Signup failed: ${error.response.data.message}`);
      } else {
        alert('Signup failed: Unable to connect to the server.');
      }
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
