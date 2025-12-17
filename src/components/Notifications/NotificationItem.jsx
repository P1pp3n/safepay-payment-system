import React from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Trash2,
} from "lucide-react";
import { formatDateTime } from "../../utils/dateUtils";

export const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = () => {
    if (!notification.read) return "bg-blue-50 border-blue-200";
    return "bg-gray-50 border-gray-200";
  };

  return (
    <div className={`p-4 rounded-lg border transition-colors ${getBgColor()}`}>
      <div className="flex items-start space-x-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            notification.type === "warning"
              ? "bg-yellow-100"
              : notification.type === "success"
              ? "bg-green-100"
              : notification.type === "error"
              ? "bg-red-100"
              : "bg-blue-100"
          }`}
        >
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-gray-900">{notification.message}</p>
          <p className="text-sm text-gray-500 mt-1">
            {formatDateTime(notification.date)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Mark read
            </button>
          )}
          <button
            onClick={() => onDelete(notification.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
