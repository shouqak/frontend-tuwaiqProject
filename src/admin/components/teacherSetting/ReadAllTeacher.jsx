import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;
import NavbarAdmin from "../adminSetting/NavbarAdmin";
// import AdminNav from "../../components/admin/AdminNav";

const ReadAllTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //setLoading(true);

      // Fetch teachers
      const teacherRes = await axios.get(`${API_URL}admin/users`);
      const filteredTeachers = teacherRes.data.filter((user) => {
        user.role === "teacher";
        console.log("this is a user", user);
      });

      // Fetch classes
      const classRes = await axios.get(`${API_URL}class`);

      // Map classId → className for easy lookup
      const classMap = {};
      classRes.data.forEach((cls) => {
        classMap[cls.id] = cls.name;
      });

      // Add className field to each teacher
      const enhancedTeachers = filteredTeachers.map((teacher) => ({
        ...teacher,
        className: classMap[teacher.classId] || "Unassigned",
      }));

      setTeachers(enhancedTeachers);
      setClasses(classRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /*   if (!loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }
 */
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
        <p className="text-3xl font-bold text-blue-600 mb-6">Teacher List</p>

        {/* Search Input */}
        <div className="w-full max-w-3xl mb-6 flex gap-2 items-center px-4 sm:px-0">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-md h-10 px-4 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <Link to="/admin/createTeacher">
            <button className="py-2 px-4 bg-blue-600 rounded-lg text-white font-bold">
              Add Teacher
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Assigned Class
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No teachers found.
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher, index) => (
                  <tr
                    key={teacher.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-700">
                      {teacher.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{teacher.email}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {teacher.className}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/TeacherDetails/${teacher.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReadAllTeacher;
