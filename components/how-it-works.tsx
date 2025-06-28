import { ArrowRight } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How HealthChain Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge blockchain technology with biometric security to create a seamless,
            secure healthcare record system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="relative">
            <div className="bg-sky-50 rounded-lg p-8 h-full">
              <div className="bg-teal-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Registration</h3>
              <p className="text-gray-600">
                Patients register with verified ID and biometric data. Healthcare providers undergo a verification
                process to ensure system integrity.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              <ArrowRight className="w-8 h-8 text-teal-600" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-sky-50 rounded-lg p-8 h-full">
              <div className="bg-teal-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Record Creation & Storage</h3>
              <p className="text-gray-600">
                Medical records are digitized, encrypted, and stored on our secure blockchain network, ensuring data
                integrity and protection from tampering.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              <ArrowRight className="w-8 h-8 text-teal-600" />
            </div>
          </div>

          <div>
            <div className="bg-sky-50 rounded-lg p-8 h-full">
              <div className="bg-teal-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Biometric Access</h3>
              <p className="text-gray-600">
                Patients and authorized healthcare providers access records using fingerprint authentication, ensuring
                only authorized individuals can view sensitive data.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-600 to-sky-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Blockchain Technology: The Foundation of Trust</h3>
            <p className="mb-8 text-white/90 max-w-3xl">
              HealthChain leverages blockchain technology to create an immutable, secure record of all medical data.
              Unlike traditional databases, blockchain provides:
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-bold text-xl mb-3">Immutability</h4>
                <p className="text-white/90">
                  Once recorded, data cannot be altered or deleted, ensuring the integrity of your medical history.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-bold text-xl mb-3">Decentralization</h4>
                <p className="text-white/90">
                  Records are stored across multiple nodes, eliminating single points of failure and ensuring constant
                  availability.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-bold text-xl mb-3">Transparency</h4>
                <p className="text-white/90">
                  All access to records is logged on the blockchain, creating a transparent audit trail of who accessed
                  what and when.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
