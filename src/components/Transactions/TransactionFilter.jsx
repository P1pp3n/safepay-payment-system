import React from "react";
import { Button } from "../Common/Button";

export const TransactionFilter = ({ filter, setFilter }) => {
  const filters = [
    { id: "all", label: "All" },
    { id: "sent", label: "Sent" },
    { id: "received", label: "Received" },
  ];

  return (
    <div className="flex space-x-2">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === f.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
