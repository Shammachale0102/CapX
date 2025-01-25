import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Save user data to localStorage
    const userCredentials = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };
    localStorage.setItem("userCredentials", JSON.stringify(userCredentials)); // Store data in localStorage

    navigate("/login"); // Navigate to login page after registration
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
        <p>
          Have an account?{" "}
          <Link to="/login" className={styles.link}>
            <u>Login here</u>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
