package com.portfolio.tracker;

import com.portfolio.tracker.model.Stock;
import com.portfolio.tracker.repository.StockRepository; // Add this import
import com.portfolio.tracker.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional; // Add this import

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private StockRepository stockRepository; // Add this field

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }
    
    @GetMapping("{id}")
    public Stock getOneStock(@PathVariable int id) {
        return stockService.getById(id);
    }

    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return stockService.addStock(stock);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStock(@PathVariable Long id, @RequestBody Stock stockDetails) {
        try {
            Optional<Stock> stockOptional = stockRepository.findById(id);
            if (stockOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Stock not found"));
            }

            Stock stock = stockOptional.get();
            stock.setStockName(stockDetails.getStockName());
            stock.setTicker(stockDetails.getTicker());
            stock.setQuantity(stockDetails.getQuantity());
            stock.setBuyPrice(stockDetails.getBuyPrice());

            stockRepository.save(stock);
            return ResponseEntity.ok(stock);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An error occurred", "details", e.getMessage()));
        }
    }


    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
    }
}
