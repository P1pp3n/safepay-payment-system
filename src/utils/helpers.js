import { BUDGET_THRESHOLDS, BUDGET_STATUS } from './constants';

export const formatCurrency = (amount) => {
  return `KES ${new Intl.NumberFormat('en-KE').format(amount)}`;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-KE').format(number);
};

export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const getBudgetStatus = (spentAmount, limitAmount) => {
  const percentage = calculatePercentage(spentAmount, limitAmount);
  
  if (percentage >= BUDGET_THRESHOLDS.CRITICAL) {
    return { status: BUDGET_STATUS.CRITICAL, color: 'red' };
  } else if (percentage >= BUDGET_THRESHOLDS.WARNING) {
    return { status: BUDGET_STATUS.WARNING, color: 'yellow' };
  } else {
    return { status: BUDGET_STATUS.HEALTHY, color: 'green' };
  }
};

export const getRemainingBudget = (limitAmount, spentAmount) => {
  const remaining = limitAmount - spentAmount;
  return remaining > 0 ? remaining : 0;
};

export const wouldExceedLimit = (currentSpent, transactionAmount, limit) => {
  return (currentSpent + transactionAmount) > limit;
};

export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+254|0)[17]\d{8}$/;
  return phoneRegex.test(phone);
};