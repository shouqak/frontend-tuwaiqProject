import React from 'react'
import { Link } from 'react-router'

function HomePage() {
  return (
 <section className="h-screen flex justify-center items-center bg-gray-50 py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
          Student Attendance System
        </h1>
        <p className="text-lg md:text-xl text-blue-700 mb-8">
          A modern and reliable way to track student attendance in real-time 
        </p>
        <Link
          to={"/auth/signin"}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>
    </section>  )
}

export default HomePage