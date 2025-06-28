const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testPatientRegistration() {
  try {
    console.log('Testing patient registration...');
    
    // Create form data
    const formData = new FormData();
    
    // Add patient information
    formData.append('name', 'John Doe');
    formData.append('age', '30');
    formData.append('gender', 'Male');
    formData.append('aadhar', '123456789012');
    formData.append('bloodType', 'O+');
    formData.append('allergies', 'None');
    formData.append('emergencyContactName', 'Jane Doe');
    formData.append('emergencyContactRelation', 'Spouse');
    formData.append('emergencyContactNumber', '9876543210');
    
    // Add test files
    const fingerprintPath = path.join(__dirname, 'test-fingerprint.txt');
    const medicalFilePath = path.join(__dirname, 'test-medical-file1.txt');
    
    if (fs.existsSync(fingerprintPath)) {
      formData.append('fingerprint', fs.createReadStream(fingerprintPath));
    } else {
      console.log('Creating test fingerprint file...');
      fs.writeFileSync(fingerprintPath, 'Test fingerprint data');
      formData.append('fingerprint', fs.createReadStream(fingerprintPath));
    }
    
    if (fs.existsSync(medicalFilePath)) {
      formData.append('medicalFiles', fs.createReadStream(medicalFilePath));
    } else {
      console.log('Creating test medical file...');
      fs.writeFileSync(medicalFilePath, 'Test medical record data');
      formData.append('medicalFiles', fs.createReadStream(medicalFilePath));
    }
    
    // Make the request
    const response = await axios.post('http://localhost:5050/api/register', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 30000,
    });
    
    console.log('Registration successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('Registration failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running?');
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testPatientRegistration(); 