package com.portfolio.tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.portfolio.tracker.model.Portfolio;
import com.portfolio.tracker.repository.PortfolioRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioValueService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private StockPriceService stockPriceService;

    // Method to calculate the total value of a user's portfolio
    public BigDecimal calculatePortfolioValue(Long userId) {
        // Get the portfolio list for the user
        List<Portfolio> portfolioList = portfolioRepository.findByUserId(userId);

        // Use BigDecimal to accumulate the total value, initialized to zero
        return portfolioList.stream()
                .filter(portfolio -> isStockValid(portfolio)) // Filter out invalid stocks
                .map(portfolio -> calculateStockValue(portfolio)) // Map portfolio to its value
                .reduce(BigDecimal.ZERO, BigDecimal::add); // Reduce to total value
    }

    // Helper method to check if a stock is valid
    private boolean isStockValid(Portfolio portfolio) {
        return portfolio.getStock() != null && portfolio.getStock().getTicker() != null;
    }

    // Helper method to calculate the stock value
    private BigDecimal calculateStockValue(Portfolio portfolio) {
        try {
            // Fetch the stock price using the stock ticker
            BigDecimal stockPrice = stockPriceService.getStockPrice(portfolio.getStock().getTicker());

            // Calculate the stock holding value in the portfolio
            return stockPrice.multiply(BigDecimal.valueOf(portfolio.getQuantity()));
        } catch (Exception e) {
            // Log the exception, you can replace this with a proper logging framework like SLF4J
            System.err.println("Error fetching stock price for ticker: " + portfolio.getStock().getTicker());
            e.printStackTrace();
            // Return BigDecimal.ZERO if there's an issue fetching the stock price
            return BigDecimal.ZERO;
        }
    }
}
