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
import { Category, ProductFilters } from '../types';

interface SearchFilterProps {
  onSearch: (criteria: ProductFilters) => void;
}

/** Draft form state — all values are strings while editing. */
interface Draft {
  name: string;
  categoryId: string;
  brand: string;
  color: string;
}

const EMPTY: Draft = { name: '', categoryId: '', brand: '', color: '' };

/**
 * Left hand search filter. Holds its own draft state and only lifts the
 * criteria up when the user clicks Search (matching the wireframe behaviour).
 */
function SearchFilter({ onSearch }: SearchFilterProps) {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  // Load the static dropdown options once.
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
    getColors()
      .then(setColors)
      .catch(() => setColors([]));
  }, []);

  // Brands depend on the selected category.
  useEffect(() => {
    const categoryId = draft.categoryId ? Number(draft.categoryId) : undefined;
    getBrands(categoryId)
      .then(setBrands)
      .catch(() => setBrands([]));
  }, [draft.categoryId]);

  const update =
    (field: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDraft((prev) => {
        const next = { ...prev, [field]: value };
        // Reset brand when category changes so a stale brand can't be searched.
        if (field === 'categoryId') {
          next.brand = '';
        }
        return next;
      });
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      name: draft.name.trim() || undefined,
      categoryId: draft.categoryId ? Number(draft.categoryId) : undefined,
      brand: draft.brand || undefined,
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
              value={draft.brand}
              onChange={update('brand')}
            >
              <option value="">Select Brand</option>
              {brands.map((name) => (
                <option key={name} value={name}>
                  {name}
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
