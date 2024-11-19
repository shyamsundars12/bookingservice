const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure this is the correct path for your User model
const router = express.Router();

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey'; // Use environment variable for better security

// Helper function to handle validation errors
const handleValidationError = (res, message) => {
    return res.status(400).json({ success: false, message });
};

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { email, password, fname, lname, contactNo, address } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handleValidationError(res, 'User with this email already exists.');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            fname,
            lname,
            email,
            password: hashedPassword,
            contact_no: contactNo,
            address, // Address should be an object containing all address fields
        });

        // Save the new user in the database
        await newUser.save();

        // Send success response
        res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during sign up:', error);

        // Check if error is a database issue or something else
        if (error.name === 'MongoError' && error.code === 11000) {
            return handleValidationError(res, 'Duplicate email detected.');
        }

        // Detailed error message to frontend
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return handleValidationError(res, 'Email and Password are required!');
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return handleValidationError(res, 'User not found!');
        }

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return handleValidationError(res, 'Incorrect password!');
        }

        // Generate JWT token (valid for 1 hour)
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send success response with the token
        res.status(200).json({ success: true, message: 'Login successful!', token });
    } catch (error) {
        console.error('Error during login:', error);

        // Generic error handling
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.', error: error.message });
    }
});

module.exports = router;
