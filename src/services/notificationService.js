import { STORAGE_KEYS, NOTIFICATION_TYPES } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const notificationService = {
  getAll: () => {
    try {
      const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
      console.error('Error loading notifications:', error);
      return [];
    }
  },

  add: (message, type = NOTIFICATION_TYPES.INFO) => {
    try {
      const notifications = notificationService.getAll();
      const newNotification = {
        id: generateId(),
        message,
        type,
        read: false,
        date: new Date().toISOString()
      };
      
      notifications.unshift(newNotification);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      return newNotification;
    } catch (error) {
      console.error('Error adding notification:', error);
      return null;
    }
  },

  markAsRead: (id) => {
    try {
      const notifications = notificationService.getAll();
      const updated = notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  },

  markAllAsRead: () => {
    try {
      const notifications = notificationService.getAll();
      const updated = notifications.map(n => ({ ...n, read: true }));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Error marking all as read:', error);
      return false;
    }
  },

  getUnreadCount: () => {
    const notifications = notificationService.getAll();
    return notifications.filter(n => !n.read).length;
  },

  delete: (id) => {
    try {
      const notifications = notificationService.getAll();
      const filtered = notifications.filter(n => n.id !== id);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  }
};