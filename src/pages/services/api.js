import axios from "axios";
import { toast } from "react-toastify";
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const API_BASE_URL = 'http://localhost:8080';

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
export const loginSuperAdmin = async (email, password) => {
  try {
    const response = await API.post(`${API_BASE_URL}/api/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await API.post(`${API_BASE_URL}/api/employee/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const contactFrom = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Contact`,  data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/registeruser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const fetchProductData = async () => {
  try {
    const response = await API.get(`${API_BASE_URL}/api/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dialogue sessions:", error);
    throw error;
  }
};
export const fetchProductId = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
    console.log(response.data)
    return response.data; // Return the product data from the API
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to load product data");
  }
};
export const fetchBookingDataUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/bookings/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to load product data");
  }
};
export const deleteProductById = async (productId) => {
  try {
    const response = await API.delete(`/booking/${productId}`, {
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



//Fetch All User 
export const getAllUserInSuperadmin = async () => {
  try {
    const response = await API.get(`${API_BASE_URL}/api/alluser`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dialogue sessions:", error);
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(
      `/deleteuser/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};




