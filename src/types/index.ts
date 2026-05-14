export type Currency = 'USD' | 'INR';
export type TransactionType = 'sent' | 'received' | 'request' | 'refund';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'cancelled';
export type PaymentMethodType = 'card' | 'bank';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatar?: string;
  customAttributes?: Record<string, any>;
}

export interface Wallet {
  id: string;
  userEmail: string;
  balanceUSD: number;
  balanceINR: number;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  category: string;
  note?: string;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoneyRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  payerId: string;
  payerName: string;
  payerEmail: string;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  userEmail: string;
  type: PaymentMethodType;
  cardLast4?: string;
  cardExpiry?: string;
  bankName?: string;
  accountLast4?: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userEmail: string;
  title: string;
  message: string;
  type: 'transaction' | 'security' | 'request';
  read: boolean;
  relatedId?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalSent: number;
  totalReceived: number;
  netBalance: number;
  pendingRequests: number;
}
