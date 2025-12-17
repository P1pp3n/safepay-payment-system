import React from "react";
import { useNotification } from "../context/NotificationContext";
import { Card } from "../components/Common/Card";
import { Button } from "../components/Common/Button";
import { NotificationList } from "../components/Notifications/NotificationList";

export const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } =
    useNotification();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card
        title="Notifications"
        subtitle={`${notifications.length} notifications`}
        action={
          <Button variant="secondary" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        }
      >
        <NotificationList
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onDelete={deleteNotification}
        />
      </Card>
    </div>
  );
};
