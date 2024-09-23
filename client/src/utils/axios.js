import axios from "axios";

// Set the base URL for all axios requests
console.log("process");
const baseURL = import.meta.env.REACT_APP_API_ORIGIN || "http://localhost:5000";
axios.defaults.baseURL = baseURL;

// Set credentials to true
axios.defaults.withCredentials = true;

export default axios;
