import React from "react";
import { Shield } from "lucide-react";

export const SecuritySettings = () => {
  const features = [
    { name: "Two-Factor Authentication", status: "Enabled" },
    { name: "End-to-End Encryption", status: "Active" },
    { name: "Fraud Detection", status: "Monitoring" },
  ];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="font-semibold text-lg mb-4">Security Features</h3>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900">{feature.name}</span>
            </div>
            <span className="text-green-600 font-medium">{feature.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
