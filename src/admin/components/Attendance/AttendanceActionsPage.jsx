import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const AttendanceActionsPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      studentName: "Ahmed Ali",
      reason: "Sick",
      date: "2025-04-01",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Sarah Ahmed",
      reason: "Family Event",
      date: "2025-04-02",
      status: "Pending",
    },
    {
      id: 3,
      studentName: "Omar Khalid",
      reason: "Medical Appointment",
      date: "2025-04-03",
      status: "Pending",
    },
  ]);

  const handleAccept = (id) => {
    const updatedRequests = leaveRequests.map((req) =>
      req.id === id ? { ...req, status: "Accepted" } : req
    );
    setLeaveRequests(updatedRequests);
    toast.success(`Leave request #${id} accepted`);
  };

  const handleReject = (id) => {
    const updatedRequests = leaveRequests.map((req) =>
      req.id === id ? { ...req, status: "Rejected" } : req
    );
    setLeaveRequests(updatedRequests);
    toast.arguments(`Leave request #${id} rejected`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Attendance Management</h1>

        {/* Accept / Reject Leaves */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Leave Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Student Name</th>
                  <th className="px-4 py-2 text-left">Reason</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaveRequests.length > 0 ? (
                  leaveRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-4 py-2">{req.studentName}</td>
                      <td className="px-4 py-2">{req.reason}</td>
                      <td className="px-4 py-2">{req.date}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block px-3 py-1 text-sm font-semibold rounded ${
                            req.status === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : req.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded transition"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

</div>       
    </div>
  );
};

export default AttendanceActionsPage;