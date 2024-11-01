import React from "react";
import { Navigate } from "react-router-dom";
function AdminGuard({ children }) {
  let role = sessionStorage.getItem("role");

  return role === "admin" ? children : <Navigate to='/login' />;
}

export default AdminGuard;
