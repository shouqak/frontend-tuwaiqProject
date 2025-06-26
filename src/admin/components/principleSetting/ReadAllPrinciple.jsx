import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { apiUrl } from "../../../Utility/Utility";
// import AdminNav from "../../components/admin/AdminNav";

const ReadAllPrinciple = () => {
  const [Principles, setPrinciples] = useState([]);
  const [searchPrinciple, setSearchPrinciple] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrinciples();
  }, []);

  const fetchPrinciples = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/user`);
      const filteredPrinciples = response.data.filter(
        (user) => user.role === "principle"
      );
      setPrinciples(filteredPrinciples);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching Principles:", error);
    }
  };

  const filteredPrinciples = Principles.filter(
    (Principle) =>
      Principle.fullname.toLowerCase().includes(searchPrinciple.toLowerCase()) ||
      //Principle.username.toLowerCase().includes(searchPrinciple.toLowerCase()) ||
      Principle.email.toLowerCase().includes(searchPrinciple.toLowerCase())
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
        <p className="text-3xl font-bold text-blue-600 mb-6">Principle List</p>

        {/* Search Input */}
        <div className="w-full max-w-3xl mb-6 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name, or email"
            value={searchPrinciple}
            onChange={(e) => setSearchPrinciple(e.target.value)}
            className="w-full border rounded-md h-10 px-4 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div>
            <Link to="/admin/createPrinciple">
              <button className="py-2 px-2 w-30 bg-blue-600 rounded-lg text-white font-bold">
                Add Principle
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
                {/* <th className="px-4 py-2 text-left">Username</th> */}
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">More Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrinciples.map((Principle, index) => (
                <tr
                  key={Principle.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-gray-700">
                    {Principle.fullname}
                  </td>
                 {/*  <td className="px-4 py-2 text-gray-700">
                    {Principle.username}
                  </td> */}
                  <td className="px-4 py-2 text-gray-700">{Principle.email}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/PrincipleDetails/${Principle.id}`}
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

export default ReadAllPrinciple;
