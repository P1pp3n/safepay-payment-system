import React from "react";

export const SpendingInsights = () => {
  const steps = [
    {
      number: 1,
      title: "Set Your Budget",
      description:
        "Define your monthly spending limit based on your financial goals",
    },
    {
      number: 2,
      title: "Real-time Tracking",
      description:
        "Every transaction is tracked against your monthly limit automatically",
    },
    {
      number: 3,
      title: "Automatic Protection",
      description:
        "Transactions are blocked when you reach your limit, preventing overspending",
    },
    {
      number: 4,
      title: "Smart Notifications",
      description:
        "Get alerts when you reach 60%, 80%, and 100% of your budget",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">How Spending Control Works</h3>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold">{step.number}</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
