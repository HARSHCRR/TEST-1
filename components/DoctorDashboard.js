import { useState } from 'react';
import { useHealthChain } from '../hooks/useHealthChain';

export default function DoctorDashboard() {
    const [fingerprint, setFingerprint] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [records, setRecords] = useState([]);
    const [matchedPatient, setMatchedPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const { loading: hcLoading, error, uploadMedicalRecord, getRecords, logAccess } = useHealthChain();

    const handleUpload = async () => {
        try {
            await uploadMedicalRecord(fingerprint, ipfsHash);
            alert('Record uploaded successfully!');
            setIpfsHash('');
        } catch (err) {
            alert(`Error uploading record: ${err.message}`);
        }
    };

    const handleFetchRecords = async () => {
        try {
            const fetchedRecords = await getRecords(fingerprint);
            setRecords(fetchedRecords);
            await logAccess(fingerprint);
        } catch (err) {
            alert(`Error fetching records: ${err.message}`);
        }
    };

    // --- New: Scan New Patient Handler ---
    async function handleScanNewPatient() {
        setLoading(true);
        // For now, use a known hash for simulation (replace with real scan on Windows)
        const fingerprintTemplate = 'QmQCJVpnMAf7P5J1aHacApuZR1XsV7h177tKb3AK3yPibU';
        try {
            const res = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fingerprintTemplate }),
            });
            if (res.ok) {
                const data = await res.json();
                setMatchedPatient(data);
            } else {
                setMatchedPatient(null);
                alert('No matching patient found!');
            }
        } catch (err) {
            setMatchedPatient(null);
            alert('Error connecting to backend');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>
            
            <div className="mb-6">
                <button
                    onClick={handleScanNewPatient}
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Scanning...' : 'Scan New Patient'}
                </button>
            </div>

            {/* --- Show matched patient data if found --- */}
            {matchedPatient && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Patient: {matchedPatient.name}</h2>
                    <div className="mb-2">Age: {matchedPatient.age} &nbsp; | &nbsp; Gender: {matchedPatient.gender} &nbsp; | &nbsp; Blood Type: {matchedPatient.bloodType}</div>
                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400">
                        <strong>Emergency Contact</strong><br />
                        {matchedPatient.emergencyContact}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold mb-2">Medical Records</h3>
                            {matchedPatient.medicalRecords && matchedPatient.medicalRecords.length > 0 ? (
                                <ul>
                                    {matchedPatient.medicalRecords.map((hash, idx) => (
                                        <li key={hash} className="mb-2">
                                            <a
                                                href={`https://gateway.pinata.cloud/ipfs/${hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                View Report {idx + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div>No medical records found.</div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Allergies</h3>
                            <div>{matchedPatient.allergies || 'None'}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Existing upload/fetch UI below --- */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Upload Medical Record</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Patient Fingerprint</label>
                            <input
                                type="text"
                                value={fingerprint}
                                onChange={(e) => setFingerprint(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter patient fingerprint"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">IPFS Hash</label>
                            <input
                                type="text"
                                value={ipfsHash}
                                onChange={(e) => setIpfsHash(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter IPFS hash"
                            />
                        </div>
                        <button
                            onClick={handleUpload}
                            disabled={hcLoading || !fingerprint || !ipfsHash}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {hcLoading ? 'Uploading...' : 'Upload Record'}
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Fetch Records</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Patient Fingerprint</label>
                            <input
                                type="text"
                                value={fingerprint}
                                onChange={(e) => setFingerprint(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter patient fingerprint"
                            />
                        </div>
                        <button
                            onClick={handleFetchRecords}
                            disabled={hcLoading || !fingerprint}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {hcLoading ? 'Fetching...' : 'Fetch Records'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {records.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Medical Records</h2>
                        <div className="space-y-4">
                            {records.map((record, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <p className="text-sm text-gray-600">IPFS Hash: {record.ipfsHash}</p>
                                    <p className="text-sm text-gray-600">Doctor: {record.doctor}</p>
                                    <p className="text-sm text-gray-600">
                                        Timestamp: {new Date(Number(record.timestamp) * 1000).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 