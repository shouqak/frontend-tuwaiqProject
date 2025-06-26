import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../../../Utility/Utility";

function CreateNewClass() {
  // State values
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState();
  const [dateStartAt, setDateStartAt] = useState("");
  const [dateEndAt, setDateEndAt] = useState("");
  const [timeStartAt, setTimeStartAt] = useState("");
  const [timeEndAt, setTimeEndAt] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [studentIds, setStudentIds] = useState([]);

  // Loader & Data
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  const navigate = useNavigate();

  // Fetch teachers and students on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user`);

        const teacherList = res.data.filter((u) => u.role === "Teacher");
        const studentList = res.data.filter((u) => u.role === "Student");

        setTeachers(teacherList);
        setStudents(studentList);
      } catch (error) {
        toast.error("Failed to load users. Please try again.");
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);

  const register = async () => {
    if (!className || className.length < 3) {
      toast.error("Class name is required and must be at least 3 characters");
      return;
    }

    if (!teacherId) {
      toast.error("Please select a teacher");
      return;
    }

    if (new Date(dateStartAt) >= new Date(dateEndAt)) {
      toast.error("Start date must be before end date.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/classes`, {
        name: className,
        description,
        location,
        capacity,
        dateStartAt,
        dateEndAt,
        timeStartAt,
        timeEndAt,
        teacherId,
        studentIds,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("createdClass", JSON.stringify(response.data));
      toast.success("Class created successfully!");
      navigate("/admin/readClasses");
    } catch (error) {
      console.error("Error during class creation:", error);
      toast.error("An error occurred while creating the class. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentToggle = (id) => {
    setStudentIds((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id]
    );
  };

  if (fetchingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teachers and students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-8">
      <div className="flex flex-col md:flex-row gap-10 shadow-2xl rounded-2xl bg-white overflow-hidden max-w-5xl w-full">
        {/* Left Info Section */}
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Attendance System</h1>
          <p className="text-lg opacity-90">Register a new class with teacher and students</p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-5 p-8 w-full">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); register(); }}>

            {/* Class Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="className" className="font-medium text-sm text-gray-700">
                Class Name
              </label>
              <input
                type="text"
                id="className"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g., Math 101"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-medium text-sm text-gray-700">
                Description (Optional)
              </label>
              <textarea
                id="description"
                rows="3"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter optional description"
              ></textarea>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <label htmlFor="location" className="font-medium text-sm text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Room A"
              />
            </div>

            {/* Capacity */}
            <div className="flex flex-col gap-1">
              <label htmlFor="capacity" className="font-medium text-sm text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                min="1"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="dateStartAt" className="font-medium text-sm text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="dateStartAt"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateStartAt}
                onChange={(e) => setDateStartAt(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="dateEndAt" className="font-medium text-sm text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="dateEndAt"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateEndAt}
                onChange={(e) => setDateEndAt(e.target.value)}
              />
            </div>

            {/* Start Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="timeStartAt" className="font-medium text-sm text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                id="timeStartAt"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={timeStartAt}
                onChange={(e) => setTimeStartAt(e.target.value)}
              />
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="timeEndAt" className="font-medium text-sm text-gray-700">
                End Time
              </label>
              <input
                type="time"
                id="timeEndAt"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={timeEndAt}
                onChange={(e) => setTimeEndAt(e.target.value)}
              />
            </div>

            {/* Assign Teacher */}
            <div className="flex flex-col gap-1">
              <label htmlFor="teacher" className="font-medium text-sm text-gray-700">
                Assign Teacher
              </label>
              <select
                id="teacher"
                className="border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.fullname} ({teacher.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Assign Students */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm text-gray-700">
                Assign Students
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50 space-y-2">
                {students.length === 0 && (
                  <p className="text-sm text-gray-500">No students found.</p>
                )}
                {students.map((student) => (
                  <label key={student.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={studentIds.includes(student.id)}
                      onChange={() => handleStudentToggle(student.id)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{student.fullname}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <ToastContainer />
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition-colors text-white font-medium py-2.5 rounded-lg`}
              >
                {loading ? "Creating..." : "Register Class"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewClass;