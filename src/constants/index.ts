export const CURRENCY_RATE = 83.5;
export const DEFAULT_CURRENCY = 'USD';

export const TRANSACTION_CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transport',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other',
];

export const TRANSACTION_TYPES = [
  { value: 'sent', label: 'Sent' },
  { value: 'received', label: 'Received' },
  { value: 'request', label: 'Request' },
  { value: 'refund', label: 'Refund' },
];

export const TRANSACTION_STATUSES = [
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
];

export const NOTIFICATION_TYPES = [
  { value: 'transaction', label: 'Transaction Alert' },
  { value: 'security', label: 'Security Notification' },
  { value: 'request', label: 'Money Request' },
];

export const DATE_FORMAT = 'MMM d, yyyy';
export const DATE_TIME_FORMAT = 'MMM d, yyyy HH:mm';
