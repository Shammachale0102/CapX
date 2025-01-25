package com.portfolio.tracker.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

@Service
public class StockPriceService {
    private static final String API_URL = "https://www.alphavantage.co/query";
    private static final String API_KEY = "BI4NTO2281BW52LU";

    public BigDecimal getStockPrice(String ticker) {
        RestTemplate restTemplate = new RestTemplate();
        String url = API_URL + "?function=TIME_SERIES_INTRADAY&symbol=" + ticker + "&interval=1min&apikey=" + API_KEY;

        String response = restTemplate.getForObject(url, String.class);
        // Parse the response to get the latest stock price
        // (Simplified, you need to parse the JSON response properly)
        return new BigDecimal("100.00"); // Example price
    }
}
