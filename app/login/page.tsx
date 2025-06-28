"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In to HealthChain</h2>
        <div className="flex flex-col gap-4">
          <Link href="/login/patient" className="w-full">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-lg">Login as Patient</button>
          </Link>
          <Link href="/login/doctor" className="w-full">
            <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition font-semibold text-lg">Login as Doctor</button>
          </Link>
        </div>
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
} 