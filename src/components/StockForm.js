import React, { useState } from 'react';

function StockForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    stockName: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data before submitting
    if (!formData.stockName || !formData.ticker || !formData.quantity || !formData.buyPrice) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit({
      stockName: formData.stockName,
      ticker: formData.ticker,
      quantity: parseFloat(formData.quantity),
      buyPrice: parseFloat(formData.buyPrice),
    });
    setFormData({ stockName: '', ticker: '', quantity: '', buyPrice: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="stockName"
        value={formData.stockName}
        onChange={handleChange}
        placeholder="Stock Name"
        style={styles.input}
      />
      <input
        type="text"
        name="ticker"
        value={formData.ticker}
        onChange={handleChange}
        placeholder="Ticker"
        style={styles.input}
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        style={styles.input}
      />
      <input
        type="number"
        name="buyPrice"
        value={formData.buyPrice}
        onChange={handleChange}
        placeholder="Buy Price"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Stock</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    padding: '8px',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default StockForm;
