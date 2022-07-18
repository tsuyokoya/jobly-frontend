import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  return !currentUser ? <Navigate to="/" replace /> : children;
}

export default PrivateRoute;
