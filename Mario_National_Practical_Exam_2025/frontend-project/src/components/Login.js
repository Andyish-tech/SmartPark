import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/login', { username, password });
      
      if (response.data.success) {
        setAuth(true);
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-2xl font-bold mb-6 text-center">EPMS Login</h2>
        <h3 className="text-lg mb-6 text-center text-gray-600">SmartPark - Employee Payroll Management System</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          {error && <div className="error-message mt-4">{error}</div>}
        </form>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-600"><strong>Demo Credentials:</strong></p>
          <p className="text-sm text-gray-600">Username: admin</p>
          <p className="text-sm text-gray-600">Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
