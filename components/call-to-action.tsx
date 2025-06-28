import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-20 bg-sky-50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Healthcare Revolution</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a patient seeking control over your medical data or a healthcare provider looking to enhance
            patient care, HealthChain offers a secure, efficient solution for managing medical records.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-bold mb-4">For Patients</h3>
              <p className="text-gray-600 mb-6">
                Take control of your medical history and ensure critical information is available when you need it most.
              </p>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 w-full">
                Sign Up as a Patient
              </Button>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-bold mb-4">For Healthcare Providers</h3>
              <p className="text-gray-600 mb-6">
                Enhance patient care with comprehensive medical histories and seamless record sharing between providers.
              </p>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 w-full">
                Request a Demo
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Ready to Learn More?</h3>
            <p className="text-gray-600 mb-6">
              Schedule a personalized consultation with our team to discover how HealthChain can transform your
              healthcare experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Watch Demo Video
              </Button>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
