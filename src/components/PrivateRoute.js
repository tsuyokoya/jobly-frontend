import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ currentUser, children }) {
  return !currentUser ? <Navigate to="/" replace /> : children;
}

export default PrivateRoute;
