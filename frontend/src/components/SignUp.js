import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Create.css';

export default function SignUp() {
  const [emp, setEmp] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getEmpData = (e) => {
    const { name, value } = e.target;
  
    setEmp(prevEmp => {
      if (name === 'email' && !isValidEmail(value)) {
        setErrorMessage('Invalid email format');
        return { ...prevEmp, [name]: value };
      } else if (name === 'password' && value.length < 4) {
        setErrorMessage('Password must be at least 6 characters long');
        return { ...prevEmp, [name]: value };
      } else {
        setErrorMessage('');
        return { ...prevEmp, [name]: value };
      }
    });
  };

  const isValidEmail = (email) => {
    // Check for the presence of "@" and "."
    return email.includes('@') && email.includes('.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emp.name || !emp.email || !emp.password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', emp);
      console.log('Emp registered!!:', response.data);

      setEmp({});
      setSuccessMessage('Employee registered successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.log('Error while registering emp:', error);

      setErrorMessage('Error registering employee. Please try again.');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h2 className="text-center">Register</h2>
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
              <label className="form-label">Name</label>
              <input type="name" name="name" className="form-control" value={emp.name || ''} onChange={getEmpData} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={emp.email || ''} onChange={getEmpData} />
            </div>
            <div className="mb-3">
  <label className="form-label">Password</label>
  <input
    type="password"
    name="password" 
    className="form-control"
    value={emp.password || ''}
    onChange={getEmpData}
  />
</div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <Link to="/" className='mx-2'>Login?</Link>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}
