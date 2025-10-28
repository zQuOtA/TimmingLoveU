
'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface SubscriptionStatus {
  hasSubscription: boolean;
  isActive: boolean;
  subscription?: {
    id: string;
    status: string;
    provider: string;
    isInTrial: boolean;
    trialDaysLeft: number;
    trialEndsAt?: Date;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    cancelAtPeriodEnd: boolean;
    canceledAt?: Date;
    plan: {
      id: string;
      nome: string;
      preco: number;
      descricao?: string;
    };
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSubscription() {
  const { data, error, isLoading, mutate } = useSWR<SubscriptionStatus>(
    '/api/subscription/status',
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  return {
    subscription: data,
    isLoading,
    isError: error,
    mutate,
    hasActiveSubscription: data?.isActive || false,
  };
}
