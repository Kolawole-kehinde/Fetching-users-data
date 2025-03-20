import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { useNavigate } from "react-router";

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen">
      {loading && <p className="text-white text-lg">Loading...</p>}

      {/* Display Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
            onClick={() => navigate(`/user/${user.login}`)} // Redirect on click
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-3">{user.login}</h2>
            {user.name && <p className="text-lg text-gray-300">{user.name}</p>}
            {user.bio && <p className="text-sm text-gray-400 mt-2">{user.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchUsers;
