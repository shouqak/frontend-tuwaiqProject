import axios from "axios";
import React, { useState } from "react";
// import { GiToken } from "react-icons/gi"/
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateNewStudent() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const navigate = useNavigate();
  // const apiUrl = "http://localhost:3000"
  // console.log(token)

  localStorage.getItem("token");
  const register = async () => {
    let isValid = true;

    if (!name || name.length < 3) {
      isValid = false;
      toast.error("Full name is required and must be at least 3 characters.");
    }

    if (!email || !email.includes("@student.tuwaiq.sa")) {
      isValid = false;
      toast.error(
        "Valid student email ending with @student.tuwaiq.sa is required."
      );
    }

    if (!password || password.length < 8) {
      isValid = false;
      toast.error("Password must be at least 8 characters long.");
    }

    if (password !== conPassword) {
      isValid = false;
      toast.error("Passwords do not match.");
    }

    if (!isValid) return;

    try {
      const apiUrl = "http://localhost:3000";
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${apiUrl}/admin/users`,
        {
          name,
          email,
          password,
          role: "student",
        },
        {
          withCredentials: true,
        }

        /*   {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        } */
      );
      const tokenResponse = response.data.token;
      console.log(tokenResponse);

      toast.success("Student registered successfully!");
      setTimeout(() => {
        navigate("/admin/readStudent");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to register student.";
      toast.error(errorMessage);
      console.error("Error registering student:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-8">
      <div className="flex flex-col md:flex-row gap-10 shadow-2xl rounded-2xl bg-white overflow-hidden max-w-4xl w-full">
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Attendance System</h1>
          <p>Create a new student account</p>
        </div>

        <div className="flex flex-col gap-5 p-8 w-full">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fname"
              className="font-medium text-sm text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-medium text-sm text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="font-medium text-sm text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="conPassword"
              className="font-medium text-sm text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="conPassword"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <ToastContainer />
            <button
              onClick={register}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewStudent;
