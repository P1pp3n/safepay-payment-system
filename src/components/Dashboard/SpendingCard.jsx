import React from "react";
import { Receipt } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";

export const SpendingCard = ({ monthlySpent, transactionCount }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <Receipt className="w-8 h-8 text-green-600" />
        <span className="text-sm text-gray-600">This Month</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-4">
        {formatCurrency(monthlySpent)}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <span>{transactionCount} transactions</span>
      </div>
    </div>
  );
};
