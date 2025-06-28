const PinataClient = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');

const pinata = new PinataClient({
  pinataApiKey: process.env.PINATA_API_KEY || '9f697ab88cb349658e7c',
  pinataSecretApiKey: process.env.PINATA_API_SECRET || '70f6f2eb98a58380fcb215a80afe0495db3f99c81251592d519cc787632594ab',
});

async function uploadFileToIPFS(filePath) {
  try {
    console.log('=== PINATA UPLOAD DEBUG ===');
    console.log('Uploading file to IPFS:', filePath);
    console.log('File exists:', fs.existsSync(filePath));
    console.log('File stats:', fs.statSync(filePath));
    
    const readableStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    
    console.log('File name:', fileName);
    console.log('Pinata API Key:', process.env.PINATA_API_KEY || '9f697ab88cb349658e7c');
    console.log('Pinata Secret Key:', process.env.PINATA_API_SECRET ? '***' : '70f6f2eb98a58380fcb215a80afe0495db3f99c81251592d519cc787632594ab');
    
    // Try with metadata
    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: fileName,
        keyvalues: {
          type: 'medical-record',
          uploadedAt: new Date().toISOString()
        }
      }
    });
    
    console.log('IPFS upload successful:', result);
    console.log('=== END PINATA DEBUG ===');
    return result.IpfsHash;
  } catch (error) {
    console.error('=== PINATA ERROR DEBUG ===');
    console.error('Pinata upload error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('=== END PINATA ERROR DEBUG ===');
    throw new Error('Failed to upload file to IPFS: ' + error.message);
  }
}

module.exports = {
  uploadFileToIPFS,
}; 