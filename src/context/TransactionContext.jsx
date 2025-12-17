import React, { createContext, useState, useEffect, useContext } from "react";
import { transactionService } from "../services/transactionService";
import { TRANSACTION_TYPES } from "../utils/constants";
import { useNotification } from "./NotificationContext";

const TransactionContext = createContext(null);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(25000);
  const [monthlyLimit, setMonthlyLimit] = useState(50000);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadTransactions();
    transactionService.initializeDemoData();
  }, []);

  const loadTransactions = () => {
    const data = transactionService.getAllTransactions();
    setTransactions(data);
    setLoading(false);
  };

  const getMonthlySpent = () => {
    return transactionService.getMonthlySpending();
  };

  const sendMoney = (recipient, amount, category) => {
    const monthlySpent = getMonthlySpent();
    const newSpent = monthlySpent + amount;

    // Check spending limit
    if (newSpent > monthlyLimit) {
      addNotification(
        "Transaction blocked! This exceeds your monthly spending limit.",
        "error"
      );
      return {
        success: false,
        message:
          "Transaction blocked! This exceeds your monthly spending limit.",
      };
    }

    // Check balance
    if (amount > balance) {
      addNotification("Insufficient balance", "error");
      return { success: false, message: "Insufficient balance" };
    }

    // Process transaction
    const result = transactionService.saveTransaction({
      type: TRANSACTION_TYPES.SENT,
      amount,
      recipient,
      category: category || "Other",
    });

    if (result.success) {
      setBalance((prev) => prev - amount);
      loadTransactions();

      addNotification(
        `Payment of KES ${amount.toLocaleString()} to ${recipient} successful`,
        "success"
      );

      // Warning notifications
      const percentUsed = (newSpent / monthlyLimit) * 100;
      if (percentUsed >= 80 && percentUsed < 100) {
        addNotification(
          `Warning: You've spent ${percentUsed.toFixed(
            0
          )}% of your monthly limit`,
          "warning"
        );
      }
    }

    return result;
  };

  const receiveMoney = (sender, amount, category = "Income") => {
    const result = transactionService.saveTransaction({
      type: TRANSACTION_TYPES.RECEIVED,
      amount,
      recipient: sender,
      category,
    });

    if (result.success) {
      setBalance((prev) => prev + amount);
      loadTransactions();

      addNotification(
        `Received KES ${amount.toLocaleString()} from ${sender}`,
        "success"
      );
    }

    return result;
  };

  const updateSpendingLimit = (newLimit) => {
    setMonthlyLimit(newLimit);
    addNotification(
      `Monthly spending limit updated to KES ${newLimit.toLocaleString()}`,
      "info"
    );
  };

  const filterTransactions = (type, category, startDate, endDate) => {
    return transactionService.filterTransactions(
      type,
      category,
      startDate,
      endDate
    );
  };

  const getCategorySpending = () => {
    return transactionService.getCategorySpending();
  };

  const value = {
    transactions,
    balance,
    monthlyLimit,
    loading,
    sendMoney,
    receiveMoney,
    updateSpendingLimit,
    filterTransactions,
    getMonthlySpent,
    getCategorySpending,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
