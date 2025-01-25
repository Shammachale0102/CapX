package com.portfolio.tracker.service;

import com.portfolio.tracker.model.Portfolio;
import com.portfolio.tracker.model.Stock;
import com.portfolio.tracker.model.User;
import com.portfolio.tracker.repository.PortfolioRepository;
import com.portfolio.tracker.repository.StockRepository;
import com.portfolio.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class PortfolioService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Transactional
    public void assignRandomPortfolio(Long userId) {
        User user = userRepository.findById(userId)
                                  .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        List<Stock> allStocks = stockRepository.findAll();
        if (allStocks.size() < 5) {
            throw new IllegalStateException("Not enough stocks available to create a portfolio");
        }

        // Get 5 random stocks
        List<Stock> selectedStocks = getRandomStocks(allStocks, 5);

        // Assign each stock to the user's portfolio
        for (Stock stock : selectedStocks) {
            Portfolio portfolio = new Portfolio(user, stock, getRandomQuantity());
            portfolioRepository.save(portfolio);
        }
    }

    private List<Stock> getRandomStocks(List<Stock> stocks, int count) {
        Collections.shuffle(stocks);
        return stocks.subList(0, count);
    }

    private int getRandomQuantity() {
        return new Random().nextInt(100) + 1;
    }
}
