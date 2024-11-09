import axios from "axios";
import { toast } from "react-toastify";
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL: ", process.env.REACT_APP_API_URL);

API.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Internal server error occurred";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/employee/login", {
      email,
      password,
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Propagate the error to the caller
  }
};
export const contactFrom = async (data) => {
  try {
    const response = await axios.post("http://localhost:8080/api/Contact",  data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Propagate the error to the caller
  }
};

//dailog seccion
export const fetchProductData = async () => {
  try {
    const response = await API.get('http://localhost:8080/api/product');
    return response.data;
  } catch (error) {
    console.error("Error fetching dialogue sessions:", error);
    throw error;
  }
};
