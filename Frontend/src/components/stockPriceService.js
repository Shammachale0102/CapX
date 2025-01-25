import axios from 'axios';

// Define a function to fetch stock price based on the stock ticker
export const fetchStockPrice = async (ticker) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/stock-price/${ticker}`);
      return response.data.price; // Assuming the response returns a `price` field
    } catch (error) {
      console.error("Error fetching stock price: ", error);
      throw error;
    }
  };
