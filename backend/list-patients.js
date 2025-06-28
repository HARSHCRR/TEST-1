const mongoose = require('mongoose');

const uri = 'mongodb+srv://health:mlkkMzyAN67S2rqD@cluster0.iesysng.mongodb.net/healthchain?retryWrites=true&w=majority&appName=Cluster0';
const Patient = require('./models/Patient');

async function listPatients() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const patients = await Patient.find({}, { name: 1, fingerprintTemplateHash: 1, _id: 0 });
  console.log('Patients and their fingerprint hashes:');
  patients.forEach(p => console.log(`${p.name}: ${p.fingerprintTemplateHash}`));
  await mongoose.disconnect();
}

listPatients(); 