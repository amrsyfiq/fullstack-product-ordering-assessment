import React, { useState } from 'react';
import { Button, Card, CardBody } from 'reactstrap';

/**
 * One product color variant. The Place Order button places the order directly
 * (no details page), per the wireframe note.
 */
function ProductCard({ item, onOrdered }) {
  const [placing, setPlacing] = useState(false);

  const handleOrder = async () => {
    setPlacing(true);
    try {
      await onOrdered(item);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Card className="h-100 text-center">
      <CardBody className="d-flex flex-column">
        <div className="product-thumb mb-3" />
        <div className="fw-semibold">
          {item.productName} ({item.color})
        </div>
        <div className="mb-3">RM {item.price}</div>
        <Button
          color="primary"
          className="mt-auto"
          onClick={handleOrder}
          disabled={placing}
        >
          {placing ? 'Placing...' : 'Place Order'}
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
