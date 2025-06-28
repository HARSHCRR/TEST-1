"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "h-16 bg-white/80 backdrop-blur-md shadow-lg" : "h-20 bg-transparent"
    }`}>
      <div className="container h-full flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            <Sparkles className="h-6 w-6 text-teal-600 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <div className="absolute inset-0 bg-teal-600/20 blur-md rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            HealthChain
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            href="/submit" 
            className="text-gray-600 hover:text-teal-600 transition-colors duration-300 transform hover:scale-105 hover:-translate-y-0.5"
          >
            Submit
          </Link>
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </nav>
  )
} 