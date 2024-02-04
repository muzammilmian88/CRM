const express = require('express');
const jwt = require('jsonwebtoken');
const employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const empAdded = await employee.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json(empAdded);
    console.log('Employee registered successfully');
  } catch (error) {
    console.error('Error while registering employee');
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await employee.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    // Generate JWT token
    const token = generateJWTToken(user);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login');
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all teachers
router.get('/all_teachers', async (req, res) => {
  try {
    const allTeachers = await employee.find();
    res.status(200).json(allTeachers);
    console.log('All teachers fetched successfully');
  } catch (error) {
    console.log('Error while getting all teachers');
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
//get single teacher
router.get('/teacher/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await employee.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
    console.log('Teacher details fetched successfully');
  } catch (error) {
    console.log('Error while getting teacher details');
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Update teacher by ID
router.patch('/teacher/:id', async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedTeacher = await employee.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatedTeacher);
    console.log('Teacher updated successfully');
  } catch (error) {
    console.log('Error while updating teacher');
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete teacher by ID
router.delete('/teacher/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await employee.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
    console.log('Teacher deleted successfully');
  } catch (error) {
    console.log('Error while deleting teacher');
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to generate JWT token
function generateJWTToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    // Add any other user-related information you want to include in the token payload
  };

  // Sign the token with your secret key
  const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });

  return token;
}

module.exports = router;
