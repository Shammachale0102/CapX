package com.portfolio.tracker.repository;

import com.portfolio.tracker.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {

	public Stock getById(int id);
}
