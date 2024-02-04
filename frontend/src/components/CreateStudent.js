import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css'; // Import your CSS file for styling

export default function CreateStudent() {
  const [users, setUsers] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/student/', users);
      console.log('User Added!!:', response.data);

      // Clear form fields after successful submission
      setUsers({});
     
      
      // Display success message
      setSuccessMessage('User added successfully!');
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/all_students');
      }, 3000);
    } catch (error) {
      console.log('Error while adding user!!:', error);
      
      // Display error message
      setErrorMessage('Error adding user. Please try again.');
      
      // Clear error message after a few seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  return (
    <div className="container mt-5">
     
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <h2 className='text-center'>Create Student</h2>
          <form onSubmit={handleSubmit} className="custom-form">
            {successMessage && (<div className="alert alert-success" role="alert">  {successMessage} </div> )}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="name" name="name" className="form-control" value={users.name || ''} onChange={getUserData} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={users.email || ''} onChange={getUserData} />
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input type="age" name="age" className="form-control" value={users.age || ''} onChange={getUserData} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}
