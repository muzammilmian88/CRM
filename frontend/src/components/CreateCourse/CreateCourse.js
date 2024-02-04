// CreateCourse.js

import React, { useState } from 'react';
import axios from 'axios';
import './CreateCourse.css'; // Import the CSS file for styling

const CreateCourse = () => {
  const [course, setCourse] = useState({
    name: '',
    title: '',
    image: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/courses/', course);
      console.log('Course created successfully:', response.data);
      setSuccessMessage('Course created successfully!');
      setErrorMessage(''); // Clear any previous error messages
      // Optionally, you can redirect or perform other actions after successful creation
    } catch (error) {
      console.error('Error creating course:', error);
      setErrorMessage('Error creating course. Please try again.');
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  return (
    <div className="container mt-5 form-container">
      <h2 className="text-center">Create a New Course</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Course Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={course.image}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Course Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
