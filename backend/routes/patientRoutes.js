const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  registerPatient,
  matchPatient,
  getPatientById,
} = require('../controllers/patientController');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
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

// Register a new patient
router.post(
  '/register',
  upload.fields([
    { name: 'fingerprint', maxCount: 1 },
    { name: 'medicalFiles', maxCount: 10 },
  ]),
  registerPatient
);

// Match a fingerprint and return patient data
router.post('/match', matchPatient);

// Get patient info by ID
router.get('/patient/:id', getPatientById);

module.exports = router; 