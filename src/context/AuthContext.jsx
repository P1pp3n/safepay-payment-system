import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const result = authService.login(credentials);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const register = async (userData) => {
    const result = authService.register(userData);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem("safepay_user", JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
