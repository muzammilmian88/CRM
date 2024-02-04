// Update.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Update.css'; // Import your CSS file for styling

export default function UpdateTeacher() {
  const { id } = useParams();
  const [teachers, setteachers] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchteacherDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/teacher/${id}`);
        setteachers(response.data);
       
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };

    fetchteacherDetails();
  }, [id]);

  const getteacherData = (e) => {
    setteachers({ ...teachers, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/teacher/${id}`, teachers);
      console.log('teacher Updated!!:', response.data);
     

      // Display success message
      setSuccessMessage('teacher updated successfully!');

      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccessMessage('');
        navigate(`/all_teachers`);
      }, 2000);
    } catch (error) {
      console.error('Error updating teacher:', error);

      // Display error message
      setErrorMessage('Error updating teacher. Please try again.');

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
              <h2 className='card-title text-center mb-4'>Edit Teacher</h2>

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
                  <input type="text" name="name" className="form-control" value={teachers.name || ''} onChange={getteacherData} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={teachers.email || ''} onChange={getteacherData} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" value={teachers.password || ''} onChange={getteacherData} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
