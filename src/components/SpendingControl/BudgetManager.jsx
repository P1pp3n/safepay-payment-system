import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import { Input } from "../Common/Input";
import { Button } from "../Common/Button";
import { Alert } from "../Common/Alert";

export const BudgetManager = ({ currentLimit, onUpdateLimit }) => {
  const [newLimit, setNewLimit] = useState(currentLimit);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateLimit(parseFloat(newLimit));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Set Monthly Spending Limit</h3>

      {showSuccess && (
        <Alert
          type="success"
          message="Spending limit updated successfully!"
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Monthly Spending Limit (KES)"
          type="number"
          value={newLimit}
          onChange={(e) => setNewLimit(e.target.value)}
          icon={DollarSign}
          placeholder="Enter amount"
          min="1000"
          required
          helperText="Set a monthly spending limit to control impulse spending. Once reached, all transactions will be blocked."
        />

        <Button type="submit" variant="primary" fullWidth>
          Update Spending Limit
        </Button>
      </form>
    </div>
  );
};
