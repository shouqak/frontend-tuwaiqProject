import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../../../Utility/Utility";

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeacherDetails();
  }, []);

  const fetchTeacherDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/user/${id}`);
      setTeacher(response.data);
    } catch (error) {
      console.error("Error fetching Teacher details:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async () => {
    try {
      setLoading(true);
      await axios.delete(`${apiUrl}/user/${id}`);
      alert("Teacher deleted successfully!");
      navigate("/admin/readTeacher");
    } catch (error) {
      console.error("Error deleting Teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/user/${id}`, Teacher);
      alert("Teacher details updated successfully!");
      navigate("/admin/readTeacher");
    } catch (error) {
      console.error("Error updating Teacher details:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const InputField = ({ label, name, type, value, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md h-10 px-3 text-gray-800 focus:outline-none"
      />
    </div>
  );

  if (!Teacher || loading) {
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
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col items-start gap-8 shadow-lg rounded-lg bg-white p-6 w-full max-w-lg">
        <p className="text-lg font-semibold text-gray-700 text-center w-full">
          Teacher Details
        </p>
        <div className="flex flex-col gap-6 w-full">
          <InputField
            label="Full Name"
            name="fullname"
            type="text"
            value={Teacher.fullname}
            onChange={onChange}
          />
          
          <InputField
            label="Email"
            name="email"
            type="email"
            value={Teacher.email}
            onChange={onChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={Teacher.password}
            onChange={onChange}
          />
          

          <div className="flex items-center justify-center w-full gap-4 mt-4">
            <button
              onClick={update}
              disabled={loading}
              className={`px-6 py-2 font-semibold rounded-lg transition w-full ${
                loading ? "bg-yellow-300" : "bg-yellow-500 hover:bg-yellow-600"
              } text-white`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              onClick={deleteTeacher}
              disabled={loading}
              className={`px-6 py-2 font-semibold rounded-lg transition w-full ${
                loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={() => navigate("/admin/readTeacher")}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition w-full"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
