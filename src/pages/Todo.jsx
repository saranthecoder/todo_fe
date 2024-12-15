import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Todo.css'

const Todo = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('userId'));
  // Fetch todos for the user on component mount
  useEffect(() => {
    const fetchTodos = async () => {
        // Get user data from localStorage

        console.log(userId);

      try {
        const response = await axios.post(`https://todo-backend-9fno.onrender.com/api/getData`,{ userId: userId },);
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

      fetchTodos();
  }, [userId]);
  

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim()) {
      const user = JSON.parse(localStorage.getItem('userId'));
      console.log(user);

      try {
        const response = await axios.post(`https://todo-backend-9fno.onrender.com/api/add`,{userId:user,data:newTodo});
        console.log(response)
        setTodos(response.data.todos);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Edit a todo
  const editTodo = async (todoId, updatedData) => {
    try {
      const response = await axios.put(
        `http://your-backend-api/users/${user.id}/todos/${todoId}`,
        { data: updatedData },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(
        `http://your-backend-api/users/${user.id}/todos/${todoId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Mark a todo as completed
  const completeTodo = async (todoId) => {
    try {
      const response = await axios.patch(
        `http://your-backend-api/users/${user.id}/todos/${todoId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>TODO List</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={logout}>Logout</button>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => completeTodo(todo._id)}>{todo.data}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            <button
              onClick={() => {
                const updatedData = prompt('Edit your task:', todo.data);
                if (updatedData) editTodo(todo._id, updatedData);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
