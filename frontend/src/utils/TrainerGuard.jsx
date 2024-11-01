import React from "react";
import { Navigate } from "react-router-dom";
function TrainerGuard({ children }) {
  let role = sessionStorage.getItem("role");

  return role === "trainer" ? children : <Navigate to='/' />;
}

export default TrainerGuard;
