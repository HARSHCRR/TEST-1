import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

// Contract ABI - This will be generated after contract compilation
const contractABI = [
    "function uploadRecord(bytes32 patientId, string memory ipfsHash) external",
    "function logAccess(bytes32 patientId) external",
    "function getRecords(bytes32 patientId) external view returns (tuple(string ipfsHash, address doctor, uint256 timestamp)[])",
    "function getAccessLogs(bytes32 patientId) external view returns (tuple(address doctor, uint256 timestamp)[])"
];

export const useHealthChain = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getContract = useCallback(async () => {
        if (!window.ethereum) {
            throw new Error('Please install MetaMask to use this feature');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, contractABI, signer);
    }, []);

    const generatePatientId = useCallback((fingerprint) => {
        return ethers.keccak256(ethers.toUtf8Bytes(fingerprint));
    }, []);

    const uploadMedicalRecord = useCallback(async (fingerprint, ipfsHash) => {
        try {
            setLoading(true);
            setError(null);
            
            const contract = await getContract();
            const patientId = generatePatientId(fingerprint);
            
            const tx = await contract.uploadRecord(patientId, ipfsHash);
            await tx.wait();
            
            return tx.hash;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getContract, generatePatientId]);

    const getRecords = useCallback(async (fingerprint) => {
        try {
            setLoading(true);
            setError(null);
            
            const contract = await getContract();
            const patientId = generatePatientId(fingerprint);
            
            const records = await contract.getRecords(patientId);
            return records;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getContract, generatePatientId]);

    const logAccess = useCallback(async (fingerprint) => {
        try {
            setLoading(true);
            setError(null);
            
            const contract = await getContract();
            const patientId = generatePatientId(fingerprint);
            
            const tx = await contract.logAccess(patientId);
            await tx.wait();
            
            return tx.hash;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getContract, generatePatientId]);

    return {
        loading,
        error,
        uploadMedicalRecord,
        getRecords,
        logAccess
    };
}; 