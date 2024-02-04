import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Create.css';
import './Login.css';

export default function Login() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when submitting
      const response = await axios.post('http://localhost:5000/login', user);
      console.log('Login successful!:', response.data);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('isLogin', true);

      // Clear form fields after successful login
      setUser({});

      // Display success message
      setSuccessMessage('Login successful! Redirecting to all page...');

      // Redirect to the desired page after login
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/all_students');
      }, 2000);
    } catch (error) {
      console.log('Error during login:', error);

      // Display error message
      setErrorMessage('Invalid credentials. Please try again.');

      // Clear error message after a few seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit} className="custom-form">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                required
                className="form-control"
                value={user.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                required
                className="form-control"
                value={user.password || ''}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
            <Link to="/register" className='mx-2'>   Register?</Link>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}
