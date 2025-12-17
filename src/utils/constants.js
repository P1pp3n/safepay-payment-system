// Transaction Types
export const TRANSACTION_TYPES = {
  SENT: 'sent',
  RECEIVED: 'received'
};

// Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  BLOCKED: 'blocked'
};

// Transaction Categories
export const TRANSACTION_CATEGORIES = [
  'Shopping',
  'Utilities',
  'Transport',
  'Food',
  'Entertainment',
  'Healthcare',
  'Education',
  'Income',
  'Other'
];

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
};

// Budget Status Thresholds
export const BUDGET_THRESHOLDS = {
  HEALTHY: 60,
  WARNING: 80,
  CRITICAL: 100
};

// Budget Status Labels
export const BUDGET_STATUS = {
  HEALTHY: 'Healthy',
  WARNING: 'Warning',
  CRITICAL: 'Critical'
};

// Colors for Charts
export const CHART_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // green
  '#06b6d4', // cyan
  '#f97316', // orange
  '#6366f1'  // indigo
];

// App Routes
export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SEND_MONEY: '/send-money',
  TRANSACTIONS: '/transactions',
  SPENDING_CONTROL: '/spending-control',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'safepay_user',
  TRANSACTIONS: 'safepay_transactions',
  SETTINGS: 'safepay_settings',
  NOTIFICATIONS: 'safepay_notifications'
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_AMOUNT: 1,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'MMMM dd, yyyy HH:mm',
  SHORT: 'MMM dd, yyyy',
  TIME: 'HH:mm'
};