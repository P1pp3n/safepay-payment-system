import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export const Alert = ({ type = "info", message, onClose, className = "" }) => {
  const types = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: XCircle,
      iconColor: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: Info,
      iconColor: "text-blue-600",
    },
  };

  const { bg, border, text, icon: Icon, iconColor } = types[type];

  return (
    <div className={`${bg} border ${border} rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
        <div className={`flex-1 ${text}`}>{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${iconColor} hover:opacity-75 transition-opacity`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
