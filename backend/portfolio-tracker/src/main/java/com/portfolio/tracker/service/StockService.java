package com.portfolio.tracker.service;

import com.portfolio.tracker.model.Stock;
import com.portfolio.tracker.repository.StockRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    // Updated method: accept both id and stock
    public Stock updateStock(Long id, Stock stock) {
        // Find the stock by id, if not found throw an exception
        Stock existingStock = stockRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Stock not found with id " + id));

        // Update the existing stock with new data
        existingStock.setStockName(stock.getStockName());
        existingStock.setTicker(stock.getTicker());
        existingStock.setQuantity(stock.getQuantity());
        existingStock.setBuyPrice(stock.getBuyPrice());

        // Save the updated stock
        return stockRepository.save(existingStock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

	public Stock getById(int id) {
		// TODO Auto-generated method stub
		return stockRepository.getById(id);
	}
}
