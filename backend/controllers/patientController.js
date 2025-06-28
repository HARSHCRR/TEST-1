// Placeholder controller for patient endpoints

const Patient = require('../models/Patient');
const { uploadFileToIPFS } = require('../services/pinataService');
const fs = require('fs');
const path = require('path');

// In-memory storage fallback
let inMemoryPatients = [];
let patientIdCounter = 1;

// Helper to remove temp files
const removeFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error('Failed to remove file:', filePath, err);
  });
};

const registerPatient = async (req, res) => {
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

    // Upload fingerprint template to IPFS
    const fingerprintPath = req.files.fingerprint[0].path;
    const fingerprintTemplateHash = await uploadFileToIPFS(fingerprintPath);
    removeFile(fingerprintPath);

    // Upload medical files to IPFS
    let medicalRecords = [];
    if (req.files.medicalFiles) {
      for (const file of req.files.medicalFiles) {
        const hash = await uploadFileToIPFS(file.path);
        medicalRecords.push(hash);
        removeFile(file.path);
      }
    }

    // Try to save to MongoDB first, fallback to in-memory
    let patientId;
    let patientData;
    
    try {
    const patient = new Patient({
      name,
        age: parseInt(age),
        gender,
        aadhar,
        bloodType,
        allergies,
      emergencyContact: `${emergencyContactName} (${emergencyContactRelation}): ${emergencyContactNumber}`,
      fingerprintTemplateHash,
      medicalRecords,
    });
      
    await patient.save();
      patientId = patient._id;
      patientData = {
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        aadhar: patient.aadhar,
        bloodType: patient.bloodType,
        allergies: patient.allergies,
        emergencyContact: patient.emergencyContact
      };
      console.log('Patient saved to MongoDB successfully');
    } catch (dbError) {
      console.log('MongoDB save failed, using in-memory storage:', dbError.message);
      
      // Use in-memory storage
      patientId = `mem-${patientIdCounter++}`;
      patientData = {
        name,
        age: parseInt(age),
        gender,
        aadhar,
        bloodType,
        allergies,
        emergencyContact: `${emergencyContactName} (${emergencyContactRelation}): ${emergencyContactNumber}`
      };
      
      inMemoryPatients.push({
        _id: patientId,
        ...patientData,
        fingerprintTemplateHash,
        medicalRecords,
        createdAt: new Date()
      });
      console.log('Patient saved to in-memory storage');
    }

    res.status(201).json({ 
      message: 'Patient registered successfully', 
      patientId: patientId,
      patient: patientData
    });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const matchPatient = async (req, res) => {
  try {
    const { fingerprintTemplate } = req.body;
    if (!fingerprintTemplate) {
      return res.status(400).json({ message: 'fingerprintTemplate is required' });
    }

    // Return the most recently registered patient with the matching hash
    const patient = await Patient.findOne({ fingerprintTemplateHash: fingerprintTemplate }).sort({ createdAt: -1 });
    if (!patient) {
      return res.status(404).json({ message: 'No matching patient found' });
    }

    res.json({
      patientId: patient._id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      aadhar: patient.aadhar,
      bloodType: patient.bloodType,
      allergies: patient.allergies,
      emergencyContact: patient.emergencyContact,
      medicalRecords: patient.medicalRecords,
      fingerprintTemplateHash: patient.fingerprintTemplateHash,
    });
  } catch (error) {
    console.error('Error matching patient:', error);
    res.status(500).json({ message: 'Matching failed', error: error.message });
  }
};

const getPatientById = async (req, res) => {
  // To be implemented: fetch patient by ID
  res.status(501).json({ message: 'Not implemented' });
};

module.exports = {
  registerPatient,
  matchPatient,
  getPatientById,
}; 