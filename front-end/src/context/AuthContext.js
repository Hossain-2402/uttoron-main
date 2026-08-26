import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("uttoron_user");
    return stored ? JSON.parse(stored) : null;
  });

  function login(userData, token) {
    localStorage.setItem("uttoron_token", token);
    localStorage.setItem("uttoron_user", JSON.stringify(userData));
    setUser(userData);
  }

  function updateUser(userData) {
    localStorage.setItem("uttoron_user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("uttoron_token");
    localStorage.removeItem("uttoron_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
