const express = require('express');
const router = express.Router();
const CourseModel = require('../models/courseModel'); 

// Create a new course
router.post('/courses/', async (req, res) => {
  try {
    const newCourse = await CourseModel.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific course by ID
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course by ID
router.patch('/courses/:id', async (req, res) => {
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course by ID
router.delete('/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await CourseModel.findByIdAndRemove(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(deletedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
