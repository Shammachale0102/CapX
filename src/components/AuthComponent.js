import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between Login and Register forms
    setFormData({ username: "", email: "", password: "" }); // Clear form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.username === formData.username &&
        storedUser.password === formData.password
      ) {
        alert("Login successful!");
        localStorage.setItem("loggedIn", true); // Store login status
      } else {
        alert("Invalid username or password.");
      }
    } else {
      // Register logic
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Registration successful!");
      toggleForm(); // Switch to login after registration
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={{ marginLeft: "10px", marginBottom: "10px", display: "block" }}
          />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ marginLeft: "10px", marginBottom: "10px", display: "block" }}
            />
          </div>
        )}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ marginLeft: "10px", marginBottom: "10px", display: "block" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: isLogin ? "#007BFF" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={toggleForm}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        {isLogin ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
};

export default AuthPage;
