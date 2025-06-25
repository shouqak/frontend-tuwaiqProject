import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

function AdminHome() {
  const name = localStorage.getItem("fullname") ;
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/");
    }
  }, [isAuthenticated, navigate]);

  const SettingsRow = ({ title, path }) => (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <p className="text-lg font-semibold">{title}</p>
      <Link to={path}>
        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
          {title} List
        </button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white">
        {/* Admin Navigation */}
      </div>

      <div className="flex flex-col items-center justify-center py-10 px-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Information</h2>
          <div className="text-lg">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Username:</span> {username}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-200">
            User Settings
          </h2>
          <SettingsRow title="Student Settings" path="/admin/readStudent" />
          <SettingsRow title="Teacher Settings" path="/admin/readTeacher" />
          <SettingsRow title="Principle Settings" path="/admin/readPrinciple" />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
