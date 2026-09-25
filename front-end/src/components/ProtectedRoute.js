import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const CHECK_INTERVAL_MS = 15000;

export default function ProtectedRoute({ children }) {
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      api.get("/auth/me").catch((err) => {
        if (err.response?.status === 401) {
          logout();
        }
      });
    }, CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [user, logout]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
