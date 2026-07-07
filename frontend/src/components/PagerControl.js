import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

/**
 * Numbered pagination control matching the wireframe (1, 2, 3 ...).
 * Controlled: parent owns `page` and reacts to `onPageChange`.
 */
function PagerControl({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const go = (target) => {
    if (target >= 1 && target <= totalPages && target !== page) {
      onPageChange(target);
    }
  };

  return (
    <Pagination listClassName="justify-content-end mb-0">
      <PaginationItem disabled={page <= 1}>
        <PaginationLink previous onClick={() => go(page - 1)} />
      </PaginationItem>
      {pages.map((p) => (
        <PaginationItem active={p === page} key={p}>
          <PaginationLink onClick={() => go(p)}>{p}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={page >= totalPages}>
        <PaginationLink next onClick={() => go(page + 1)} />
      </PaginationItem>
    </Pagination>
  );
}

export default PagerControl;
