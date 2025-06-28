"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface MedicalFile {
  type: string;
  file: File;
  description: string;
}

export default function PatientSignup() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    aadhar: "",
    bloodType: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactNumber: "",
  });

  const [medicalFiles, setMedicalFiles] = useState<MedicalFile[]>([]);
  const [isFingerprintScanned, setIsFingerprintScanned] = useState(false);
  const [fingerprintFile, setFingerprintFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (type: string, file: File, description: string) => {
    setMedicalFiles(prev => [...prev, { type, file, description }]);
  };

  const handleFingerprintScan = async () => {
    try {
      const res = await fetch('http://localhost:8000/capture');
      if (!res.ok) throw new Error('Sensor service not available');
      const data = await res.json();
      if (!data.template) throw new Error('No fingerprint template returned');
      // Convert base64 template to a Blob and then to a File
      const byteCharacters = atob(data.template);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/octet-stream' });
      const file = new File([blob], 'fingerprint.dat', { type: 'application/octet-stream' });
      setFingerprintFile(file);
    setIsFingerprintScanned(true);
      toast.success('Fingerprint scanned successfully!');
    } catch (err) {
      setIsFingerprintScanned(false);
      setFingerprintFile(null);
      toast.error('Fingerprint sensor not available or not running. Please start the Mantra HTTP service.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFingerprintScanned) {
      toast.error("Please scan your fingerprint first!");
      return;
    }

    if (!fingerprintFile) {
      toast.error("Please upload your fingerprint file!");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      // Append fingerprint file
      formDataToSend.append("fingerprint", fingerprintFile);
      // Append medical files (all as 'medicalFiles')
      medicalFiles.forEach((file) => {
        formDataToSend.append("medicalFiles", file.file);
      });
      // Send to backend
      const response = await fetch("http://localhost:5050/api/register", {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error("Registration failed: " + errorText);
      }
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Patient Registration</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => handleSelectChange("bloodType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                <Input
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="e.g., Penicillin, Peanuts"
                />
              </div>

              {/* Emergency Contact Section */}
              <div className="col-span-2 border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">Emergency Contact Details</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Name</Label>
                    <Input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactRelation">Relation</Label>
                    <Input
                      id="emergencyContactRelation"
                      name="emergencyContactRelation"
                      value={formData.emergencyContactRelation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactNumber">Contact Number</Label>
                    <Input
                      id="emergencyContactNumber"
                      name="emergencyContactNumber"
                      value={formData.emergencyContactNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fingerprint Scan */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Fingerprint Registration</h2>
              <Input
                type="file"
                accept=".png,.jpg,.jpeg,.wsq,.iso,.ansi,.txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFingerprintFile(file);
                }}
                required
              />
              <Button
                type="button"
                onClick={handleFingerprintScan}
                className={isFingerprintScanned ? "bg-green-500" : ""}
              >
                {isFingerprintScanned ? "✓ Fingerprint Scanned" : "Scan Fingerprint"}
              </Button>
            </div>

            {/* Medical Records Upload */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Medical Records</h2>
              <div className="space-y-4">
                {["MRI", "X-Ray", "Blood Report", "Prescription", "Other"].map((type) => (
                  <div key={type} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label>{type}</Label>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(type, file, "");
                          }
                        }}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Description</Label>
                      <Input
                        type="text"
                        placeholder="Enter description"
                        onChange={(e) => {
                          const file = medicalFiles.find(f => f.type === type);
                          if (file) {
                            handleFileUpload(type, file.file, e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <Button type="submit" className="w-full">
                Complete Registration
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 