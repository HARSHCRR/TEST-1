"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Cylinder, Html } from "@react-three/drei"
import type { Group } from "three"
import { easing } from "maath"

export default function FingerprintModel() {
  const groupRef = useRef<Group>(null)
  const [scanning, setScanning] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  // Handle scan button click
  const handleScan = () => {
    setScanning(true)
    setScanProgress(0)
  }

  // Animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle rotation
      easing.dampE(groupRef.current.rotation, [0, state.clock.getElapsedTime() * 0.1, 0], 0.25, delta)
    }

    // Handle scanning animation
    if (scanning) {
      setScanProgress((prev) => {
        const newProgress = prev + delta * 0.5 // Control scan speed

        if (newProgress >= 1) {
          setScanning(false)
          setUnlocked(true)
          return 1
        }

        return newProgress
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Fingerprint scanner base */}
      <group position={[0, -0.5, 0]}>
        <Cylinder args={[0.8, 0.9, 0.2, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#e0e0e0" />
        </Cylinder>

        {/* Scanner surface */}
        <Cylinder args={[0.6, 0.6, 0.05, 32]} position={[0, 0.125, 0]}>
          <meshStandardMaterial
            color={scanning ? "#00A3A1" : unlocked ? "#4CAF50" : "#0077C8"}
            emissive={scanning ? "#00A3A1" : unlocked ? "#4CAF50" : "#0077C8"}
            emissiveIntensity={scanning ? 0.5 : unlocked ? 0.3 : 0.2}
            transparent
            opacity={0.9}
          />
        </Cylinder>

        {/* Fingerprint icon */}
        {!unlocked && (
          <Box args={[0.4, 0.01, 0.6]} position={[0, 0.16, 0]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} map={null} />
          </Box>
        )}

        {/* Scanning effect */}
        {scanning && (
          <Box args={[1.2, 0.02, 0.01]} position={[0, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </Box>
        )}

        {/* Unlocked medical record */}
        {unlocked && (
          <group position={[0, 1, 0]} scale={[1, 1, 1]}>
            <Box args={[1.2, 0.8, 0.05]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ffffff" />
            </Box>
            <Box args={[1.1, 0.1, 0.06]} position={[0, 0.3, 0.06]}>
              <meshStandardMaterial color="#0077C8" />
            </Box>
            <Text position={[0, 0.3, 0.07]} fontSize={0.06} color="#ffffff" anchorX="center" anchorY="middle">
              PATIENT RECORD
            </Text>
            <Box args={[0.3, 0.3, 0.06]} position={[-0.4, 0, 0.06]}>
              <meshStandardMaterial color="#f0f0f0" />
            </Box>
            <Box args={[0.7, 0.06, 0.06]} position={[0.1, 0.1, 0.06]}>
              <meshStandardMaterial color="#f0f0f0" />
            </Box>
            <Box args={[0.7, 0.06, 0.06]} position={[0.1, 0, 0.06]}>
              <meshStandardMaterial color="#f0f0f0" />
            </Box>
            <Box args={[0.7, 0.06, 0.06]} position={[0.1, -0.1, 0.06]}>
              <meshStandardMaterial color="#f0f0f0" />
            </Box>
          </group>
        )}
      </group>

      {/* Interactive button */}
      <Html position={[0, -1.2, 0]} transform>
        <button
          onClick={handleScan}
          disabled={scanning || unlocked}
          className={`px-4 py-2 rounded-full text-white font-medium text-sm ${
            scanning ? "bg-yellow-500" : unlocked ? "bg-green-500" : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {scanning ? "Scanning..." : unlocked ? "Unlocked" : "Scan Fingerprint"}
        </button>
      </Html>
    </group>
  )
}
