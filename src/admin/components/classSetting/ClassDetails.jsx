import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import {apiUrl} from "../../../Utility/Utility"

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [teachers] = useState([]);

  useEffect(() => {
    fetchClassDetails();
  }, []);

  const fetchClassDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/classes/${id}`);
      setClassData(response.data);
    } catch (error) {
      console.error("Error fetching class details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateClass = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/classes/${id}`, classData);
      alert("Class updated successfully!");
      navigate("/admin/readClasses");
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Failed to update class.");
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async () => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;
    try {
      setLoading(true);
      await axios.delete(`${apiUrl}/classes/${id}`);
      alert("Class deleted successfully!");
      navigate("/admin/readClasses");
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Failed to delete class.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const InputField = ({ label, name, type = "text", value, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );

  const SelectField = ({ label, name, value, options, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select a teacher</option>
        {options.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
    </div>
  );

  if (!classData || loading) {
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
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-8 px-4">
      <div className="flex flex-col gap-6 shadow-lg rounded-xl bg-white p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold text-center text-gray-800">Class Details</h2>

        <div className="flex flex-col gap-5 w-full">
          {/* Class Name */}
          <InputField
            label="Class Name"
            name="name"
            value={classData.name}
            onChange={handleChange}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={classData.description || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Assign Teacher */}
          <SelectField
            label="Assign Teacher"
            name="teacherId"
            value={classData.teacherId || ""}
            options={teachers}
            onChange={handleChange}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={updateClass}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
                loading ? "bg-yellow-300" : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              onClick={deleteClass}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
                loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

            <button
              onClick={() => navigate("/admin/readClasses")}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold text-white transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;