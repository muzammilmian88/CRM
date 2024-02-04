// Update.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Update.css'; // Import your CSS file for styling

export default function UpdateStudent() {
  const { id } = useParams();
  const [users, setUsers] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/${id}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/student/${id}`, users);
      console.log('User Updated!!:', response.data);
     

      // Display success message
      setSuccessMessage('User updated successfully!');

      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccessMessage('');
        navigate(`/all_students`);
      }, 2000);
    } catch (error) {
      console.error('Error updating user:', error);

      // Display error message
      setErrorMessage('Error updating user. Please try again.');

      // Clear error message after a few seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <div className="card update-card">
            <div className="card-body">
              <h2 className='card-title text-center mb-4'>Edit User</h2>

              <form onSubmit={handleSubmit}>
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
                  <input type="text" name="name" className="form-control" value={users.name || ''} onChange={getUserData} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={users.email || ''} onChange={getUserData} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input type="number" name="age" className="form-control" value={users.age || ''} onChange={getUserData} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
