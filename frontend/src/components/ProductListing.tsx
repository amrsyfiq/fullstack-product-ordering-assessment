import React, { useCallback, useState } from 'react';
import { Alert, Col, Row, Spinner } from 'reactstrap';
import SearchFilter from './SearchFilter';
import ProductCard from './ProductCard';
import PagerControl from './PagerControl';
import { getProducts, placeOrder } from '../api/client';
import { usePaginatedResource } from '../hooks/usePaginatedResource';
import { PRODUCTS_PAGE_SIZE } from '../constants';
import { PageParams, ProductFilters, ProductListingItem } from '../types';

/**
 * Product Listing tab: search filter + paginated grid of product color cards.
 */
function ProductListing() {
  const [criteria, setCriteria] = useState<ProductFilters>({});
  const [notice, setNotice] = useState('');

  // Re-created only when the search criteria change, which the hook watches.
  const fetcher = useCallback(
    (params: PageParams) => getProducts({ ...criteria, ...params }),
    [criteria],
  );

  const { page, setPage, result, loading, error, setError } =
    usePaginatedResource<ProductListingItem>(
      fetcher,
      PRODUCTS_PAGE_SIZE,
      'Failed to load products. Is the API running?',
    );

  const handleSearch = (newCriteria: ProductFilters) => {
    setPage(1);
    setCriteria(newCriteria);
  };

  const handleOrder = async (item: ProductListingItem) => {
    setNotice('');
    setError('');
    try {
      const order = await placeOrder(item.productColorId);
      setNotice(
        `Order ${order.orderNumber} placed for ${item.productName} (${item.color}).`,
      );
    } catch {
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
