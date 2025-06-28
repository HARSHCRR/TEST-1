const mongoose = require('mongoose');
const Patient = require('./models/Patient');

const uri = 'mongodb+srv://health:mlkkMzyAN67S2rqD@cluster0.iesysng.mongodb.net/healthchain?retryWrites=true&w=majority&appName=Cluster0';
const hash = 'QmNVfPGoZ3JvLNGjQvLA5Vb5cKXYpV78JaPHQAY6667goz'; // The hash to deduplicate

async function deleteDuplicates() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const patients = await Patient.find({ fingerprintTemplateHash: hash }).sort({ createdAt: -1 });
  if (patients.length > 1) {
    // Keep the most recent, delete the rest
    const idsToDelete = patients.slice(1).map(p => p._id);
    await Patient.deleteMany({ _id: { $in: idsToDelete } });
    console.log(`Deleted ${idsToDelete.length} duplicate patients for hash ${hash}`);
  } else {
    console.log('No duplicates found.');
  }
  await mongoose.disconnect();
}

deleteDuplicates(); 