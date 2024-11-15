const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const { getDb } = require('../utils/connectDb'); // Import your custom DB methods

dotenv.config();

// Import the authentication middleware
const authenticateToken = require('../middleware/authMiddleware');

// Signup route
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const db = await getDb(); // Get the MongoDB client
      const usersCollection = db.db('sumit').collection('users'); // Access the 'users' collection

      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user object
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      // Insert new user into the 'users' collection
      await usersCollection.insertOne(newUser);

      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const db = await getDb(); // Get the MongoDB client
      const usersCollection = db.db('sumit').collection('users'); // Access the 'users' collection

      // Find the user from the MongoDB users collection
      const user = await usersCollection.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ email, fullName: user.name }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  }
);

// Protected route example (user profile)
router.get('/profile', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to your profile', user: req.user });
});

module.exports = router;
