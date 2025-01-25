import React, { useState, useEffect, useCallback } from 'react';
import { getStocks, addStock, updateStock, deleteStock } from '../services/api';
import Dashboard from '../components/Dashboard';  // Correct path based on where your Dashboard component is located
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';


function PortfolioPage() {
  const [stocks, setStocks] = useState([]);
  const [metrics, setMetrics] = useState({
    totalValue: 0,
    topStock: '',
    distribution: [],
  });

  const calculateMetrics = (stocks) => {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.quantity * stock.currentPrice, 0);
    const topStock = stocks.length > 0 ? stocks[0].name : 'N/A';
    const distribution = stocks.map((stock) => ({
      name: stock.name,
      ticker: stock.ticker,
      percentage: ((stock.quantity * stock.currentPrice) / totalValue) * 100 || 0,
    }));

    setMetrics({ totalValue, topStock, distribution });
  };

  const loadStocks = useCallback(async () => {
    const data = await getStocks();
    setStocks(data);
    calculateMetrics(data);
  }, []);

  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  const handleAddStock = async (stock) => {
    await addStock(stock);
    loadStocks();
  };

  const handleUpdateStock = async (id, stock) => {
    await updateStock(id, stock);
    loadStocks();
  };

  const handleDeleteStock = async (id) => {
    await deleteStock(id);
    loadStocks();
  };

  return (
    <div>
      <Dashboard metrics={metrics} />
      <StockForm onSubmit={handleAddStock} />
      <StockList stocks={stocks} onEdit={handleUpdateStock} onDelete={handleDeleteStock} />
    </div>
  );
}

export default PortfolioPage;



