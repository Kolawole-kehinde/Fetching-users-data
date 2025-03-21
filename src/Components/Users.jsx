import { useEffect, useState, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import api from "../services/axiosInstance";
import { useNavigate } from "react-router";

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Users from API
  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Unable to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) =>
    user.login?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      {/* The Search Input */}
      <div className="relative w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          aria-label="Search users"
        />
        <IoSearch className="absolute right-3 top-3 text-gray-400" />
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <div  className="flex items-center justify-center w-full h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full loader">
             {/* <p className="text-lg">Loading...</p> */}
             </div>
        </div>
       
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredUsers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {filteredUsers.map(({ id, login, avatar_url, name, bio }) => (
            <div
              key={id}
              onClick={() => navigate(`/user/${login}`)}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-700 transition"
            >
              <img
                src={avatar_url}
                alt={`Avatar of ${login}`}
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
              <h2 className="text-xl font-semibold mt-3">{login}</h2>
              {name && <p className="text-lg text-gray-300">{name}</p>}
              {bio && <p className="text-sm text-gray-400 mt-2">{bio}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No users found</p>
      )}
    </div>
  );
};

export default FetchUsers;
