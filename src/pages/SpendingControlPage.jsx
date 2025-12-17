import React from "react";
import { useTransactions } from "../context/TransactionContext";
import { BudgetStatus } from "../components/SpendingControl/BudgetStatus";
import { BudgetManager } from "../components/SpendingControl/BudgetManager";
import { SpendingInsights } from "../components/SpendingControl/SpendingInsights";

export const SpendingControlPage = () => {
  const { monthlyLimit, updateSpendingLimit, getMonthlySpent } =
    useTransactions();
  const monthlySpent = getMonthlySpent();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Spending Control & Budget Management
      </h2>

      <BudgetStatus monthlyLimit={monthlyLimit} monthlySpent={monthlySpent} />

      <BudgetManager
        currentLimit={monthlyLimit}
        onUpdateLimit={updateSpendingLimit}
      />

      <SpendingInsights />
    </div>
  );
};
