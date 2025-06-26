import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://68219a2d259dad2655afc2ba.mockapi.io/user";

function StudentAttendance() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch users from the MockAPI
    axios
      .get(API_URL)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const updateAttendanceDays = (id, newCount) => {
    // Update attendanceDays in MockAPI
    axios
      .put(`${API_URL}/${id}`, { attendanceDays: newCount })
      .then(() => {
        // Update UI after successful API call
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === id
              ? { ...student, attendanceDays: newCount }
              : student
          )
        );
      })
      .catch((error) => console.error("Error updating attendance:", error));
  };

  const handleAbsent = (id, currentCount) => {
    const newCount = currentCount + 1;
    updateAttendanceDays(id, newCount);
  };

  const handlePresent = (id, currentCount) => {
    const newCount = Math.max(currentCount - 1, 0); // Prevent negative values
    updateAttendanceDays(id, newCount);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Attendance</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Attendance Days</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((user) => user.role === "student") // Filter users with role "student"
            .map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.attendanceDays || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() =>
                      handleAbsent(student.id, student.attendanceDays || 0)
                    }
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Absent
                  </button>
                  <button
                    onClick={() =>
                      handlePresent(student.id, student.attendanceDays || 0)
                    }
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Present
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendance;
