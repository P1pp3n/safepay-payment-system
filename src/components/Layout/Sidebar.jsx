import React from "react";
import { Home, Send, Receipt, Target, Bell, User } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const Sidebar = ({ currentPage, onNavigate }) => {
  const { getUnreadCount } = useNotification();
  const unreadCount = getUnreadCount();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "send-money", label: "Send Money", icon: Send },
    { id: "transactions", label: "Transactions", icon: Receipt },
    { id: "spending-control", label: "Spending Control", icon: Target },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadCount,
    },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sticky top-24">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    currentPage === item.id
                      ? "bg-white text-blue-600"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
