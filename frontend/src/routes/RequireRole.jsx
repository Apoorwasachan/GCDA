
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode}from "jwt-decode";

const RequireRole = ({ roles }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return <Navigate to="/" replace />;
  }

  return roles?.includes(decoded.role)
    ? <Outlet />
    : <Navigate to="/dashboard" replace />;
};

export default RequireRole;

