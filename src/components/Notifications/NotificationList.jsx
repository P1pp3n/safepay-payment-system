import React from "react";
import { NotificationItem } from "./NotificationItem";

export const NotificationList = ({ notifications, onMarkAsRead, onDelete }) => {
  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
        <p className="text-gray-500">No notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
