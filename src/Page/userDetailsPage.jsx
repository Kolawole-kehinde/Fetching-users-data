import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/axiosInstance";

const UserFullDetails = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details
  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.get(`/users/${username}`);
      setUser(data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // Loading state
  if (loading) {
    return <p className="text-white text-lg text-center mt-10">Loading...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-red-500 text-lg text-center mt-10">{error}</p>;
  }

  // No user found
  if (!user) {
    return <p className="text-white text-lg text-center mt-10">User not found.</p>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      {/* User Profile Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name || user.login}</h2>
        <p className="text-lg text-gray-300">@{user.login}</p>

        {user.bio && <p className="text-sm text-gray-400 mt-3">{user.bio}</p>}

        <div className="mt-4">
          <p className="text-sm">📍 {user.location || "Location not available"}</p>
          <p className="text-sm">📧 {user.email || "Email not available"}</p>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <span className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
            Followers: {user.followers ?? 0}
          </span>
          <span className="bg-green-600 px-4 py-2 rounded-lg text-sm">
            Repos: {user.public_repos ?? 0}
          </span>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6 text-blue-400 hover:underline"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserFullDetails;
