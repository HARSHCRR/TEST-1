"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Sphere } from "@react-three/drei"
import { Vector3 } from "three"
import type { Group } from "three"
import * as THREE from "three"

export default function MedicalRecordFlow() {
  const groupRef = useRef<Group>(null)
  const [nodes, setNodes] = useState<{ position: Vector3; scale: number }[]>([])
  const [connections, setConnections] = useState<[number, number][]>([])
  const [recordPosition, setRecordPosition] = useState(new Vector3(-3, 0, 0))
  const [animationComplete, setAnimationComplete] = useState(false)

  // Initialize nodes in a blockchain-like network
  useEffect(() => {
    const newNodes = []
    const newConnections = []

    // Create nodes in a distributed pattern
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 2 + Math.random() * 0.5
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = (Math.random() - 0.5) * 1.5

      newNodes.push({
        position: new Vector3(x, y, z),
        scale: 0.1 + Math.random() * 0.1,
      })
    }

    // Create connections between nodes
    for (let i = 0; i < newNodes.length; i++) {
      // Connect to next node
      newConnections.push([i, (i + 1) % newNodes.length])

      // Add some random connections
      if (Math.random() > 0.7) {
        const randomNode = Math.floor(Math.random() * newNodes.length)
        if (randomNode !== i) {
          newConnections.push([i, randomNode])
        }
      }
    }

    setNodes(newNodes)
    setConnections(newConnections)
  }, [])

  // Animation loop
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Subtle rotation of the entire network
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }

    // Animate medical record flowing to the network
    if (!animationComplete) {
      setRecordPosition((prev) => {
        if (prev.x < 0) {
          return new Vector3(prev.x + 0.02, prev.y, prev.z)
        } else {
          setAnimationComplete(true)
          return new Vector3(0, 0, 0)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Medical record document */}
      <group position={recordPosition.toArray()}>
        <Box args={[0.8, 1, 0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.7, 0.1, 0.06]} position={[0, 0.4, 0.06]}>
          <meshStandardMaterial color="#0077C8" />
        </Box>
        <Box args={[0.6, 0.5, 0.06]} position={[0, 0, 0.06]}>
          <meshStandardMaterial color="#f0f0f0" />
        </Box>
        <Text position={[0, -0.3, 0.06]} fontSize={0.1} color="#0077C8" anchorX="center" anchorY="middle">
          MEDICAL
        </Text>
        <Text position={[0, -0.45, 0.06]} fontSize={0.1} color="#0077C8" anchorX="center" anchorY="middle">
          RECORD
        </Text>
      </group>

      {/* Blockchain nodes */}
      {nodes.map((node, i) => (
        <Sphere key={`node-${i}`} args={[node.scale, 16, 16]} position={node.position.toArray()}>
          <meshStandardMaterial
            color={animationComplete ? "#00A3A1" : "#aaaaaa"}
            emissive={animationComplete ? "#00A3A1" : "#000000"}
            emissiveIntensity={animationComplete ? 0.3 : 0}
          />
        </Sphere>
      ))}

      {/* Connections between nodes */}
      {connections.map(([from, to], i) => (
        <line key={`connection-${i}`}>
          <bufferGeometry
            attach="geometry"
            onUpdate={(self) => {
              const positions = new Float32Array(6)
              positions[0] = nodes[from].position.x
              positions[1] = nodes[from].position.y
              positions[2] = nodes[from].position.z
              positions[3] = nodes[to].position.x
              positions[4] = nodes[to].position.y
              positions[5] = nodes[to].position.z
              self.setAttribute("position", new THREE.BufferAttribute(positions, 3))
            }}
          />
          <lineBasicMaterial
            attach="material"
            color={animationComplete ? "#00A3A1" : "#aaaaaa"}
            opacity={0.7}
            transparent
            linewidth={1}
          />
        </line>
      ))}
    </group>
  )
}
