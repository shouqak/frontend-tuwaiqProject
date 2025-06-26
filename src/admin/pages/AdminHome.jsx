import { useEffect } from "react"
import { Link, useNavigate } from "react-router"
import NavbarAdmin from "../components/adminSetting/NavbarAdmin"

function AdminHome() {
  const name = localStorage.getItem("fullname")
  const username = localStorage.getItem("username")
  const email = localStorage.getItem("email")

  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  /*   useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]); */

  const SettingsRow = ({ title, path }) => (
     <Link to={path}>
      <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition duration-150">
        <span className="text-lg font-medium text-gray-800">{title}</span>
        <span className="text-blue-500 hover:text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-gray-100">

 <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="bg-blue-600 text-white py-6 text-center">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>

      {/* Settings Links */}
      <div className="divide-y divide-gray-200">
        <SettingsRow title="Student Settings" path="/admin/readStudent" />
        <SettingsRow title="Teacher Settings" path="/admin/readTeacher" />
        <SettingsRow title="Principal Settings" path="/admin/readPrinciple" />
        <SettingsRow title="Class Settings" path="/admin/readClasses" />
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AdminHome
