import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Col, Row, Spinner } from 'reactstrap';
import SearchFilter from './SearchFilter';
import ProductCard from './ProductCard';
import PagerControl from './PagerControl';
import { getProducts, placeOrder } from '../api/client';

const PAGE_SIZE = 8;

/**
 * Product Listing tab: search filter + paginated grid of product color cards.
 */
function ProductListing() {
  const [criteria, setCriteria] = useState({});
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProducts({
        ...criteria,
        page,
        limit: PAGE_SIZE,
      });
      setResult(data);
    } catch (e) {
      setError('Failed to load products. Is the API running?');
    } finally {
      setLoading(false);
    }
  }, [criteria, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (newCriteria) => {
    setPage(1);
    setCriteria(newCriteria);
  };

  const handleOrder = async (item) => {
    setNotice('');
    setError('');
    try {
      const order = await placeOrder(item.productColorId);
      setNotice(
        `Order ${order.orderNumber} placed for ${item.productName} (${item.color}).`,
      );
    } catch (e) {
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <Row>
      <Col md="3" className="mb-4">
        <SearchFilter onSearch={handleSearch} />
      </Col>
      <Col md="9">
        {notice && (
          <Alert color="success" toggle={() => setNotice('')}>
            {notice}
          </Alert>
        )}
        {error && (
          <Alert color="danger" toggle={() => setError('')}>
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner />
          </div>
        ) : result.data.length === 0 ? (
          <Alert color="light">No products match your search.</Alert>
        ) : (
          <Row className="g-3">
            {result.data.map((item) => (
              <Col xs="6" lg="3" key={item.productColorId}>
                <ProductCard item={item} onOrdered={handleOrder} />
              </Col>
            ))}
          </Row>
        )}

        <div className="mt-4">
          <PagerControl
            page={page}
            totalPages={result.totalPages}
            onPageChange={setPage}
          />
        </div>
      </Col>
    </Row>
  );
}

export default ProductListing;
