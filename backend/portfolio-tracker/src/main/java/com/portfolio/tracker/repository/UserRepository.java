package com.portfolio.tracker.repository;

import com.portfolio.tracker.model.User;  // Correct import statement
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
