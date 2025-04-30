import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated,setIsAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.username, formData.password);
      setIsAuthenticated(true);
      console.log(isAuthenticated);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className=' h-screen  bg-yellow-200 flex flex-col justify-center'>
    <div className="max-w-md mx-auto  rounded-lg shadow-md p-8  bg-white ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to ChatApp</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <Link to="/register" className="text-sm text-sky-600 hover:text-sky-500">
            Don't have an account? Register
          </Link>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;