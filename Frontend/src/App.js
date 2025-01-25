import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // Import your Dashboard component
import EditStock from "./components/EditStock";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Define the Dashboard route */}
        <Route path="/edit/:id" element={<EditStock />} />
        
      </Routes>
    </Router>
  );
};

export default App;
