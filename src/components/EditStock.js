import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditStock() {
  const { id } = useParams(); // Retrieve id from the URL
  console.log("id from param",id)
  const [stock, setStock] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stocks/${id}`);
        setStock(response.data);
      } catch (err) {
        console.error('Error fetching stock:', err);
        setError('Stock not found.');
        console.log(id);
        
      }
    };
    if (id) fetchStock(); // Ensure fetchStock runs only if id is present
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/stocks/${id}`, stock);
      navigate('/dashboard'); // Redirect back to the dashboard after successful update
    } catch (err) {
      console.error('Error updating stock:', err);
      setError('An error occurred while updating the stock.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  return (
    <div>
      <h3>Edit Stock</h3>
      {error && <div style={styles.error}>{error}</div>}
      {stock ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Stock Name:</label>
            <input
              type="text"
              name="stockName"
              value={stock.stockName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ticker:</label>
            <input
              type="text"
              name="ticker"
              value={stock.ticker}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={stock.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Buy Price:</label>
            <input
              type="number"
              name="buyPrice"
              value={stock.buyPrice}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <p>Loading stock...</p>
      )}
    </div>
  );
}

const styles = {
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
};

export default EditStock;
