import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { apiUrl } from "../../../Utility/Utility";

const ReadAllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/classes`);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;
    try {
      await axios.delete(`${apiUrl}/classes/${id}`);
      toast.success("Class deleted successfully!");
      fetchClasses(); // Refresh list
    } catch (error) {
      console.error("Failed to delete class:", error);
      toast.error("Failed to delete class.");
    }
  };

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cls.teacherName && cls.teacherName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Class List</h1>

        {/* Search + Add Button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search by name or teacher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <Link to="/admin/createClass">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Class
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Class Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Teacher</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No classes found.
                  </td>
                </tr>
              ) : (
                filteredClasses.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{cls.name}</td>
                    <td className="px-6 py-4 text-gray-600">{cls.description || "-"}</td>
                    <td className="px-6 py-4">{cls.teacherName || "Unassigned"}</td>
                    <td className="px-6 py-4 text-right space-x-2 space-x-reverse">
                      <Link
                        to={`/admin/classDetails/${cls.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleDelete(cls.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
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

export default ReadAllClasses;