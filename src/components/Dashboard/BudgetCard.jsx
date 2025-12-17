import React from "react";
import { Target } from "lucide-react";
import {
  formatCurrency,
  calculatePercentage,
  getRemainingBudget,
} from "../../utils/helpers";

export const BudgetCard = ({ monthlyLimit, monthlySpent }) => {
  const remaining = getRemainingBudget(monthlyLimit, monthlySpent);
  const percentage = calculatePercentage(monthlySpent, monthlyLimit);

  const getColorClass = () => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <Target className="w-8 h-8 text-purple-600" />
        <span className="text-sm text-gray-600">Monthly Budget</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-4">
        {formatCurrency(remaining)}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Remaining</span>
          <span>{percentage.toFixed(0)}% used</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getColorClass()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
