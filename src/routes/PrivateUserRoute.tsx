import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  children: React.ReactNode;
}

interface JWTPayload {
  exp: number;
  // Add other JWT payload fields if needed
}

const PrivateUserRoute: React.FC<DecodedToken> = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user_type");

  if (!token || user !== "1") return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }

  } catch (error) {
    console.error("Invalid token", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateUserRoute;