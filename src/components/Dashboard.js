import React, { useState, useEffect, useCallback } from 'react';
import StockForm from './StockForm';
import StockList from './StockList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchStockPrice } from '../services/fetchStockPrice';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [metrics, setMetrics] = useState({
    totalValue: 0,
    topStock: '',
    distribution: [],
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Calculate portfolio metrics
  const calculateMetrics = (stocks) => {
    if (stocks.length === 0) {
      setMetrics({
        totalValue: 0,
        topStock: 'N/A',
        distribution: [],
      });
      return;
    }

    const totalValue = stocks.reduce(
      (sum, stock) => sum + stock.quantity * stock.livePrice,
      0
    );

    const distribution = stocks.map((stock) => ({
      name: stock.stockName,
      ticker: stock.ticker,
      percentage: ((stock.quantity * stock.livePrice) / totalValue) * 100 || 0,
    }));

    const topStockObj = distribution.reduce((top, stock) =>
      stock.percentage > top.percentage ? stock : top
    );

    setMetrics({
      totalValue,
      topStock: `${topStockObj.name} (${topStockObj.ticker}) (${topStockObj.percentage.toFixed(2)}%)`,
      distribution,
    });
  };

  // Load initial stocks
  const loadStocks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/stocks');
      const stockData = response.data;

      const updatedStocks = await Promise.all(
        stockData.map(async (stock) => {
          try {
            const livePrice = await fetchStockPrice(stock.ticker);
            return { ...stock, livePrice };
          } catch (err) {
            console.error(`Failed to fetch price for ${stock.ticker}:`, err);
            return { ...stock, livePrice: stock.livePrice || 0 }; // Use existing price or 0
          }
        })
      );

      setStocks(updatedStocks);
      calculateMetrics(updatedStocks);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      setError('Unable to fetch portfolio data.');
    }
  }, []);

  // Update stock prices periodically
  const updateStockPrices = useCallback(async () => {
    try {
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          try {
            const livePrice = await fetchStockPrice(stock.ticker);
            return { ...stock, livePrice };
          } catch (err) {
            console.error(`Error updating price for ${stock.ticker}:`, err);
            return stock; // Keep existing stock data if fetch fails
          }
        })
      );

      setStocks(updatedStocks);
      calculateMetrics(updatedStocks);
    } catch (err) {
      console.error('Error updating stock prices:', err);
      setError('Unable to update stock prices.');
    }
  }, [stocks]);

  // Effect to load stocks and set interval for updates
  useEffect(() => {
    loadStocks();

    // Set up interval to update stock prices every 5 minutes
    const intervalId = setInterval(() => {
      updateStockPrices();
    }, 300000); // 300,000ms = 5 minutes

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [loadStocks, updateStockPrices]);

  const handleAddStock = async (stock) => {
    try {
      await axios.post('http://localhost:8080/api/stocks', stock);
      loadStocks();
    } catch (err) {
      console.error('Error adding stock:', err);
      setError('Unable to add stock.');
    }
  };

  const handleEdit = (object) => {
    navigate(`/edit/${object.id}`);
  };

  const handleDeleteStock = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/stocks/${id}`);
      loadStocks(); // Refresh the stock list after deletion
    } catch (err) {
      console.error('Error deleting stock:', err);
      setError('Unable to delete stock.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Portfolio Dashboard</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.section}>
        <h3>Portfolio Metrics</h3>
        {stocks.length === 0 ? (
          <div style={styles.metric}>No portfolio data available.</div>
        ) : (
          <>
            <div style={styles.metric}>
              <strong>Total Portfolio Value:</strong> ${metrics.totalValue.toFixed(2)}
            </div>
            <div style={styles.metric}>
              <strong>Top-Performing Stock:</strong> {metrics.topStock}
            </div>
            <div style={styles.metric}>
              <strong>Portfolio Distribution:</strong>
              <ul style={styles.list}>
                {metrics.distribution.map((stock, index) => (
                  <li key={index}>
                    {stock.name} ({stock.ticker}): {stock.percentage.toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div style={styles.section}>
        <StockForm onSubmit={handleAddStock} />
      </div>

      <div style={styles.section}>
        <h3>Your Portfolio</h3>
        <StockList
          stocks={stocks}
          onEdit={handleEdit}
          onDelete={handleDeleteStock}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '20px auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: '20px',
  },
  metric: {
    margin: '10px 0',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
};

export default Dashboard;
