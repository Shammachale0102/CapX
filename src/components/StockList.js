import React from 'react';
import PropTypes from 'prop-types';

function StockList({ stocks, onEdit, onDelete }) {
  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
      backgroundColor: '#f2f2f2',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    button: {
      marginRight: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
  };

  return (
    <table style={styles.table} aria-label="Stock List">
      <thead>
        <tr>
          <th style={styles.th} scope="col">Name</th>
          <th style={styles.th} scope="col">Ticker</th>
          <th style={styles.th} scope="col">Quantity</th>
          <th style={styles.th} scope="col">Buy Price</th>
          <th style={styles.th} scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <tr key={stock.id}>
              <td style={styles.td}>{stock.stockName || stock.name || 'N/A'}</td>
              <td style={styles.td}>{stock.ticker}</td>
              <td style={styles.td}>{stock.quantity}</td>
              <td style={styles.td}>${stock.buyPrice}</td>
              <td style={styles.td}>
                <button style={styles.button} onClick={() => onEdit(stock)}>
                  Edit
                </button>
                <button style={styles.button} onClick={() => onDelete(stock.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>
              No stocks available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

StockList.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ticker: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      buyPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StockList;
