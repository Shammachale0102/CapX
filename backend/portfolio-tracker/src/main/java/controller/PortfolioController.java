package controller;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.tracker.service.PortfolioService;
import com.portfolio.tracker.service.PortfolioValueService;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
    private static final Logger logger = LoggerFactory.getLogger(PortfolioController.class);

    @Autowired
    private PortfolioService portfolioService;
    
    @Autowired
    private PortfolioValueService portfolioValueService;

    @PostMapping("/assign/{userId}")
    public ResponseEntity<String> assignPortfolio(@PathVariable Long userId) {
        logger.info("Assigning portfolio to user: {}", userId);
        try {
            portfolioService.assignRandomPortfolio(userId);
            return ResponseEntity.ok("Portfolio assigned successfully!");
        } catch (IllegalArgumentException e) {
            logger.error("Error assigning portfolio: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            logger.error("Error assigning portfolio: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @GetMapping("/value/{userId}")
    public ResponseEntity<BigDecimal> getPortfolioValue(@PathVariable Long userId) {
        logger.info("Fetching portfolio value for user: {}", userId);
        try {
            BigDecimal portfolioValue = portfolioValueService.calculatePortfolioValue(userId);
            return ResponseEntity.ok(portfolioValue);
        } catch (IllegalArgumentException e) {
            logger.error("Error fetching portfolio value: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BigDecimal.ZERO);
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BigDecimal.ZERO);
        }
    }
}
