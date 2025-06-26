import React, { useState } from "react";
import { Link } from "react-router";

const NavbarAdmin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center">
            <span className="font-bold text-lg">Attendance System</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <Link to="/admin" className="hover:text-blue-200 transition">
                Dashboard
              </Link>
              <Link to="/admin/readStudent" className="hover:text-blue-200 transition">
                Students
              </Link>
              <Link to="/admin/readTeacher" className="hover:text-blue-200 transition">
                Teachers
              </Link>
              <Link to="/admin/readPrinciple" className="hover:text-blue-200 transition">
                Principals
              </Link>
              <Link to="/admin/readClasses" className="hover:text-blue-200 transition">
                Classes
              </Link>
              
              <Link
                to="/logout"
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Logout
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {/* Hamburger Icon */}
              {!isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l6 6 6 6"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2 space-y-1 transition-all duration-300 ease-in-out">
          <Link
            to="/admin"
            className="block hover:text-blue-200 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/readStudent"
            className="block hover:text-blue-200 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Students
          </Link>
          <Link
            to="/admin/readTeacher"
            className="block hover:text-blue-200 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Teachers
          </Link>
          <Link
            to="/admin/readPrinciple"
            className="block hover:text-blue-200 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Principals
          </Link>
          <Link
            to="/admin/readClasses"
            className="block hover:text-blue-200 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Classes
          </Link>
       
          <Link
            to="/logout"
            className="block bg-red-500 hover:bg-red-600 text-center rounded py-1 text-sm mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarAdmin;