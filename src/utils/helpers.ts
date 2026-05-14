import { CURRENCY_RATE } from '@/constants';
import { Currency, TransactionStatus } from '@/types';
import { format } from 'date-fns';
import clsx from 'clsx';

export const cn = (...classes: any[]) => clsx(...classes);

export const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
  if (from === to) return amount;
  
  if (from === 'USD' && to === 'INR') {
    return amount * CURRENCY_RATE;
  }
  
  if (from === 'INR' && to === 'USD') {
    return amount / CURRENCY_RATE;
  }
  
  return amount;
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
};

export const formatDate = (date: Date | string): string => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'MMM d, yyyy HH:mm');
};

export const getStatusColor = (status: TransactionStatus): string => {
  const statusMap: Record<TransactionStatus, string> = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusBadgeColor = (status: TransactionStatus): string => {
  const statusMap: Record<TransactionStatus, string> = {
    completed: 'text-green-600',
    pending: 'text-yellow-600',
    failed: 'text-red-600',
    cancelled: 'text-gray-600',
  };
  return statusMap[status] || 'text-gray-600';
};

export const truncateEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (localPart.length > 5) {
    return `${localPart.substring(0, 5)}...@${domain}`;
  }
  return email;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

export const groupTransactionsByDate = (transactions: any[]) => {
  const grouped: Record<string, any[]> = {};
  
  transactions.forEach((transaction) => {
    const date = formatDate(transaction.createdAt);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  });
  
  return grouped;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1 (${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
  }
  return phone;
};

export const calculateMonthlyStats = (transactions: any[]) => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  
  const monthlyData: Record<string, { sent: number; received: number }> = {};
  
  for (let i = 0; i < 6; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = format(month, 'MMM yyyy');
    monthlyData[monthKey] = { sent: 0, received: 0 };
  }
  
  transactions
    .filter((t) => new Date(t.createdAt) >= sixMonthsAgo && t.status === 'completed')
    .forEach((transaction) => {
      const monthKey = format(new Date(transaction.createdAt), 'MMM yyyy');
      if (transaction.type === 'sent') {
        monthlyData[monthKey].sent += transaction.amount;
      } else if (transaction.type === 'received') {
        monthlyData[monthKey].received += transaction.amount;
      }
    });
  
  return Object.entries(monthlyData)
    .map(([month, data]) => ({ month, ...data }))
    .reverse();
};
