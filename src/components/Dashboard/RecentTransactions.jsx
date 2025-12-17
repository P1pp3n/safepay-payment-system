import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";
import { formatDate } from "../../utils/dateUtils";
import { TRANSACTION_TYPES } from "../../utils/constants";

export const RecentTransactions = ({ transactions, limit = 5 }) => {
  const recentTransactions = transactions.slice(0, limit);

  if (recentTransactions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="text-center py-8 text-gray-500">
          No transactions yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === TRANSACTION_TYPES.SENT
                    ? "bg-red-100"
                    : "bg-green-100"
                }`}
              >
                {transaction.type === TRANSACTION_TYPES.SENT ? (
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {transaction.recipient}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(transaction.date)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`font-semibold ${
                  transaction.type === TRANSACTION_TYPES.SENT
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {transaction.type === TRANSACTION_TYPES.SENT ? "-" : "+"}
                {formatCurrency(transaction.amount)}
              </div>
              <div className="text-xs text-gray-500">
                {transaction.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
