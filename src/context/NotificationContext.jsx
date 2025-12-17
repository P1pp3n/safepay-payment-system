import React, { createContext, useState, useEffect, useContext } from "react";
import { notificationService } from "../services/notificationService";

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const data = notificationService.getAll();
    setNotifications(data);
  };

  const addNotification = (message, type = "info") => {
    const notification = notificationService.add(message, type);
    if (notification) {
      setNotifications((prev) => [notification, ...prev]);
    }
  };

  const markAsRead = (id) => {
    const success = notificationService.markAsRead(id);
    if (success) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }
  };

  const markAllAsRead = () => {
    const success = notificationService.markAllAsRead();
    if (success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const deleteNotification = (id) => {
    const success = notificationService.delete(id);
    if (success) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
