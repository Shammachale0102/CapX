import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Get stored user credentials from localStorage
    const storedCredentials = JSON.parse(localStorage.getItem("userCredentials"));

    if (storedCredentials) {
      const { username, password } = storedCredentials;

      // Validate user input against stored credentials
      if (formData.username === username && formData.password === password) {
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to Dashboard on successful login
      } else {
        setError("Invalid username or password.");
      }
    } else {
      setError("No registered user found.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
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
        <div className={styles.inputGroup}>
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

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className={styles.text}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.link}>
            <u>Register here</u>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
