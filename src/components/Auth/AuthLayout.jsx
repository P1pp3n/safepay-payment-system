import React from "react";
import { Shield } from "lucide-react";

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">SafePay</h1>
            <p className="text-gray-600 mt-2">
              Secure payments, smart spending
            </p>
          </div>
          {children}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Demo Mode: Use any email/password combination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
