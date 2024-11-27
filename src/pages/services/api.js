import axios from "axios";
import { toast } from "react-toastify";
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const API_BASE_URL = "https://api.gamtllp.com/api";
// const API_BASE_URL = "http://localhost:7070/api";




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
    const response = await API.post(`${API_BASE_URL}/login`, {
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
    const response = await API.post(`${API_BASE_URL}/employee/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const approveUser = async (userId) => {
  try {
    const response = await API.put(`${API_BASE_URL}/approveUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};
export const approvedPayment = async (userId) => {
  try {
    const response = await API.put(`${API_BASE_URL}/approve/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};


//contact from 
export const contactFrom = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Contact`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/registeruser`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const verifyOTP = async (userId, otp) => {
  if (!userId || !otp) {
    throw new Error("User ID and OTP are required");
  }

  try {
    // Use `userId` in the URL path
    const response = await API.post(`${API_BASE_URL}/verifyOTP/${userId}`, {
      otp: String(otp),
    });
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};
export const Withdrawal = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/withdrawal`,
      formData,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductData = async () => {
  try {
    const response = await API.get(`${API_BASE_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dialogue sessions:", error);
    throw error;
  }
};
export const fetchProductId = async (productId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/${productId}`
    );
    return response.data; // Return the product data from the API
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to load product data");
  }
};

export const ProductBookingApi = async (bookingData) => {
  try {
    // Send a POST request to the API to create the booking
    const response = await API.post(`${API_BASE_URL}/booking`,bookingData);
    return response.data; 
  } catch (error) {
    // Handle errors gracefully
    console.error("Error creating booking:", error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};
export const fetchBookingDataUserId = async (userId) => {
  try {
    const response = await API.get(`${API_BASE_URL}/bookings/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to load product data");
  }
};
export const deleteProductById = async (productId) => {
  try {
    const response = await API.delete(`${API_BASE_URL}/booking/${productId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Fetch All User
export const getAllUserInSuperadmin = async () => {
    const response = await API.get(`${API_BASE_URL}/alluser`);
    return response.data;
};

export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`${API_BASE_URL}/deleteuser/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

// Get All Products

export const AddBusinessCategories = async (formData) => {
  try {
    const response = await API.post(`${API_BASE_URL}/BusniessCategory`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  const response = await API.get(`${API_BASE_URL}/product`);
  return response.data;
};

// add category

export const getAllBusinessCategories = async () => {
  const response = await API.get(`${API_BASE_URL}/business-categories`);
  return response.data;
};

export const DeleteCategoryBusiness = async (id) => {
  try {
    const response = await API.delete(`${API_BASE_URL}/businessCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

export const AddProduct = async (formData) => {
  try {
    const response = await API.post(`${API_BASE_URL}/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const EditProduct = async (productId,formData) => {
  try {
    const response = await API.put(`${API_BASE_URL}/product/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await API.delete(`${API_BASE_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

//get all booking product user

export const getAllBookingProduct = async () => {
  const response = await API.get(`${API_BASE_URL}/allbooking`);
  return response.data;
};
export const getProductUserId = async (userId) => {
  const response = await API.get(`${API_BASE_URL}/bookings/${userId}`);
  return response.data;
};

//  get widthdrwa rewuest
export const GetWithdrawal = async () => {
  const response = await API.get(`${API_BASE_URL}/withdrawalRequests`);
  return response.data.data;
};

// payment request send 
export const AddPaymentDetails = async (formData) => {
  try {
    const response = await API.post(`${API_BASE_URL}/payment-details`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetallPaymets = async () => {
  const response = await API.get(`${API_BASE_URL}/getAllPaymentDetails`);
  return response.data;
};


export const getPaymentUserId = async (userId) => {
  const response = await API.get(`${API_BASE_URL}/payments/${userId}`);
  return response.data.PaymentDetails;
};

////

export const getIncomeById = async (userId) => {
  const response = await API.get(`${API_BASE_URL}/addincome/${userId}`);
  return response.data;
};
export const getAllIncome = async () => {
  const response = await API.get(`${API_BASE_URL}/addincome`);
  return response.data;
};

export const AddIncomeMenual = async (formData) => {
  try {
    const response = await API.post(`${API_BASE_URL}/addincome`, formData, {
    
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const EditIncomeMenual = async (userId,formData) => {
  try {
    const response = await API.put(`${API_BASE_URL}/addincome/${userId}`, formData, {
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteIcome = async (userId) => {
  try {
    const response = await API.delete(`${API_BASE_URL}/addincome/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

///      kjgjhbhhhvhgftuvhvuycu
export const getProfiteById = async (userId) => {
  const response = await API.get(`${API_BASE_URL}/profite/${userId}`);
  return response.data;
};