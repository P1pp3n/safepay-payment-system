import React from "react";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";

export const AccountStats = ({ balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">Account Balance</div>
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(balance)}
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">Account Status</div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-lg font-semibold text-green-600">
            Active & Verified
          </span>
        </div>
      </div>
    </div>
  );
};
