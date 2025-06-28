"use client"

import { Shield, Fingerprint, AlertCircle, Users, Brain, Clock } from "lucide-react"
import FeatureCard from "./feature-card"

const features = [
  {
    title: "Secure Blockchain Storage",
    description: "Your medical records are encrypted and stored on a secure blockchain network, ensuring maximum security and privacy.",
    icon: Shield
  },
  {
    title: "Biometric Access",
    description: "Access your records securely using biometric authentication, making it both convenient and highly secure.",
    icon: Fingerprint,
    highlight: true
  },
  {
    title: "Emergency Access",
    description: "Quick and secure access to critical medical information in emergency situations, potentially saving lives.",
    icon: AlertCircle
  },
  {
    title: "Provider Collaboration",
    description: "Seamless sharing of medical records between healthcare providers while maintaining patient privacy.",
    icon: Users
  },
  {
    title: "AI-Powered Summaries",
    description: "Get intelligent summaries of your medical history and treatment plans, making complex information easy to understand.",
    icon: Brain
  },
  {
    title: "Comprehensive Timeline",
    description: "View your complete medical history in a chronological timeline, making it easy to track your health journey.",
    icon: Clock
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Features for Modern Healthcare
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of medical record management with our innovative features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              highlight={feature.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 