"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Cylinder, Html } from "@react-three/drei"
import type { Group } from "three"
import { easing } from "maath"

export default function EmergencyScenario() {
  const groupRef = useRef<Group>(null)
  const [scanning, setScanning] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  // Handle scan button click
  const handleScan = () => {
    setScanning(true)
    setScanProgress(0)
    setShowInfo(false)
  }

  // Animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle rotation
      easing.dampE(groupRef.current.rotation, [0, state.clock.getElapsedTime() * 0.05, 0], 0.25, delta)
    }

    // Handle scanning animation
    if (scanning) {
      setScanProgress((prev) => {
        const newProgress = prev + delta * 0.5 // Control scan speed

        if (newProgress >= 1) {
          setScanning(false)
          setShowInfo(true)
          return 1
        }

        return newProgress
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Hospital emergency room scene */}
      <group position={[0, 0, -1]}>
        {/* Background wall */}
        <Box args={[10, 5, 0.1]} position={[0, 0, -1]}>
          <meshStandardMaterial color="#f0f0f0" />
        </Box>

        {/* Floor */}
        <Box args={[10, 0.1, 5]} position={[0, -2.5, 1]}>
          <meshStandardMaterial color="#e0e0e0" />
        </Box>

        {/* Emergency sign */}
        <Box args={[2, 0.5, 0.1]} position={[0, 1.5, -0.9]} material-color="#ff0000">
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </Box>
        <Text position={[0, 1.5, -0.8]} fontSize={0.2} color="#ffffff">
          EMERGENCY
        </Text>
      </group>

      {/* Scanner device */}
      <group position={[0, -0.5, 0]}>
        <Box args={[1.5, 0.2, 1]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#cccccc" />
        </Box>

        <Cylinder args={[0.6, 0.7, 0.2, 32]} position={[0, -0.8, 0]}>
          <meshStandardMaterial color="#e0e0e0" />
        </Cylinder>

        {/* Scanner surface */}
        <Cylinder args={[0.5, 0.5, 0.05, 32]} position={[0, -0.7, 0]}>
          <meshStandardMaterial
            color={scanning ? "#ff9800" : showInfo ? "#4CAF50" : "#0077C8"}
            emissive={scanning ? "#ff9800" : showInfo ? "#4CAF50" : "#0077C8"}
            emissiveIntensity={scanning ? 0.5 : showInfo ? 0.3 : 0.2}
            transparent
            opacity={0.9}
          />
        </Cylinder>
      </group>

      {/* Medical information display */}
      {showInfo && (
        <group position={[0, 0.5, 0]}>
          <Box args={[2.5, 1.8, 0.05]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>

          <Box args={[2.4, 0.3, 0.06]} position={[0, 0.7, 0.03]}>
            <meshStandardMaterial color="#ff0000" />
          </Box>

          <Text position={[0, 0.7, 0.06]} fontSize={0.15} color="#ffffff">
            EMERGENCY MEDICAL INFO
          </Text>

          <Text position={[-1, 0.4, 0.06]} fontSize={0.1} color="#000000" anchorX="left">
            Patient: John Doe
          </Text>

          <Text position={[-1, 0.2, 0.06]} fontSize={0.1} color="#000000" anchorX="left">
            Blood Type: O+
          </Text>

          <Text position={[-1, 0, 0.06]} fontSize={0.1} color="#ff0000" anchorX="left">
            Allergies: Penicillin, Peanuts
          </Text>

          <Text position={[-1, -0.2, 0.06]} fontSize={0.1} color="#ff0000" anchorX="left">
            Conditions: Diabetes, Hypertension
          </Text>

          <Text position={[-1, -0.4, 0.06]} fontSize={0.1} color="#000000" anchorX="left">
            Emergency Contact: Jane Doe
          </Text>

          <Text position={[-1, -0.6, 0.06]} fontSize={0.1} color="#000000" anchorX="left">
            Phone: (555) 123-4567
          </Text>
        </group>
      )}

      {/* Interactive button */}
      <Html position={[0, -1.8, 0]} transform>
        <button
          onClick={handleScan}
          className={`px-4 py-2 rounded-full text-white font-medium text-sm ${
            scanning ? "bg-yellow-500" : showInfo ? "bg-green-500" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {scanning ? "Scanning..." : showInfo ? "Emergency Info Retrieved" : "Emergency Scan"}
        </button>
      </Html>
    </group>
  )
}
