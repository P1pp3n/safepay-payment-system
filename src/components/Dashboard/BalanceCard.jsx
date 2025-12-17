import React from "react";
import { Wallet, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";

export const BalanceCard = ({ balance }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Wallet className="w-8 h-8" />
        <span className="text-sm opacity-90">Available Balance</span>
      </div>
      <div className="text-3xl font-bold mb-4">{formatCurrency(balance)}</div>
      <div className="flex items-center text-sm opacity-90">
        <TrendingUp className="w-4 h-4 mr-1" />
        <span>Active Account</span>
      </div>
    </div>
  );
};
