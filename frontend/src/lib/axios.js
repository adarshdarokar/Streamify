import axios from "axios";

// Auto detect host (localhost OR mobile IP)
const HOST = window.location.hostname; 

const BASE_URL =
  import.meta.env.MODE === "development"
    ? `http://${HOST}:5001/api`
    : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});
