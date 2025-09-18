import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-6">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-2xl border border-gray-300 px-6 py-3 text-lg font-medium text-gray-700 hover:bg-gray-200 transition"
      >
        Go back home
      </Link>
    </main>
  )
}
