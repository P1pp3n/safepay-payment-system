import React, { useState } from "react";
import { Send, DollarSign, Target, AlertTriangle } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";
import { Card } from "../components/Common/Card";
import { Input } from "../components/Common/Input";
import { Button } from "../components/Common/Button";
import { Alert } from "../components/Common/Alert";
import { TRANSACTION_CATEGORIES } from "../utils/constants";
import {
  formatCurrency,
  calculatePercentage,
  wouldExceedLimit,
} from "../utils/helpers";

export const SendMoneyPage = () => {
  const { balance, monthlyLimit, sendMoney, getMonthlySpent } =
    useTransactions();
  const monthlySpent = getMonthlySpent();

  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    category: "Other",
  });
  const [message, setMessage] = useState(null);

  const remainingLimit = monthlyLimit - monthlySpent;
  const spendingPercentage = calculatePercentage(monthlySpent, monthlyLimit);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);

    if (amount <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }

    const result = sendMoney(formData.recipient, amount, formData.category);

    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      setFormData({ recipient: "", amount: "", category: "Other" });
    }
  };

  const exceeds =
    formData.amount &&
    wouldExceedLimit(monthlySpent, parseFloat(formData.amount), monthlyLimit);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card title="Send Money" padding="p-6">
        {/* Budget Status Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-blue-900">
                Spending Limit Status
              </div>
              <div className="text-sm text-blue-700 mt-1">
                You have {formatCurrency(remainingLimit)} remaining this month
              </div>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {message && (
          <div className="mb-6">
            <Alert
              type={message.type}
              message={message.text}
              onClose={() => setMessage(null)}
            />
          </div>
        )}

        {/* Send Money Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Recipient Name or Phone Number"
            name="recipient"
            type="text"
            value={formData.recipient}
            onChange={handleChange}
            placeholder="Enter recipient details"
            required
          />

          <Input
            label="Amount (KES)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            icon={DollarSign}
            placeholder="0.00"
            min="1"
            max={balance}
            required
            error={
              exceeds ? "This amount exceeds your monthly spending limit" : ""
            }
          />

          {exceeds && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Warning: This transaction will be blocked</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {TRANSACTION_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            variant={exceeds ? "secondary" : "primary"}
            fullWidth
            disabled={exceeds}
            icon={Send}
          >
            {exceeds ? "Transaction Blocked - Exceeds Limit" : "Send Money"}
          </Button>
        </form>
      </Card>
    </div>
  );
};
