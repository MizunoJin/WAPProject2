import axios from "axios";

export const axiosClient = axios.create({
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (config.headers !== undefined) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response?.status) {
      case 403:
        console.error("Forbidden request");
        return Promise.reject({ message: "Forbidden request" });
      case 404:
        console.error("Resource not found");
        return Promise.reject({ message: "Resource not found" });
      case 408:
        console.error("Request timeout");
        return Promise.reject({ message: "Request timeout" });
      case 500:
        console.error("Internal server error");
        return Promise.reject({ message: "Internal server error" });
      default:
        break;
    }
    return Promise.reject(error);
  }
);
