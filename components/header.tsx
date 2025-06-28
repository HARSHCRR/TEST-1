"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigationLinks = [
    { href: "#features", label: "Features" },
    { href: "/doctor-login", label: "For Doctors", isPage: true },
    { href: "/patient-signup", label: "For Patients", isPage: true },
    { href: "#how-it-works", label: "How It Works" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <div className="mx-auto max-w-6xl">
        <nav 
          className={cn(
            "flex items-center justify-between rounded-full bg-gray-900 shadow-lg transition-all duration-300 perspective-3d transform-3d",
            isScrolled ? "py-2 px-4" : "py-3 px-6"
          )}
        >
          {/* Left: Logo and Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2 hover-3d transform-3d"
          >
            <Wand2 className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold text-white">HealthChain</span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-white transition-all duration-300 transform-3d hover-3d"
                onClick={(e) => {
                  if (!item.isPage && item.href.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="relative z-10 block transition-all duration-300 group-hover:scale-125 group-hover:translate-z-30 group-hover:rotate-x-10">
                  {item.label}
                </span>
                <span className="absolute inset-0 bg-gray-800 rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:translate-z-10" />
              </Link>
            ))}
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover-3d transform-3d"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                size="sm" 
                className="bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 hover-3d transform-3d"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white transition-all duration-300 hover-3d transform-3d" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden absolute w-full mt-2 rounded-lg bg-gray-900 shadow-lg transition-all duration-300 perspective-3d transform-3d",
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
          <div className="px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navigationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-gray-200 transition-all duration-300 transform-3d hover-3d"
                  onClick={(e) => {
                    if (!item.isPage && item.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover-3d transform-3d w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  size="sm" 
                  className="bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 hover-3d transform-3d w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
