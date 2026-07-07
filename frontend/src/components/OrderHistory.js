import React, { useState } from 'react';
import { Alert, Badge, Button, Spinner, Table } from 'reactstrap';
import PagerControl from './PagerControl';
import { getOrders, updateOrderStatus } from '../api/client';
import { usePaginatedResource } from '../hooks/usePaginatedResource';
import { ORDER_STATUS, ORDERS_PAGE_SIZE } from '../constants';

function formatDateTime(iso) {
  const date = new Date(iso);
  return date.toLocaleString('en-GB', {
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
  const [busyId, setBusyId] = useState(null);

  const { page, setPage, result, loading, error, setError, reload } =
    usePaginatedResource(
      getOrders,
      ORDERS_PAGE_SIZE,
      'Failed to load orders. Is the API running?',
    );

  const handleComplete = async (order) => {
    setBusyId(order.id);
    try {
      await updateOrderStatus(order.id, ORDER_STATUS.COMPLETED);
      await reload();
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
                        order.status === ORDER_STATUS.COMPLETED
                          ? 'success'
                          : 'secondary'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td>{formatDateTime(order.createdAt)}</td>
                  <td>
                    {order.status === ORDER_STATUS.OPEN && (
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
