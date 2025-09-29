// src/hooks/useSyncUser.ts
'use client';

import { useQuery } from '@tanstack/react-query';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SyncUserResponse =
  | { success: true; user: any }
  | { success: false; message?: string; error?: string };

export const useSyncUser = () => {
  return useQuery<SyncUserResponse>({
    queryKey: ['sync-user'],
    queryFn: async () => {
      const res = await fetch('/api/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send Clerk cookies
      });

      if (!res.ok) {
        throw new Error(`Sync failed: ${res.status}`);
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 60 min
    retry: true, // optional: don't retry on failure
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60, // 60 minutes garbage collection time
  });
};







    