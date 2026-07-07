import { useCallback, useEffect, useState } from 'react';

/**
 * Encapsulates the paginated-fetch pattern shared by the listing and history
 * views: current page, the paginated response, loading and error state, and a
 * `reload` for optimistic refreshes.
 *
 * @param {(params: {page: number, limit: number}) => Promise<object>} fetcher
 *        Memoized loader (wrap in useCallback so it is stable across renders).
 * @param {number} pageSize
 * @param {string} errorMessage Shown when the fetch fails.
 */
export function usePaginatedResource(fetcher, pageSize, errorMessage) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({
    data: [],
    total: 0,
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
    } catch (e) {
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
