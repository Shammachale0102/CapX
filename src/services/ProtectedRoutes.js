import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const auth = localStorage.getItem("Loggedin");
    return auth ? <Outlet /> : <Navigate to={"/Login"} />;
};

export default ProtectedRoutes;