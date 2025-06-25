import React from "react"

function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Student Attendance System
    </footer>
  )
}

export default Footer
