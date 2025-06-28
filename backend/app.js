require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://health:mlkkMzyAN67S2rqD@cluster0.iesysng.mongodb.net/healthchain?retryWrites=true&w=majority&appName=Cluster0';

// Try to connect to MongoDB, but don't fail if it doesn't work
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Server will continue without MongoDB - using in-memory storage');
  });

// Routes placeholder
app.get('/', (req, res) => {
  res.send('API is running');
});

// Import and use patient routes (to be created)
const patientRoutes = require('./routes/patientRoutes');
app.use('/api', patientRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 