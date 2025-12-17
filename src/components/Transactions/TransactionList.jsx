import React from "react";
import { TransactionItem } from "./TransactionItem";

export const TransactionList = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};
