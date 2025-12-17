import React, { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { Card } from "../components/Common/Card";
import { TransactionList } from "../components/Transactions/TransactionList";
import { TransactionFilter } from "../components/Transactions/TransactionFilter";

export const TransactionsPage = () => {
  const { transactions, filterTransactions } = useTransactions();
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all" ? transactions : filterTransactions(filter);

  return (
    <div className="space-y-6">
      <Card
        title="Transaction History"
        subtitle={`${filteredTransactions.length} transactions`}
        action={<TransactionFilter filter={filter} setFilter={setFilter} />}
      >
        <TransactionList transactions={filteredTransactions} />
      </Card>
    </div>
  );
};
