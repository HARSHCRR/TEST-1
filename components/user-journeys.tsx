"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import EmergencyScenario from "@/components/3d/emergency-scenario"

export default function UserJourneys() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Everyone in Healthcare</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            HealthChain provides tailored experiences for both patients and healthcare providers, ensuring everyone
            benefits from secure, accessible medical records.
          </p>
        </div>

        <Tabs defaultValue="patients" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="patients">For Patients</TabsTrigger>
            <TabsTrigger value="doctors">For Doctors</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="mt-0">
            <div id="for-patients" className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold">Take Control of Your Health Data</h3>
                <p className="text-gray-600">
                  As a patient, you deserve complete access to your medical history. HealthChain puts you in control,
                  allowing you to securely store, access, and share your records with healthcare providers of your
                  choice.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Complete Medical History</h4>
                    <p className="text-gray-600">
                      Access your entire medical history in one place, from childhood vaccinations to recent procedures,
                      all securely stored and easily accessible.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Emergency Access</h4>
                    <p className="text-gray-600">
                      In critical situations, emergency responders can access vital information like allergies and
                      conditions, potentially saving your life.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Privacy Controls</h4>
                    <p className="text-gray-600">
                      You decide who sees your records and when. Grant and revoke access permissions with ease,
                      maintaining control of your sensitive health data.
                    </p>
                  </div>
                </div>

                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Sign Up as a Patient
                </Button>
              </div>

              <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-xl order-1 lg:order-2">
                <Suspense fallback={<div className="h-full w-full bg-gray-100 animate-pulse"></div>}>
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <EmergencyScenario />
                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                  </Canvas>
                </Suspense>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="doctors" className="mt-0">
            <div id="for-doctors" className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-xl bg-white p-8">
                <div className="h-full w-full flex flex-col">
                  <div className="bg-teal-600 text-white p-4 rounded-t-lg">
                    <h4 className="font-semibold">Patient Dashboard</h4>
                  </div>
                  <div className="flex-1 border-x border-b rounded-b-lg p-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div>
                        <h5 className="font-medium">Sarah Johnson</h5>
                        <p className="text-sm text-gray-500">DOB: 05/12/1985 • ID: #87291</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3">
                        <h6 className="text-sm font-medium text-gray-500">Allergies</h6>
                        <ul className="text-sm mt-1">
                          <li>Penicillin</li>
                          <li>Shellfish</li>
                        </ul>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h6 className="text-sm font-medium text-gray-500">Conditions</h6>
                        <ul className="text-sm mt-1">
                          <li>Asthma</li>
                          <li>Hypertension</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h6 className="text-sm font-medium text-gray-500">Recent Visits</h6>
                      <div className="space-y-2 mt-1">
                        <div className="flex justify-between text-sm">
                          <span>General Checkup</span>
                          <span className="text-gray-500">04/15/2023</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cardiology Consultation</span>
                          <span className="text-gray-500">02/22/2023</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h6 className="text-sm font-medium text-gray-500">Current Medications</h6>
                      <div className="space-y-2 mt-1">
                        <div className="flex justify-between text-sm">
                          <span>Lisinopril 10mg</span>
                          <span className="text-gray-500">Daily</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Albuterol Inhaler</span>
                          <span className="text-gray-500">As needed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">Enhance Your Practice with Complete Patient Insights</h3>
                <p className="text-gray-600">
                  As a healthcare provider, you need comprehensive patient information to deliver the best care.
                  HealthChain gives you secure, instant access to complete medical histories with patient permission.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Comprehensive Patient Records</h4>
                    <p className="text-gray-600">
                      Access complete patient histories across providers, enabling better-informed diagnoses and
                      treatment plans.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">AI-Powered Summaries</h4>
                    <p className="text-gray-600">
                      Get intelligent summaries of patient histories, highlighting key information and potential areas
                      of concern.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Seamless Collaboration</h4>
                    <p className="text-gray-600">
                      Easily share records with specialists and other providers with patient permission, improving
                      coordination of care.
                    </p>
                  </div>
                </div>

                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Request a Demo
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
