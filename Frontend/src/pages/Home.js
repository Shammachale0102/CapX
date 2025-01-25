import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user"));

  // Check if user data exists in localStorage
  //const userName = user ? user.username : "Guest"; // If no user, set as "Guest"
  const handleLogout = () => {
    localStorage.removeItem("Loggedin");
    navigate("/login");

  };
  return (
    <div>
      <h2 className="text-uppercase text-center mb-5">Homepage</h2>
      <p className="text-center">Welcome, {userName.name}</p>
      <button
        onClick={handleLogout}
        type="button"
        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body center"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;


