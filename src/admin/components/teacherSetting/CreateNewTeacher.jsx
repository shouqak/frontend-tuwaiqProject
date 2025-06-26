import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { ToastContainer, toast } from "react-toastify"
const API_URL = import.meta.env.VITE_API_URL;
// import AdminNav from "../../components/admin/AdminNav";

function CreateNewTeacher() {
  //! error value
  const [fullname, setFullname] = useState("")
  //const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")


  // ! error message
  const [fullnameErr, setFullnameErr] = useState(
    "Full name is required and must be at least 3 characters long."
  )
/*   const [UsernameErr, setUsernameErr] = useState(
    "Username is required and must be at least 3 characters long."
  ) */
  const [emailErr, setEmailErr] = useState(
    "Enter a valid email that includes (@Teacher.tuwaiq.sa)"
  )
  const [passwordErr, setPasswordErr] = useState(
    "Password must be at least 8 characters long."
  )
  const [conPasswordErr, setConPasswordErr] = useState(
    "Please confirm your password."
  )

  const nav = useNavigate()



  const register = async () => {
    let isValid = true

    // ! Full name validation
    if (fullname === "") {
      isValid = false
      toast.error("Full name is required and cannot be left empty")
    } else if (fullname.length < 3) {
      isValid = false
      toast.error("Full name must be at least 3 characters long")
    }

    // ! Username validation
/*     if (username === "") {
      isValid = false
      toast.error("Username is required and cannot be left empty")
    } else if (username.length < 3) {
      isValid = false
      toast.error("Username must be at least 3 characters long")
    }
 */
    // ! Email validation
    if (email === "") {
      isValid = false
      toast.error("Email is required and cannot be left empty")
    } else if (!email.includes("Teacher.tuwaiq.sa")) {
      isValid = false
      toast.error("Email must include @Teacher.tuwaiq.sa")
    }

    // ! Password validation
    if (password === "") {
      isValid = false
      toast.error("Password is required and cannot be left empty")
    } else if (password.length < 8) {
      isValid = false
      toast.error("Password must be at least 8 characters long")
    }

    // ! Confirm password validation
    if (password !== conPassword) {
      isValid = false
      toast.error("The password and confirm password do not match.")
    }

    if (!classId) {
      isValid = false
      toast.error("Please select a class")
    }

    if (isValid) {
      try {
        // Sending data to the apiUrl
        const response = await axios.post(`${API_URL}/user`, {
          fullname,
          //username,
          email,
          password,
          role: "Teacher",
        })

        // Save data to local storage
        localStorage.setItem("fullname", fullname)
        //localStorage.setItem("username", username)
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)
        localStorage.setItem("role", "Teacher")

        nav("/admin/readTeacher")
        // Success toast
        toast.success("Registration completed successfully!")
      } catch (error) {
        console.error("Error during registration:", error)
        toast.error("An error occurred while registering. Please try again.")
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.")
    }
  }

  return (
    // todo : register form
    <div>
      <div>{/* <AdminNav /> */}</div>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-8">
  <div className="flex flex-col md:flex-row gap-10 shadow-2xl rounded-2xl bg-white overflow-hidden max-w-4xl w-full">

    {/* Left Info Section */}
    <div className="bg-blue-600 text-white p-8 flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-2">Attendance System</h1>
      <p className="text-lg opacity-90">Register a new teacher</p>
    </div>

    {/* Form Section */}
    <div className="flex flex-col gap-5 p-8 w-full">
      <h2 className="text-xl font-semibold text-gray-800">Create New Teacher</h2>

      <form className="space-y-5" onSubmit={register}>
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="fname" className="font-medium text-sm text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fname"
            className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <span className="text-xs text-gray-500">{fullnameErr}</span>
        </div>

        {/* Username */}
   {/*      <div className="flex flex-col gap-1">
          <label htmlFor="username" className="font-medium text-sm text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="text-xs text-gray-500">{UsernameErr}</span>
        </div> */}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="text-xs text-gray-500">{emailErr}</span>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium text-sm text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-xs text-gray-500">{passwordErr}</span>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="conPassword" className="font-medium text-sm text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="conPassword"
            className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
          />
          <span className="text-xs text-gray-500">{conPasswordErr}</span>
        </div>


        {/* Submit Button */}
        <div className="pt-2">
          <ToastContainer />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2.5 rounded-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
  )
}

export default CreateNewTeacher
