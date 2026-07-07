import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { getBrands, getCategories, getColors } from '../api/client';

const EMPTY = { name: '', categoryId: '', brandId: '', color: '' };

/**
 * Left hand search filter. Holds its own draft state and only lifts the
 * criteria up when the user clicks Search (matching the wireframe behaviour).
 */
function SearchFilter({ onSearch }) {
  const [draft, setDraft] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  // Load the static dropdown options once.
  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
    getColors().then(setColors).catch(() => setColors([]));
  }, []);

  // Brands depend on the selected category.
  useEffect(() => {
    const categoryId = draft.categoryId || undefined;
    getBrands(categoryId).then(setBrands).catch(() => setBrands([]));
  }, [draft.categoryId]);

  const update = (field) => (e) => {
    const value = e.target.value;
    setDraft((prev) => {
      const next = { ...prev, [field]: value };
      // Reset brand when category changes so a stale brand can't be searched.
      if (field === 'categoryId') {
        next.brandId = '';
      }
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSearch({
      name: draft.name.trim() || undefined,
      categoryId: draft.categoryId || undefined,
      brandId: draft.brandId || undefined,
      color: draft.color || undefined,
    });
  };

  return (
    <Card>
      <CardBody>
        <h5 className="mb-3">Search Filter</h5>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label for="filter-name">Product Name</Label>
            <Input
              id="filter-name"
              placeholder="Enter Product Name"
              value={draft.name}
              onChange={update('name')}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filter-category">Category</Label>
            <Input
              id="filter-category"
              type="select"
              value={draft.categoryId}
              onChange={update('categoryId')}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="filter-brand">Brand</Label>
            <Input
              id="filter-brand"
              type="select"
              value={draft.brandId}
              onChange={update('brandId')}
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="filter-color">Color</Label>
            <Input
              id="filter-color"
              type="select"
              value={draft.color}
              onChange={update('color')}
            >
              <option value="">Select Color</option>
              {colors.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <Button color="primary" block type="submit">
            Search
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

export default SearchFilter;
