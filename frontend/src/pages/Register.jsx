import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password, role: 'user' });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/', { state: { email, password } }), 2000);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].message);
      } else {
        setError(err.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Create Account</h2>
        {error && <div className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</div>}
        {success && <div className="mb-4 rounded bg-green-100 p-2 text-sm text-green-700">{success}</div>}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
          minLength={6}
        />
        <button type="submit" className="w-full rounded bg-green-600 p-3 font-semibold text-white transition hover:bg-green-700">
          Register
        </button>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/" className="font-semibold text-blue-600 hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
