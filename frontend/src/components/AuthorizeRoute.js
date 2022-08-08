import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthorizeAuth = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthorizeAuth;
