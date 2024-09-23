import axios from "axios";

// Set the base URL for all axios requests
const baseURL = import.meta.env.VITE_API_ORIGIN || "http://localhost:5000";
axios.defaults.baseURL = baseURL;

// Set credentials to true
axios.defaults.withCredentials = true;

export default axios;
