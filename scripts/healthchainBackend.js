require('dotenv').config();
const { ethers } = require('ethers');
const crypto = require('crypto');

// Contract ABI - This will be generated after contract compilation
const contractABI = [
    "function uploadRecord(bytes32 patientId, string memory ipfsHash) external",
    "function logAccess(bytes32 patientId) external",
    "function getRecords(bytes32 patientId) external view returns (tuple(string ipfsHash, address doctor, uint256 timestamp)[])",
    "function getAccessLogs(bytes32 patientId) external view returns (tuple(address doctor, uint256 timestamp)[])"
];

// Initialize provider and signer
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_MUMBAI_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

// Helper function to generate patientId from fingerprint
function generatePatientId(fingerprint) {
    return crypto.createHash('sha256').update(fingerprint).digest('hex');
}

// Upload a medical record
async function uploadRecord(fingerprint, ipfsHash) {
    try {
        const patientId = generatePatientId(fingerprint);
        const tx = await contract.uploadRecord(patientId, ipfsHash);
        await tx.wait();
        console.log('Record uploaded successfully');
        return tx.hash;
    } catch (error) {
        console.error('Error uploading record:', error);
        throw error;
    }
}

// Log access to patient records
async function logAccess(fingerprint) {
    try {
        const patientId = generatePatientId(fingerprint);
        const tx = await contract.logAccess(patientId);
        await tx.wait();
        console.log('Access logged successfully');
        return tx.hash;
    } catch (error) {
        console.error('Error logging access:', error);
        throw error;
    }
}

// Get patient records
async function getRecords(fingerprint) {
    try {
        const patientId = generatePatientId(fingerprint);
        const records = await contract.getRecords(patientId);
        return records;
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
    }
}

// Get access logs
async function getAccessLogs(fingerprint) {
    try {
        const patientId = generatePatientId(fingerprint);
        const logs = await contract.getAccessLogs(patientId);
        return logs;
    } catch (error) {
        console.error('Error fetching access logs:', error);
        throw error;
    }
}

module.exports = {
    uploadRecord,
    logAccess,
    getRecords,
    getAccessLogs
}; 