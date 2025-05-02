import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      console.log("Auth error occured. redirecting to login page . . .");
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    throw error.response.data;
  }
);
