package com.portfolio.tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "portfolios")
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many-to-one relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Many-to-one relationship with Stock
    @ManyToOne
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    // Quantity of the stock in the portfolio
    @Column(nullable = false)
    private int quantity;

    // Constructor to initialize Portfolio with User, Stock, and Quantity
    public Portfolio(User user, Stock stock, int quantity) {
        this.user = user;
        this.stock = stock;
        this.quantity = quantity;
    }

    // Manually defined getter for stock
    public Stock getStock() {
        return stock;
    }

    // Manually defined setter for stock
    public void setStock(Stock stock) {
        this.stock = stock;
    }

    // Manually defined getter for quantity
    public int getQuantity() {
        return quantity;
    }

    // Manually defined setter for quantity
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Manually defined getter for user
    public User getUser() {
        return user;
    }

    // Manually defined setter for user
    public void setUser(User user) {
        this.user = user;
    }

    // Manually defined getter for id
    public Long getId() {
        return id;
    }

    // Manually defined setter for id
    public void setId(Long id) {
        this.id = id;
    }
}
