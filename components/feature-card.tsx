"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  highlight?: boolean
}

export default function FeatureCard({ title, description, icon: Icon, highlight }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse position relative to card
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animation for smooth movement
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), springConfig)
  const scale = useSpring(isHovered ? 1.05 : 1, springConfig)
  const z = useSpring(isHovered ? 20 : 0, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${highlight ? 'biometric-access-block' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 ${highlight ? 'transition-transform transition-shadow duration-300' : ''}`}
        style={{
          rotateX,
          rotateY,
          scale,
          z,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="relative z-10">
          <div className="mb-4">
            <Icon className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {/* Gradient overlay for depth effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
            transform: "translateZ(10px)"
          }}
        />
      </motion.div>
    </motion.div>
  )
} 