import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useNavigate } from "react-router";

/* interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or get from cookie
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}); */
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
}

const token = getCookie("accessToken");

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();

      const res = await axios.post(
        "https://attendancesystem-ar5v.onrender.com/auth/signin",
        { email: trimmedEmail, password },
        { withCredentials: true }
      );
      

      console.log("Response data:", res.data);

      const { accessToken, refreshToken, user } = res.data.data;

      if (!accessToken || !user) {
        throw new Error("Authentication failed: Missing token or user.");
      }

      // Save tokens securely (via backend HttpOnly cookie)
      // Optional: store user info in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Optionally set token in Axios (if not using HttpOnly cookies)
      localStorage.setItem("token", accessToken); // or skip if cookies

      // Redirect logic
      if (user.role === "admin" || trimmedEmail.endsWith("@admin.com")) {
        navigate("/admin");
      } else if (
        user.role === "student" ||
        trimmedEmail.endsWith("@student.tuwaiq.sa")
      ) {
        navigate(`/student/${user.id}`);
      } else if (
        user.role === "teacher" ||
        trimmedEmail.endsWith("@teacher.tuwaiq.sa")
      ) {
        navigate(`/teacher/${user.id}`);
      } else if (
        user.role === "principle" ||
        trimmedEmail.endsWith("@principle.tuwaiq.sa")
      ) {
        navigate(`/principle/${user.id}`);
      } else {
        toast.error("Login failed: Unsupported role.");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 min-h-screen px-4 py-6 md:py-12">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:underline"
          >
            <SlArrowLeft className="mr-1" /> Back
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
                  placeholder="email@example.com"
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
