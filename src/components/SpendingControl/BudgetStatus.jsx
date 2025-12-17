import React from "react";
import { Target, Receipt } from "lucide-react";
import {
  formatCurrency,
  calculatePercentage,
  getBudgetStatus,
} from "../../utils/helpers";

export const BudgetStatus = ({ monthlyLimit, monthlySpent }) => {
  const percentage = calculatePercentage(monthlySpent, monthlyLimit);
  const { status, color } = getBudgetStatus(monthlySpent, monthlyLimit);
  const remaining = monthlyLimit - monthlySpent;

  const getColorClasses = () => {
    switch (color) {
      case "red":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          progress: "bg-red-500",
        };
      case "yellow":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          progress: "bg-yellow-500",
        };
      default:
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          progress: "bg-green-500",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8" />
            <span className="text-sm opacity-90">Monthly Limit</span>
          </div>
          <div className="text-3xl font-bold">
            {formatCurrency(monthlyLimit)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Receipt className="w-8 h-8" />
            <span className="text-sm opacity-90">Spent This Month</span>
          </div>
          <div className="text-3xl font-bold">
            {formatCurrency(monthlySpent)}
          </div>
          <div className="mt-2 text-sm opacity-90">
            {percentage.toFixed(1)}% of limit
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Budget Status</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
          >
            {status}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
          <div
            className={`h-4 rounded-full transition-all ${colors.progress}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatCurrency(monthlySpent)} spent</span>
          <span>{formatCurrency(remaining)} remaining</span>
        </div>
      </div>
    </div>
  );
};
