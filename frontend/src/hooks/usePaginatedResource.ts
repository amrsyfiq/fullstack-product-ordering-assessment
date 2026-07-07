import { useCallback, useEffect, useState } from 'react';
import { PageParams, Paginated } from '../types';

/**
 * Encapsulates the paginated-fetch pattern shared by the listing and history
 * views: current page, the paginated response, loading and error state, and a
 * `reload` for optimistic refreshes.
 *
 * @param fetcher Memoized loader (wrap in useCallback so it is stable).
 * @param pageSize
 * @param errorMessage Shown when the fetch fails.
 */
export function usePaginatedResource<T>(
  fetcher: (params: PageParams) => Promise<Paginated<T>>,
  pageSize: number,
  errorMessage: string,
) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<Paginated<T>>({
    data: [],
    total: 0,
    page: 1,
    limit: pageSize,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetcher({ page, limit: pageSize });
      setResult(data);
    } catch {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetcher, page, pageSize, errorMessage]);

  useEffect(() => {
    load();
  }, [load]);

  return { page, setPage, result, loading, error, setError, reload: load };
}
