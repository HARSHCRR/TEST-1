import Hero from "@/components/hero"
import Features from "@/components/features"
import UserJourneys from "@/components/user-journeys"
import HowItWorks from "@/components/how-it-works"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <main>
        <Hero />
        <Features />
        <UserJourneys />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
