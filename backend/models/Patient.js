const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  aadhar: { type: String, required: true },
  bloodType: { type: String, required: true },
  allergies: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  fingerprintTemplateHash: { type: String, required: true }, // IPFS hash
  medicalRecords: [{ type: String }], // Array of IPFS hashes
}, {
  timestamps: true,
});

module.exports = mongoose.model('Patient', PatientSchema); 