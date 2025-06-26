import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router";
// import { error } from "node:console"

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const api = "https://68219a2d259dad2655afc2ba.mockapi.io";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(`${api}/user`);

      const user = res.data.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!user) {
        toast.error("Email does not exist");
        setLoading(false);
        return;
      }

      if (user.password !== password) {
        toast.error("Password is incorrect");
        setLoading(false);
        return;
      }

      // localStorage.setItem("user", JSON.stringify(user));

      const trimmedEmail = email.trim().toLowerCase();

      if (trimmedEmail.endsWith("@admin.tuwaiq.sa")) {
        localStorage.removeItem;
        localStorage.setItem("username", user.username);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        localStorage.setItem("isAuthenticated", "true");
        navigate(`/admin/adminHome`);
      } else if (trimmedEmail.endsWith("@student.tuwaiq.sa")) {
        localStorage.removeItem;
        localStorage.setItem("username", user.username);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        localStorage.setItem("isAuthenticated", "true");
        navigate(`/student`);
      } else if (trimmedEmail.endsWith("teacher.tuwaiq.sa")) {
        localStorage.removeItem;
        localStorage.setItem("username", user.username);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        localStorage.setItem("isAuthenticated", "true");
        navigate(`/teacher`);
      } else if (trimmedEmail.endsWith("@principle.tuwaiq.sa")) {
        localStorage.removeItem;
        localStorage.setItem("username", user.username);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        localStorage.setItem("isAuthenticated", "true");
        navigate(`/principle/${user.id}`);
      } else {
        toast.error("Failed Login");
      }

      toast.success("Login successful!");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 min-h-screen px-4 py-6 md:py-12">
        <div className="mb-6 flex justify-end ">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:underline"
          >
            Back <SlArrowRight className="ml-1" />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl mb-6">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signin;
