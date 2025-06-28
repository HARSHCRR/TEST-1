require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes placeholder
app.get('/', (req, res) => {
  res.send('API is running');
});

// Simple patient registration without MongoDB
app.post('/api/register', upload.fields([
  { name: 'fingerprint', maxCount: 1 },
  { name: 'medicalFiles', maxCount: 10 },
]), (req, res) => {
  try {
    console.log('registerPatient req.body:', req.body);
    console.log('registerPatient req.files:', req.files);
    
    // Extract patient info from form fields
    const {
      name,
      age,
      gender,
      aadhar,
      bloodType,
      allergies,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactNumber,
    } = req.body;

    // Validate required fields
    if (!name || !age || !gender || !aadhar || !bloodType || !allergies) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, age, gender, aadhar, bloodType, allergies are required.' 
      });
    }

    // Check for fingerprint file
    if (!req.files || !req.files.fingerprint) {
      return res.status(400).json({ message: 'Fingerprint file is required.' });
    }

    // Clean up uploaded files
    if (req.files.fingerprint) {
      fs.unlink(req.files.fingerprint[0].path, (err) => {
        if (err) console.error('Failed to remove file:', req.files.fingerprint[0].path, err);
      });
    }
    if (req.files.medicalFiles) {
      req.files.medicalFiles.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Failed to remove file:', file.path, err);
        });
      });
    }

    res.status(201).json({ 
      message: 'Patient registered successfully', 
      patientId: 'test-id-' + Date.now(),
      patient: {
        name,
        age: parseInt(age),
        gender,
        aadhar,
        bloodType,
        allergies,
        emergencyContact: `${emergencyContactName} (${emergencyContactRelation}): ${emergencyContactNumber}`
      }
    });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 