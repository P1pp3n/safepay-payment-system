import { STORAGE_KEYS, TRANSACTION_TYPES, TRANSACTION_STATUS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const transactionService = {
  getAllTransactions: () => {
    try {
      const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return transactions ? JSON.parse(transactions) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  },

  saveTransaction: (transaction) => {
    try {
      const transactions = transactionService.getAllTransactions();
      const newTransaction = {
        id: generateId(),
        ...transaction,
        date: new Date().toISOString(),
        status: TRANSACTION_STATUS.COMPLETED
      };
      
      transactions.unshift(newTransaction);
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
      return { success: true, transaction: newTransaction };
    } catch (error) {
      console.error('Error saving transaction:', error);
      return { success: false, error: 'Failed to save transaction' };
    }
  },

  getTransactionById: (id) => {
    const transactions = transactionService.getAllTransactions();
    return transactions.find(t => t.id === id);
  },

  filterTransactions: (type, category, startDate, endDate) => {
    let transactions = transactionService.getAllTransactions();

    if (type && type !== 'all') {
      transactions = transactions.filter(t => t.type === type);
    }

    if (category && category !== 'all') {
      transactions = transactions.filter(t => t.category === category);
    }

    if (startDate) {
      transactions = transactions.filter(t => new Date(t.date) >= new Date(startDate));
    }

    if (endDate) {
      transactions = transactions.filter(t => new Date(t.date) <= new Date(endDate));
    }

    return transactions;
  },

  getMonthlySpending: () => {
    const transactions = transactionService.getAllTransactions();
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return transactions
      .filter(t => t.type === TRANSACTION_TYPES.SENT && new Date(t.date) >= monthStart)
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getCategorySpending: () => {
    const transactions = transactionService.getAllTransactions();
    const categoryTotals = {};

    transactions
      .filter(t => t.type === TRANSACTION_TYPES.SENT)
      .forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  },

  initializeDemoData: () => {
    const existingTransactions = transactionService.getAllTransactions();
    if (existingTransactions.length === 0) {
      const demoTransactions = [
        {
          id: generateId(),
          type: TRANSACTION_TYPES.RECEIVED,
          amount: 5000,
          recipient: 'Sarah Kimani',
          date: new Date('2024-12-15').toISOString(),
          category: 'Income',
          status: TRANSACTION_STATUS.COMPLETED
        },
        {
          id: generateId(),
          type: TRANSACTION_TYPES.SENT,
          amount: 1200,
          recipient: 'KenGen - Electricity',
          date: new Date('2024-12-14').toISOString(),
          category: 'Utilities',
          status: TRANSACTION_STATUS.COMPLETED
        },
        {
          id: generateId(),
          type: TRANSACTION_TYPES.SENT,
          amount: 3500,
          recipient: 'Carrefour Supermarket',
          date: new Date('2024-12-13').toISOString(),
          category: 'Shopping',
          status: TRANSACTION_STATUS.COMPLETED
        },
        {
          id: generateId(),
          type: TRANSACTION_TYPES.SENT,
          amount: 800,
          recipient: 'Uber',
          date: new Date('2024-12-12').toISOString(),
          category: 'Transport',
          status: TRANSACTION_STATUS.COMPLETED
        }
      ];
      
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(demoTransactions));
    }
  }
};