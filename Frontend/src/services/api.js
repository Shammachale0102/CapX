import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Your backend API URL

// Utility function to get the token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication token is missing. Please login again.');
  }
  return token;
};

// Handle common error responses
const handleError = (error, action) => {
  console.error(`Error in ${action}:`, error);
  if (error.response && error.response.status === 401) {
    // Unauthorized - Token might be expired
    window.location.href = '/login';  // Redirect to login page
  } else {
    throw error;  // Rethrow error to handle it at the call site
  }
};

// Fetching portfolio metrics (e.g., total value, top stock, distribution)
export const getPortfolioMetrics = async () => {
  try {
    const response = await fetch('/api/portfolio-metrics'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data; // Return the portfolio metrics data
  } catch (error) {
    throw error; // Handle errors as needed
  }
};

// Fetching stocks
export const getStocks = async () => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/stocks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error, 'getStocks');
  }
};

// Adding a stock
export const addStock = async (stock) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_URL}/stocks`, stock, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error, 'addStock');
  }
};

// Updating a stock
export const updateStock = async (id, stock) => {
  const token = getAuthToken();
  try {
    const response = await axios.put(`${API_URL}/stocks/${id}`, stock, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error, 'updateStock');
  }
};

// Deleting a stock
export const deleteStock = async (id) => {
  const token = getAuthToken();
  try {
    const response = await axios.delete(`${API_URL}/stocks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error, 'deleteStock');
  }
};

// User login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    console.log('Login successful:', response.data); // Log the response data for debugging
    localStorage.setItem('authToken', response.data.token);  // Store token in localStorage
    window.location.href = '/';  // Redirect to the home page after login
    return response.data;  // Return the response data (e.g., token)
  } catch (error) {
    // Detailed logging for different error scenarios
    if (error.response) {
      console.error("Login failed with response:", error.response);
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      alert("Error during login: " + error.response.data.message || "An error occurred during login. Please try again.");
    } else if (error.request) {
      console.error("No response received from the server:", error.request);
      alert("No response received from the server. Please check your connection.");
    } else {
      console.error("Error in setting up the request:", error.message);
      alert("Error in the login process: " + error.message);
    }
    console.error("Full error:", error);  // Log the full error object for debugging
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    window.location.href = '/login';  // Redirect to login page after registration
    return response.data; // Handle the response (e.g., show a success message)
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

// Logout user (removes the token)
export const logoutUser = () => {
  localStorage.removeItem('authToken');  // Remove token from localStorage
  window.location.href = '/login';  // Redirect to login page after logout
};
