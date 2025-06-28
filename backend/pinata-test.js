const PinataClient = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');

const pinata = new PinataClient({
  pinataApiKey: '9f697ab88cb349658e7c',
  pinataSecretApiKey: '70f6f2eb98a58380fcb215a80afe0495db3f99c81251592d519cc787632594ab',
});

async function testPinataUpload() {
  try {
    const testFilePath = path.join(__dirname, 'test-fingerprint.txt');
    if (!fs.existsSync(testFilePath)) {
      fs.writeFileSync(testFilePath, 'Pinata test file');
    }
    const readableStream = fs.createReadStream(testFilePath);
    const fileName = path.basename(testFilePath);
    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: fileName
      }
    });
    console.log('Pinata upload successful! IPFS Hash:', result.IpfsHash);
  } catch (error) {
    console.error('Pinata upload failed:', error);
  }
}

testPinataUpload(); 