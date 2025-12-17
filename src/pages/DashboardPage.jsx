import React from "react";
import { useTransactions } from "../context/TransactionContext";
import { BalanceCard } from "../components/Dashboard/BalanceCard";
import { BudgetCard } from "../components/Dashboard/BudgetCard";
import { SpendingCard } from "../components/Dashboard/SpendingCard";
import { SpendingTrendChart } from "../components/Dashboard/SpendingTrendChart";
import { CategoryPieChart } from "../components/Dashboard/CategoryPieChart";
import { RecentTransactions } from "../components/Dashboard/RecentTransactions";
import { TRANSACTION_TYPES } from "../utils/constants";

export const DashboardPage = () => {
  const {
    balance,
    monthlyLimit,
    transactions,
    getMonthlySpent,
    getCategorySpending,
  } = useTransactions();

  const monthlySpent = getMonthlySpent();
  const categoryData = getCategorySpending();
  const sentTransactionsCount = transactions.filter(
    (t) => t.type === TRANSACTION_TYPES.SENT
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard balance={balance} />
        <BudgetCard monthlyLimit={monthlyLimit} monthlySpent={monthlySpent} />
        <SpendingCard
          monthlySpent={monthlySpent}
          transactionCount={sentTransactionsCount}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingTrendChart transactions={transactions} />
        <CategoryPieChart categoryData={categoryData} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} limit={5} />
    </div>
  );
};
