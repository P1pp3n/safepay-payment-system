import React from "react";
import { AuthProvider } from "./AuthContext";
import { TransactionProvider } from "./TransactionContext";
import { NotificationProvider } from "./NotificationContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <TransactionProvider>{children}</TransactionProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};
