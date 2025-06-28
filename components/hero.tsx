"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MedicalRecordFlow from "@/components/3d/medical-record-flow"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-100 via-sky-50 to-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-transparent to-transparent" />
      <ContainerScroll
        titleComponent={
          <div className="space-y-6 -mt-96">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Secure Medical Records on <span className="text-teal-600">Blockchain</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                HealthChain revolutionizes healthcare by securely storing and sharing medical records using blockchain
                technology, ensuring your health data is accessible when needed most.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/patient-signup" passHref legacyBehavior>
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  <span>For Patients</span>
                </Button>
              </Link>
              <Link href="/doctor-login" passHref legacyBehavior>
                <Button asChild size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  <span>For Doctors</span>
                </Button>
              </Link>
            </div>
          </div>
        }
      >
        <div className="h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
          <Suspense fallback={<div className="h-full w-full bg-gray-100 animate-pulse"></div>}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <MedicalRecordFlow />
              <Environment preset="city" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </Suspense>
        </div>
      </ContainerScroll>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
