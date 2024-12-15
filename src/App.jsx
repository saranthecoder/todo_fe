import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Todo from './pages/Todo.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/todo" : "/login"} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={user ? <Todo user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
