const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');  // Make sure this path is correct
const app = express();

// Load environment variables
dotenv.config();

// Middleware setup
app.use(cors());  // Enable Cross-Origin Request Sharing (CORS)
app.use(bodyParser.json());  // Parse JSON request bodies

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit the app if MongoDB connection fails
  });

// Use the authentication routes (signup, login)
app.use('/api/auth', authRoutes);

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
