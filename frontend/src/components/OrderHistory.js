import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Badge, Button, Spinner, Table } from 'reactstrap';
import PagerControl from './PagerControl';
import { getOrders, updateOrderStatus } from '../api/client';

const PAGE_SIZE = 10;

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Order History tab: paginated table with a "Set Completed" action for open
 * orders.
 */
function OrderHistory() {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getOrders({ page, limit: PAGE_SIZE });
      setResult(data);
    } catch (e) {
      setError('Failed to load orders. Is the API running?');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleComplete = async (order) => {
    setBusyId(order.id);
    try {
      await updateOrderStatus(order.id, 'Completed');
      await load();
    } catch (e) {
      setError('Failed to update order status.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      {error && (
        <Alert color="danger" toggle={() => setError('')}>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner />
        </div>
      ) : (
        <Table bordered responsive className="bg-white align-middle">
          <thead className="table-primary">
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Color</th>
              <th>Order Status</th>
              <th>Order Date Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {result.data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No orders yet.
                </td>
              </tr>
            ) : (
              result.data.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.productCode}</td>
                  <td>{order.productName}</td>
                  <td>{order.color}</td>
                  <td>
                    <Badge
                      color={
                        order.status === 'Completed' ? 'success' : 'secondary'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td>{formatDateTime(order.createdAt)}</td>
                  <td>
                    {order.status === 'Open' && (
                      <Button
                        color="primary"
                        size="sm"
                        disabled={busyId === order.id}
                        onClick={() => handleComplete(order)}
                      >
                        {busyId === order.id ? 'Saving...' : 'Set Completed'}
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <div className="mt-3">
        <PagerControl
          page={page}
          totalPages={result.totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

export default OrderHistory;
