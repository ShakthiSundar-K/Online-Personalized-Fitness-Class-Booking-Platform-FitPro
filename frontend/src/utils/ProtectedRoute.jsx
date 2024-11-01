import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  let token = sessionStorage.getItem("token");

  return token ? children : <Navigate to='/' />;
}

export default ProtectedRoute;
