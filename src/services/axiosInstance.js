import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com", // Correct base URL
  headers: {
    "Accept": "application/vnd.github.v3+json", // Recommended header for GitHub API
  },
});

export default api;
