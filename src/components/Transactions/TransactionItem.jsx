import React from "react";
import { ArrowUpRight, ArrowDownLeft, CheckCircle } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";
import { formatDateTime } from "../../utils/dateUtils";
import { TRANSACTION_TYPES } from "../../utils/constants";

export const TransactionItem = ({ transaction }) => {
  const isSent = transaction.type === TRANSACTION_TYPES.SENT;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isSent ? "bg-red-100" : "bg-green-100"
          }`}
        >
          {isSent ? (
            <ArrowUpRight className="w-6 h-6 text-red-600" />
          ) : (
            <ArrowDownLeft className="w-6 h-6 text-green-600" />
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-900">
            {transaction.recipient}
          </div>
          <div className="text-sm text-gray-500">
            {formatDateTime(transaction.date)}
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {transaction.category}
            </span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              {transaction.status}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div
          className={`text-xl font-bold ${
            isSent ? "text-red-600" : "text-green-600"
          }`}
        >
          {isSent ? "-" : "+"}
          {formatCurrency(transaction.amount)}
        </div>
      </div>
    </div>
  );
};
