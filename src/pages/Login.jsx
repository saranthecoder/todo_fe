import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill out all fields!');
      return;
    }

    try {
      // Send login data to the backend
      const response = await axios.post('https://todo-backend-9fno.onrender.com/api/loginUser', {
        email,
        password,
      });

      if (response.status === 200) {

        // When storing user data
        localStorage.setItem('userId', JSON.stringify(response.data.user._id));
        // Set user data from backend response
        setUser({ email: response.data.email, username: response.data.username });
        alert('Login successful!');
        navigate('/todo');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert('Login failed: Unable to connect to the server.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
