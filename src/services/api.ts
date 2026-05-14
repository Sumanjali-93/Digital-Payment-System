import axios from 'axios'
import { Transaction, MoneyRequest, Wallet, PaymentMethod, Notification, User } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.digitalwallet.example';

class ApiService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_API_KEY || '';
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  // Authentication
  async login(email: string, _password: string): Promise<User> {
    return {
      id: '1',
      email,
      fullName: email.split('@')[0],
      role: 'user',
    };
  }

  async logout(): Promise<void> {
    return Promise.resolve();
  }

  // Wallet Operations
  async getWallet(userEmail: string): Promise<Wallet> {
    const response = await axios.get(`${BASE_URL}/wallets/${userEmail}`, { headers: this.headers })
    return response.data
  }

  async updateWalletBalance(userEmail: string, amount: number): Promise<Wallet> {
    const response = await axios.patch(
      `${BASE_URL}/wallets/${userEmail}`,
      { amount },
      { headers: this.headers },
    )
    return response.data
  }

  // Transactions
  async getTransactions(userEmail: string, filters?: Record<string, any>): Promise<Transaction[]> {
    const response = await axios.get(`${BASE_URL}/transactions/${userEmail}`, {
      params: filters,
      headers: this.headers,
    })
    return response.data
  }

  async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await axios.post(`${BASE_URL}/transactions`, transaction, {
      headers: this.headers,
    })
    return response.data
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const response = await axios.patch(`${BASE_URL}/transactions/${id}`, updates, {
      headers: this.headers,
    })
    return response.data
  }

  // Money Requests
  async getMoneyRequests(userEmail: string): Promise<MoneyRequest[]> {
    const response = await axios.get(`${BASE_URL}/money-requests/${userEmail}`, { headers: this.headers })
    return response.data
  }

  async createMoneyRequest(request: Partial<MoneyRequest>): Promise<MoneyRequest> {
    const response = await axios.post(`${BASE_URL}/money-requests`, request, {
      headers: this.headers,
    })
    return response.data
  }

  // Payment Methods
  async getPaymentMethods(userEmail: string): Promise<PaymentMethod[]> {
    const response = await axios.get(`${BASE_URL}/payment-methods/${userEmail}`, { headers: this.headers })
    return response.data
  }

  async addPaymentMethod(userEmail: string, method: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const response = await axios.post(
      `${BASE_URL}/payment-methods`,
      { ...method, userEmail },
      { headers: this.headers },
    )
    return response.data
  }

  async deletePaymentMethod(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/payment-methods/${id}`, { headers: this.headers })
  }

  async setDefaultPaymentMethod(id: string): Promise<PaymentMethod> {
    const response = await axios.patch(`${BASE_URL}/payment-methods/${id}/default`, {}, {
      headers: this.headers,
    })
    return response.data
  }

  // Notifications
  async getNotifications(userEmail: string): Promise<Notification[]> {
    const response = await axios.get(`${BASE_URL}/notifications/${userEmail}`, { headers: this.headers })
    return response.data
  }

  async markNotificationAsRead(id: string): Promise<Notification> {
    const response = await axios.patch(
      `${BASE_URL}/notifications/${id}`,
      { read: true },
      { headers: this.headers },
    )
    return response.data
  }

  // User Profile
  async getUserProfile(email: string): Promise<User> {
    const response = await axios.get(`${BASE_URL}/users/${email}`, { headers: this.headers })
    return response.data
  }

  async updateUserProfile(email: string, updates: Partial<User>): Promise<User> {
    const response = await axios.patch(`${BASE_URL}/users/${email}`, updates, { headers: this.headers })
    return response.data
  }
}

export default new ApiService();
