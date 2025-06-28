"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, Fingerprint, Stethoscope, FileText, Activity } from "lucide-react"
import FingerprintModel from "@/components/3d/fingerprint-model"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container">
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionizing Healthcare Records</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                HealthChain combines blockchain technology with biometric security to create a seamless, secure healthcare
                record system for both patients and providers.
              </p>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-teal-600">
              <CardHeader>
                <Shield className="h-10 w-10 text-teal-600 mb-2" />
                <CardTitle>Secure Blockchain Storage</CardTitle>
                <CardDescription>
                  Your medical records are encrypted and stored on a distributed blockchain network, ensuring data
                  integrity and protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-teal-600">
              <CardHeader>
                <Fingerprint className="h-10 w-10 text-teal-600 mb-2" />
                <CardTitle>Biometric Access</CardTitle>
                <CardDescription>
                  Access your complete medical history instantly with just your fingerprint, ensuring only you control
                  your health data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-teal-600">
              <CardHeader>
                <Clock className="h-10 w-10 text-teal-600 mb-2" />
                <CardTitle>Emergency Access</CardTitle>
                <CardDescription>
                  In emergencies, medical professionals can access critical information instantly, potentially saving
                  lives.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-teal-600">
              <CardHeader>
                <Stethoscope className="h-10 w-10 text-teal-600 mb-2" />
                <CardTitle>Provider Collaboration</CardTitle>
                <CardDescription>
                  Doctors can securely share and access patient records with permission, improving coordination of care.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-teal-600">
              <CardHeader>
                <FileText className="h-10 w-10 text-teal-600 mb-2" />
                <CardTitle>AI-Powered Summaries</CardTitle>
                <CardDescription>
                  Get intelligent summaries of your medical history, highlighting key information for quick reference.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-4 border-t-teal-600">
              <CardHeader>
                <Activity className="h-10 w-10 text-teal-600 mb-2" />
                <CardTitle>Comprehensive Timeline</CardTitle>
                <CardDescription>
                  View your complete medical history on an interactive timeline, from vaccinations to surgeries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </ContainerScroll>

        <ContainerScroll
          titleComponent={
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Secure Access with Your Fingerprint</h3>
              <p className="text-gray-600 mb-6">
                Your medical records are secured with state-of-the-art biometric authentication. A simple fingerprint
                scan grants you instant access to your complete medical history, while keeping your data protected from
                unauthorized access.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="bg-teal-100 text-teal-600 p-1 rounded-full mr-2">✓</span>
                  Instant access to your records
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 text-teal-600 p-1 rounded-full mr-2">✓</span>
                  Biometric security prevents unauthorized access
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 text-teal-600 p-1 rounded-full mr-2">✓</span>
                  Works across all healthcare providers
                </li>
              </ul>
            </div>
          }
        >
          <div className="h-[400px] w-full">
            <Suspense fallback={<div className="h-full w-full bg-gray-100 animate-pulse"></div>}>
              <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <FingerprintModel />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </Suspense>
          </div>
        </ContainerScroll>
      </div>
    </section>
  )
}
