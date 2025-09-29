// src/hooks/useItems.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { adaptItemsToSchema } from '@/lib/adapters/questionAdapter';

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await fetch('/api/items', {
        method: 'GET',
        cache: 'no-store', // avoid stale SSR cache
        credentials: 'include', // send Clerk session cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized — please sign in');
        }
        throw new Error('Failed to fetch items');
      }

      const data = res.json();
      return (await data).map(adaptItemsToSchema);
    },
    // staleTime: 1000 * 60 * 5,
    // cacheTime: 1000 * 60 * 30,
  });
};
