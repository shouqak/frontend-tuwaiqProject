import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
// import AdminNav from "../../components/admin/AdminNav";

const ReadAllTeacher = () => {
  const [Teacher, setTeacher] = useState([]);
  const [searchTeacher, setSearchTeacher] = useState("");
  const [loading, setLoading] = useState(false);
  const api = "https://68219a2d259dad2655afc2ba.mockapi.io";
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/user`);
      const filteredTeacher = response.data.filter(
        (user) => user.role === "Teacher"
      );
      setTeacher(filteredTeacher);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching Teacher:", error);
    }
  };

  const filteredTeacher = Teacher.filter(
    (Teacher) =>
      Teacher.fullname.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      Teacher.username.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      Teacher.email.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  if (!loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>{/* <AdminNav /> */}</div>
      </div>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
        <p className="text-3xl font-bold text-blue-600 mb-6">Teacher List</p>

        {/* Search Input */}
        <div className="w-full max-w-3xl mb-6 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name, username, or email"
            value={searchTeacher}
            onChange={(e) => setSearchTeacher(e.target.value)}
            className="w-full border rounded-md h-10 px-4 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div>
            <Link to="/admin/createTeacher">
              <button className="py-2 px-2 w-30 bg-blue-600 rounded-lg text-white font-bold">
                Add Teacher
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">More Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeacher.map((Teacher, index) => (
                <tr
                  key={Teacher.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-gray-700">
                    {Teacher.fullname}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {Teacher.username}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{Teacher.email}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/TeacherDetails/${Teacher.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReadAllTeacher;
