"use client";

import { useState } from "react";
import { patients, Patient, MedicalRecord } from "@/data/patients";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fingerprint scan
  const handleFingerprintScan = async (fingerprintId: string) => {
    const patient = patients.find(p => p.fingerprintId === fingerprintId);
    setSelectedPatient(patient || null);
    if (patient) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{
              role: "user",
              content: "Please provide a summary of this patient's medical history and any important points to note."
            }],
            patientData: patient
          }),
        });

        if (!response.ok) throw new Error('Failed to get AI response');
        
        const aiMessage = await response.json();
        // Clear previous chat when switching patients
        setChatMessages([aiMessage]);
      } catch (error) {
        console.error('Error getting AI summary:', error);
        setChatMessages([{
          role: "assistant",
          content: `Patient Summary for ${patient.name}:\n` +
            `- Age: ${patient.age}, Gender: ${patient.gender}\n` +
            `- Blood Type: ${patient.bloodType}\n` +
            `- Allergies: ${patient.allergies.join(", ")}\n` +
            `- Recent visits: ${patient.medicalHistory.generalReports[0]?.date || "None"}`
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage],
          patientData: selectedPatient, // This can be null if no patient is selected
          isGeneralQuery: !selectedPatient // Add flag to indicate if this is a general medical query
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      
      const aiMessage = await response.json();
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const RecordList = ({ title, records }: { title: string; records: MedicalRecord[] }) => {
    const [selectedReport, setSelectedReport] = useState<MedicalRecord | null>(null);

    const handleViewReport = (report: MedicalRecord) => {
      setSelectedReport(report);
    };

    const handleCloseReport = () => {
      setSelectedReport(null);
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        {records.length === 0 ? (
          <p className="text-gray-500">No records available</p>
        ) : (
          <div className="space-y-2">
            {records.map((record, index) => (
              <div key={index} className="border p-3 rounded hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium block">{record.type}</span>
                    <span className="text-sm text-gray-500 block">{record.date}</span>
                    <p className="text-sm mt-1">{record.result}</p>
                    <p className="text-sm text-gray-600">Doctor: {record.doctor}</p>
                  </div>
                  {record.attachmentUrl && (
                    <Button
                      onClick={() => handleViewReport(record)}
                      variant="outline"
                      size="sm"
                      className="ml-2"
                    >
                      View Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Report Viewer Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{selectedReport.type}</h3>
                  <p className="text-sm text-gray-500">
                    Date: {selectedReport.date} | Doctor: {selectedReport.doctor}
                  </p>
                </div>
                <Button
                  onClick={handleCloseReport}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
              <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">
                {selectedReport.attachmentUrl && (
                  <div className="relative w-full h-[600px]">
                    <Image
                      src={selectedReport.attachmentUrl}
                      alt={`${selectedReport.type} Report`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <h4 className="font-medium">Report Details:</h4>
                  <p className="text-sm mt-1">{selectedReport.description}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Result: </span>
                    {selectedReport.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Function to scan fingerprint using local HTTP service
  async function scanFingerprint() {
    try {
      const res = await fetch('http://localhost:8000/capture');
      if (!res.ok) throw new Error('Sensor service not available');
      const data = await res.json();
      if (!data.template) throw new Error('No fingerprint template returned');
      return data.template;
    } catch (err) {
      alert('Fingerprint sensor not available or not running. Please start the Mantra HTTP service.');
      throw err;
    }
  }

  const handleScanNewPatient = async () => {
    try {
      // Use the real fingerprint scan
      const fingerprintTemplate = await scanFingerprint();
      const res = await fetch('http://localhost:5050/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprintTemplate }),
      });
      if (res.ok) {
        const data = await res.json();
        // Parse emergencyContact string to object
        let emergencyContactObj = { name: '', relation: '', phone: '' };
        if (typeof data.emergencyContact === 'string') {
          const match = data.emergencyContact.match(/^(.*?) \((.*?)\): (.*)$/);
          if (match) {
            emergencyContactObj = {
              name: match[1],
              relation: match[2],
              phone: match[3],
            };
          }
        }
        const generalReports = (data.medicalRecords || []).map((hash: string, idx: number) => ({
          date: '',
          type: 'IPFS Medical Record',
          description: 'Uploaded medical file',
          result: '',
          doctor: '',
          attachmentUrl: `https://gateway.pinata.cloud/ipfs/${hash}`,
        }));
        setSelectedPatient({
          name: data.name,
          age: data.age,
          gender: data.gender,
          bloodType: data.bloodType,
          allergies: data.allergies ? data.allergies.split(',').map((a: string) => a.trim()) : [],
          emergencyContact: emergencyContactObj,
          medicalHistory: {
            bloodReports: [],
            xrays: [],
            ecgReports: [],
            mriReports: [],
            ctScanReports: [],
            generalReports,
          },
          fingerprintId: data.fingerprintTemplateHash,
          id: data.patientId,
        });
        setChatMessages([]); // Optionally clear chat
      } else {
        setSelectedPatient(null);
        alert('No matching patient found!');
  }
    } catch (err) {
      setSelectedPatient(null);
      // Error already alerted in scanFingerprint
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <div className="flex gap-2">
            <Button
              onClick={handleScanNewPatient}
              variant="default"
              className="font-semibold"
            >
              Scan New Patient
            </Button>
            {patients.map(patient => (
              <Button
                key={patient.fingerprintId}
                onClick={() => handleFingerprintScan(patient.fingerprintId)}
                variant="outline"
                disabled={isLoading}
              >
                Scan {patient.name}&apos;s Fingerprint
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 grid grid-cols-4 gap-6">
        {/* Left Column - AI Chat */}
        <div className="col-span-1 bg-white rounded-lg shadow p-4 h-[calc(100vh-12rem)] mr-10">
          <h2 className="text-lg font-semibold mb-4">AI Assistant</h2>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto mb-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    message.role === "assistant"
                      ? "bg-blue-100 ml-4"
                      : "bg-gray-100 mr-4"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-100 ml-4 p-2 rounded animate-pulse">
                  AI is thinking...
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="mt-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={selectedPatient ? "Ask about patient data..." : "Ask any medical question..."}
                  className="flex-1 p-2 border rounded"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Columns - Medical Records */}
        <div className="col-span-3 space-y-6">
          {selectedPatient ? (
            <>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">
                  Patient: {selectedPatient.name}
                </h2>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>Age: {selectedPatient.age}</div>
                  <div>Gender: {selectedPatient.gender}</div>
                  <div>Blood Type: {selectedPatient.bloodType}</div>
                </div>
              </div>
              {/* Emergency Contact Section */}
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow flex items-center gap-6 my-2">
                <div>
                  <h3 className="text-lg font-semibold text-red-700 mb-1">Emergency Contact</h3>
                  <div className="text-sm text-gray-700">
                    <div><span className="font-medium">Name:</span> {selectedPatient.emergencyContact.name}</div>
                    <div><span className="font-medium">Relation:</span> {selectedPatient.emergencyContact.relation}</div>
                    <div><span className="font-medium">Phone:</span> {selectedPatient.emergencyContact.phone}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <RecordList
                  title="Blood Reports"
                  records={selectedPatient.medicalHistory.bloodReports}
                />
                <RecordList
                  title="X-Ray Reports"
                  records={selectedPatient.medicalHistory.xrays}
                />
                <RecordList
                  title="ECG Reports"
                  records={selectedPatient.medicalHistory.ecgReports}
                />
                <RecordList
                  title="General Reports"
                  records={selectedPatient.medicalHistory.generalReports}
                />
                <RecordList
                  title="MRI Reports"
                  records={selectedPatient.medicalHistory.mriReports}
                />
                <RecordList
                  title="CT Scan Reports"
                  records={selectedPatient.medicalHistory.ctScanReports}
                />
              </div>
            </>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold text-gray-600">
                Please scan a patient&apos;s fingerprint to view their medical records
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 