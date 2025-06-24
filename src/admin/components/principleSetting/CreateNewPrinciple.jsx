import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
// import AdminNav from "../../components/admin/AdminNav";

function CreateNewPrinciple() {
  //! error value
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  // ! error message
  const [fullnameErr, setFullnameErr] = useState(
    "Full name is required and must be at least 3 characters long."
  );
  const [UsernameErr, setUsernameErr] = useState(
    "Username is required and must be at least 3 characters long."
  );
  const [emailErr, setEmailErr] = useState(
    "Enter a valid email that includes (@principle.tuwaiq.sa)"
  );
  const [passwordErr, setPasswordErr] = useState(
    "Password must be at least 8 characters long."
  );
  const [conPasswordErr, setConPasswordErr] = useState(
    "Please confirm your password."
  );

  const nav = useNavigate();
  const api = "https://68219a2d259dad2655afc2ba.mockapi.io";

  const register = async () => {
    let isValid = true;

    // ! Full name validation
    if (fullname === "") {
      isValid = false;
      toast.error("Full name is required and cannot be left empty");
    } else if (fullname.length < 3) {
      isValid = false;
      toast.error("Full name must be at least 3 characters long");
    }

    // ! Username validation
    if (username === "") {
      isValid = false;
      toast.error("Username is required and cannot be left empty");
    } else if (username.length < 3) {
      isValid = false;
      toast.error("Username must be at least 3 characters long");
    }

    // ! Email validation
    if (email === "") {
      isValid = false;
      toast.error("Email is required and cannot be left empty");
    } else if (!email.includes("principle.tuwaiq.sa")) {
      isValid = false;
      toast.error("Email must include @principle.tuwaiq.sa");
    }

    // ! Password validation
    if (password === "") {
      isValid = false;
      toast.error("Password is required and cannot be left empty");
    } else if (password.length < 8) {
      isValid = false;
      toast.error("Password must be at least 8 characters long");
    }

    // ! Confirm password validation
    if (password !== conPassword) {
      isValid = false;
      toast.error("The password and confirm password do not match.");
    }

    if (isValid) {
      try {
        // Sending data to the API
        const response = await axios.post(`${api}/user`, {
          fullname,
          username,
          email,
          password,
          role: "principle",
        });

        // Save data to local storage
        localStorage.setItem("fullname", fullname);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("role", "principle");
        nav("/admin/readPrinciple");
        // Success toast
        toast.success("Registration completed successfully!");
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An error occurred while registering. Please try again.");
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  return (
    // todo : register form
    <div>
      <div>
        {/* <AdminNav /> */}
      </div>
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <div className=" flex items-center gap-7 shadow-2xl rounded-2xl bg-gray-100">
          <div className="flex flex-col justify-start p-3">
            <p className="text-xs font-medium">
              <span className="text-4xl font-bold">Attendance</span> system
            </p>
            <p className="text-lg font-medium ">
              Create new <b>Principle</b>
            </p>
          </div>
          <div className="flex flex-col gap-4 w-100 p-4">
            {/* //! register form  */}
            {/* Full name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fname" className="font-medium text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="fname"
                className="border rounded-lg h-6 pl-2"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <span className="text-xs text-gray-700">{fullnameErr}</span>
            </div>
            {/* username */}
            <div className="flex flex-col">
              <label htmlFor="username" className="font-medium text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border rounded-lg h-6 pl-2 "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="text-xs text-gray-700">{UsernameErr}</span>
            </div>
            {/* email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-sm">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="border rounded-lg h-6 pl-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-xs text-gray-700">{emailErr}</span>
            </div>
            {/* password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="font-medium text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border rounded-lg h-6 pl-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-xs text-gray-700">{passwordErr}</span>
            </div>
            {/* confirm password */}
            <div className="flex flex-col">
              <label htmlFor="conPassword" className="font-medium text-sm">
                Confirm Password{" "}
              </label>
              <input
                type="password"
                id="conPassword"
                className="border rounded-lg h-6 pl-2"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
              <span className="text-xs text-gray-700">{conPasswordErr}</span>
            </div>
            <div>
              <ToastContainer />
              <button
                onClick={register}
                className="w-full bg-blue-500 mt-3 h-8 rounded-lg text-white text-sm font-medium"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPrinciple;

