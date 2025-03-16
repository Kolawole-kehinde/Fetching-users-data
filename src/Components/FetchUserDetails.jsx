import React, { useState } from "react";
import api from '../services/axiosInstance'

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      // Fetch list of users
      const response = await api.get("/users");
  
      // Fetch detailed data for each user
      const usersWithDetails = await Promise.all(
        response.data.map(async (user) => {
          const userDetails = await api.get(`/users/${user.login}`);
          return userDetails.data; // Return full user details
        })
      );
  
      setUsers(usersWithDetails);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  

  

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen">
      <button
        onClick={getUsers}
        className="mb-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        Fetch GitHub Users
      </button>

      {loading && <p className="text-white text-lg">Loading...</p>}

      {/* Display Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            {/* Profile Image */}
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />

            {/* User Info */}
            <h2 className="text-xl font-semibold mt-3">{user.login}</h2>
            {user.name && <p className="text-lg text-gray-300">{user.name}</p>}

            {/* Bio */}
            {user.bio && <p className="text-sm text-gray-400 mt-2">{user.bio}</p>}

            {/* Location */}
            {user.location && (
              <p className="text-sm text-gray-300 mt-2">📍 {user.location}</p>
            )}

            {/* Email */}
            <p className="text-sm text-gray-300 mt-2">
              📧 {user.email ? user.email : "Not provided"}
            </p>

            {/* Followers & Repos */}
            <div className="mt-4 flex gap-4">
              <span className="bg-blue-600 p-2 rounded-lg text-sm text-center">
                Followers: {user.followers}
              </span>
              <span className="bg-green-600 p-2 rounded-lg text-sm text-center">
                Repos: {user.public_repos}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchUsers;
