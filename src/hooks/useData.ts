import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '@/services/api';
import { Transaction, Wallet, PaymentMethod } from '@/types';

export const useWallet = (userEmail: string | undefined) => {
  return useQuery<Wallet>({
    queryKey: ['wallet', userEmail],
    queryFn: () => apiService.getWallet(userEmail!),
    enabled: !!userEmail,
  });
};

export const useTransactions = (userEmail: string | undefined, filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ['transactions', userEmail, filters],
    queryFn: () => apiService.getTransactions(userEmail!, filters),
    enabled: !!userEmail,
  });
};

export const useSendMoney = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Transaction>) => apiService.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
};

export const useRequestMoney = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => apiService.createMoneyRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moneyRequests'] });
    },
  });
};

export const usePaymentMethods = (userEmail: string | undefined) => {
  return useQuery({
    queryKey: ['paymentMethods', userEmail],
    queryFn: () => apiService.getPaymentMethods(userEmail!),
    enabled: !!userEmail,
  });
};

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userEmail, method }: { userEmail: string; method: Partial<PaymentMethod> }) =>
      apiService.addPaymentMethod(userEmail, method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });
};

export const useNotifications = (userEmail: string | undefined) => {
  return useQuery({
    queryKey: ['notifications', userEmail],
    queryFn: () => apiService.getNotifications(userEmail!),
    enabled: !!userEmail,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
