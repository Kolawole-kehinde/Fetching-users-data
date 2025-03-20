import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { useNavigate, useParams } from "react-router";

const UserFullDetails = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (loading) {
    return <p className="text-white text-lg text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-white text-lg text-center mt-10">User not found.</p>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-1 bg-blue-600 text-white font-bold rounded-lg "
      >
        ← Back
      </button>

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
            Followers: {user.followers}
          </span>
          <span className="bg-green-600 px-4 py-2 rounded-lg text-sm">
            Repos: {user.public_repos}
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
