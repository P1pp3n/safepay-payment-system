import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getLast7Days, getWeekday } from "../../utils/dateUtils";
import { TRANSACTION_TYPES } from "../../utils/constants";

export const SpendingTrendChart = ({ transactions }) => {
  const last7Days = getLast7Days();

  const chartData = last7Days.map((date) => {
    const dateStr = date.toISOString().split("T")[0];
    const dayTransactions = transactions.filter(
      (t) =>
        t.type === TRANSACTION_TYPES.SENT &&
        new Date(t.date).toISOString().split("T")[0] === dateStr
    );
    const total = dayTransactions.reduce((sum, t) => sum + t.amount, 0);

    return {
      date: getWeekday(date),
      amount: total,
    };
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">
        Spending Trend (Last 7 Days)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value) => `KES ${value.toLocaleString()}`}
            labelStyle={{ color: "#1f2937" }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
