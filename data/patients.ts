export interface MedicalRecord {
  date: string;
  type: string;
  description: string;
  result: string;
  doctor: string;
  attachmentUrl?: string;
}

export interface Patient {
  id: string;
  fingerprintId: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  medicalHistory: {
    bloodReports: MedicalRecord[];
    xrays: MedicalRecord[];
    ecgReports: MedicalRecord[];
    generalReports: MedicalRecord[];
    mriReports: MedicalRecord[];
    ctScanReports: MedicalRecord[];
  };
}

export const patients: Patient[] = [
  {
    id: "P001",
    fingerprintId: "FP001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    emergencyContact: {
      name: "Jane Smith",
      relation: "Wife",
      phone: "555-123-4567"
    },
    medicalHistory: {
      bloodReports: [
        {
          date: "2024-01-15",
          type: "Complete Blood Count",
          description: "Regular checkup",
          result: "Normal levels",
          doctor: "Dr. Johnson",
          attachmentUrl: "/reports/blood/cbc-report-1.png"
        },
        {
          date: "2023-12-10",
          type: "Lipid Panel",
          description: "Cholesterol screening",
          result: "Slightly elevated LDL",
          doctor: "Dr. Johnson",
          attachmentUrl: "/reports/blood/lipid-panel-1.png"
        }
      ],
      xrays: [
        {
          date: "2023-12-20",
          type: "Chest X-ray",
          description: "Annual screening",
          result: "Clear lungs, no abnormalities",
          doctor: "Dr. Williams",
          attachmentUrl: "/reports/xray/chest-xray-1.png"
        },
        {
          date: "2023-11-15",
          type: "Dental X-ray",
          description: "Dental checkup",
          result: "No cavities found",
          doctor: "Dr. Lee",
          attachmentUrl: "/reports/xray/dental-xray-1.png"
        }
      ],
      ecgReports: [
        {
          date: "2024-02-01",
          type: "12-lead ECG",
          description: "Routine heart checkup",
          result: "Normal sinus rhythm",
          doctor: "Dr. Brown",
          attachmentUrl: "/reports/ecg/ecg-report-1.png"
        }
      ],
      mriReports: [
        {
          date: "2024-02-15",
          type: "Brain MRI",
          description: "Neurological examination",
          result: "No abnormalities detected",
          doctor: "Dr. Anderson",
          attachmentUrl: "/reports/mri/brain-mri-1.png"
        },
        {
          date: "2024-01-20",
          type: "Knee MRI",
          description: "Joint pain investigation",
          result: "Minor meniscus wear",
          doctor: "Dr. Anderson",
          attachmentUrl: "/reports/mri/knee-mri-1.png"
        }
      ],
      ctScanReports: [
        {
          date: "2024-01-25",
          type: "Chest CT Scan",
          description: "Detailed chest examination",
          result: "Normal chest structures",
          doctor: "Dr. Wilson",
          attachmentUrl: "/reports/ct-scan/chest-ct-1.png"
        },
        {
          date: "2024-01-10",
          type: "Abdominal CT Scan",
          description: "Digestive system checkup",
          result: "Normal organ appearance",
          doctor: "Dr. Wilson",
          attachmentUrl: "/reports/ct-scan/abdominal-ct-1.png"
        }
      ],
      generalReports: [
        {
          date: "2024-01-30",
          type: "General Checkup",
          description: "Annual physical examination",
          result: "Good overall health",
          doctor: "Dr. Johnson"
        }
      ]
    }
  },
  {
    id: "P002",
    fingerprintId: "FP002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodType: "A+",
    allergies: ["Sulfa drugs"],
    emergencyContact: {
      name: "Tom Johnson",
      relation: "Husband",
      phone: "555-987-6543"
    },
    medicalHistory: {
      bloodReports: [
        {
          date: "2024-02-10",
          type: "Complete Blood Count",
          description: "Routine checkup",
          result: "Slightly low iron levels",
          doctor: "Dr. Martinez",
          attachmentUrl: "/reports/blood/sarah-cbc-1.png"
        }
      ],
      xrays: [],
      ecgReports: [
        {
          date: "2024-01-25",
          type: "ECG",
          description: "Pre-surgery screening",
          result: "Normal heart rhythm",
          doctor: "Dr. Brown",
          attachmentUrl: "/reports/ecg/sarah-ecg-1.png"
        },
        {
          date: "2023-12-15",
          type: "Stress ECG",
          description: "Cardiac stress test",
          result: "Normal cardiac response to exercise",
          doctor: "Dr. Brown",
          attachmentUrl: "/reports/ecg/sarah-stress-ecg-1.png"
        }
      ],
      generalReports: [
        {
          date: "2024-02-05",
          type: "General Checkup",
          description: "Regular checkup",
          result: "Good health, iron supplements recommended",
          doctor: "Dr. Martinez"
        }
      ],
      mriReports: [],
      ctScanReports: []
    }
  },
  {
    id: "P003",
    fingerprintId: "FP003",
    name: "Michael Chen",
    age: 28,
    gender: "Male",
    bloodType: "B-",
    allergies: ["Latex"],
    emergencyContact: {
      name: "Emily Chen",
      relation: "Sister",
      phone: "555-555-1212"
    },
    medicalHistory: {
      bloodReports: [
        {
          date: "2024-02-15",
          type: "Complete Blood Count",
          description: "Pre-employment screening",
          result: "All parameters within normal range",
          doctor: "Dr. Wilson",
          attachmentUrl: "/reports/blood/michael-cbc-1.png"
        }
      ],
      xrays: [
        {
          date: "2024-01-20",
          type: "Dental X-ray",
          description: "Dental checkup",
          result: "No cavities, wisdom teeth need monitoring",
          doctor: "Dr. Lee",
          attachmentUrl: "/reports/xray/michael-dental-1.png"
        },
        {
          date: "2024-01-20",
          type: "Dental Panoramic X-ray",
          description: "Wisdom teeth assessment",
          result: "Wisdom teeth partially impacted, monitoring recommended",
          doctor: "Dr. Lee",
          attachmentUrl: "/reports/xray/michael-dental-panoramic-1.png"
        }
      ],
      ecgReports: [],
      generalReports: [
        {
          date: "2024-02-12",
          type: "General Checkup",
          description: "Annual physical",
          result: "Excellent health condition",
          doctor: "Dr. Wilson"
        }
      ],
      mriReports: [],
      ctScanReports: []
    }
  },
]; 