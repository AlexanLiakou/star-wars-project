// src/hooks/useResolveUrls.ts
import { useQueries } from '@tanstack/react-query';
import { fetchByUrl } from '../api/swapi';

export const useFetchUrlData = <T>(urls: string[], keyPrefix: string) =>
  useQueries({
    queries: urls.map(url => ({
      queryKey: [keyPrefix, url],
      queryFn: () => fetchByUrl<T>(url),
      enabled: urls.length > 0,
    })),
    combine: (results) => ({
      data: results.map(r => r.data).filter((d): d is T => d !== undefined),
      isLoading: results.some(r => r.isLoading),
      isError: results.some(r => r.isError),
    })
  });