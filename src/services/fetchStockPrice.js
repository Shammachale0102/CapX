import axios from 'axios';

// Fetch live stock price for a given ticker
export const fetchStockPrice = async (ticker) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: ticker,
        interval: '5min',
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'BI4NTO2281BW52LU', // Use env variable if available
      },
    });

    const timeSeries = response.data["Time Series (5min)"];
    if (!timeSeries) {
      console.warn(`No time series data found for ticker: ${ticker}`);
      return 0; // Return 0 if data is unavailable
    }

    // Get the latest time and corresponding price
    const latestTime = Object.keys(timeSeries)[0];
    const latestPrice = timeSeries[latestTime]?.["4. close"];

    if (!latestPrice) {
      console.warn(`No closing price found for ticker: ${ticker} at time: ${latestTime}`);
      return 0;
    }

    return parseFloat(latestPrice); // Parse and return the latest price
  } catch (error) {
    console.error("Error fetching live stock price:", error.response?.data || error.message);
    return 0; // Return 0 in case of error
  }
};
