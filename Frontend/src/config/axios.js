import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,   // ✅ Success case
  (err) => {      // ❌ Error case
    const status = err.response?.status;
    if (status === 401) {
      localStorage.removeItem("token"); // token delete
      window.location.href = "/login";  // user ko login page bhej do
    }
    return Promise.reject(err); // error ko aage pass karo (taaki catch() me mile)
  }
);
export default axiosInstance;
