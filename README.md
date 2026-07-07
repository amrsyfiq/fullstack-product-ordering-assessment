# Product Ordering — Fullstack Assessment

A single-page web application with **Product Listing** and **Order History**, built
with **React (Create React App) + reactstrap** on the frontend and **NestJS + TypeORM
+ PostgreSQL** on the backend, communicating over REST.

| Layer    | Stack |
|----------|-------|
| Frontend | React 18 (CRA), React Hooks, reactstrap, axios |
| Backend  | NestJS 10, TypeORM 0.3, class-validator |
| Database | PostgreSQL 17 (via Docker Compose) |

---

## Features

**Product Listing**
- Search filter: Product Name (text), Category, Brand (scoped to the selected
  category), Color — applied on **Search** click.
- Grid of product **color variants** (one card per product colour), 8 per page.
- **Place Order** places the order directly (no details page) and shows the new
  order number.
- Numbered pagination.

**Order History**
- Paginated table: Order ID, Product ID, Product Name, Product Color, Order Status,
  Order Date Time, Action.
- **Set Completed** action on open orders.

---

## Repository layout

```
.
├── backend/            NestJS + TypeORM API
│   ├── src/
│   │   ├── entities/            Category, Brand, Product, ProductColor, Order, User
│   │   ├── category|brand|color|product|order/   feature modules (module/service/controller)
│   │   ├── common/              pagination + numeric transformer helpers
│   │   ├── database/
│   │   │   ├── migrations/      TypeORM migration (schema)
│   │   │   └── seed.ts          seed script
│   │   ├── data-source.ts       single TypeORM datasource (app + CLI + seed)
│   │   └── main.ts
│   └── .env.example
├── frontend/           React (CRA) + reactstrap
│   └── src/
│       ├── api/client.js         axios API client
│       └── components/           SearchFilter, ProductListing, ProductCard,
│                                 OrderHistory, PagerControl
├── db/                 Plain SQL exports (see db/README.md)
│   ├── dump.sql        full schema + seed (single file)
│   ├── schema.sql      schema only
│   └── seed.sql        data only (INSERTs)
├── docker-compose.yml  PostgreSQL 17
└── README.md
```

---

## Prerequisites

- Node.js 18+ (developed on 22)
- Docker (for PostgreSQL) — or a local PostgreSQL 17 if you prefer (see notes)

---

## Quick start

### 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres 17 on **host port 5433** (mapped to avoid clashing with any
local Postgres on 5432). Credentials: `assessment` / `assessment`, database
`assessment`.

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run db:setup      # runs migrations, then seeds the database
npm run start         # API on http://localhost:3001/api
```

Interactive API docs (Swagger UI) are then available at
**http://localhost:3001/api/docs** (OpenAPI JSON at `/api/docs-json`).

`db:setup` = `migration:run` + `seed`. Run them separately if you prefer:

```bash
npm run migration:run
npm run seed
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start             # app on http://localhost:3000
```

Open http://localhost:3000.

---

## Seeded login credentials

The brief states no authentication is required. The submission asks for
customer/admin credentials, so a `app_user` table is seeded (no login flow is
enforced — these exist for completeness and can be used if auth is added later).

| Role     | Email                 | Password       |
|----------|-----------------------|----------------|
| Admin    | `admin@example.com`   | `Admin@123`    |
| Customer | `customer@example.com`| `Customer@123` |

> Passwords are stored in plaintext in the seed **deliberately** — there is no
> login to hash against, and readable values let a reviewer use them directly. In
> a real system they would be hashed (e.g. bcrypt).

---

## REST API

Base URL: `http://localhost:3001/api` — full interactive docs at `/api/docs` (Swagger).

| Method | Path                   | Description |
|--------|------------------------|-------------|
| GET    | `/categories`          | All categories (Category dropdown) |
| GET    | `/brands?categoryId=`  | Brands, optionally scoped to a category (Brand dropdown) |
| GET    | `/colors`              | Distinct colour names (Colour dropdown) |
| GET    | `/products`            | Product-colour listing. Query: `name`, `categoryId`, `brandId`, `color`, `page`, `limit` |
| POST   | `/orders`              | Place an order. Body: `{ "productColorId": number }` |
| GET    | `/orders?page=&limit=` | Order history, newest first |
| PATCH  | `/orders/:id/status`   | Update status. Body: `{ "status": "Open" \| "Completed" }` |

List endpoints return a paginated envelope:

```json
{ "data": [ ... ], "total": 24, "page": 1, "limit": 8, "totalPages": 3 }
```

Example — place an order:

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productColorId": 3}'
# { "orderNumber": "MY000004", "productCode": "P000001", "productName": "iPhone 8",
#   "color": "Blue", "status": "Open", ... }
```

---

## Database design

Catalogue hierarchy (each level 1-to-many to the next):

```
Category ──< Brand ──< Product ──< ProductColor
                                        │
                                        └──< Order
```

| Table           | Key columns | Notes |
|-----------------|-------------|-------|
| `category`      | id, name (unique) | e.g. Smartphones, Tablets |
| `brand`         | id, name, category_id → category | e.g. Apple, Samsung |
| `product`       | id, code (unique, `P000001`), name, price, brand_id → brand | e.g. iPhone 8 |
| `product_color` | id, name, product_id → product | e.g. iPhone 8 / Blue — one listing card |
| `order`         | id, order_number (unique, `MY000001`), product_color_id → product_color, status (enum Open/Completed), created_at | |
| `app_user`      | id, name, email (unique), password, role (enum) | seeded credentials |

Design notes:
- An **order references a `product_color`**, from which product code, product name
  and colour are derived — no catalogue data is duplicated onto the order.
- `order_number` (`MY######`) is derived from the generated primary key inside a
  transaction, keeping it unique and consistent without a separate counter.
- Foreign keys from the catalogue cascade on delete; orders do not (history is
  preserved).
- Schema is managed by a **TypeORM migration** (`synchronize` is off). The
  entities in `backend/src/entities` are the source of truth.

---

## Using the plain SQL instead of migrations

If you would rather not run migrations, load the SQL export (see `db/README.md`):

```bash
# into the docker Postgres
docker exec -i assessment_postgres psql -U assessment -d assessment < db/dump.sql
```

---

## Using a local PostgreSQL (no Docker)

Point `backend/.env` at your instance (`DB_HOST`, `DB_PORT`, `DB_USERNAME`,
`DB_PASSWORD`, `DB_DATABASE`), create the database, then run `npm run db:setup`.

---

## Code quality

- **Lint & format** — both apps ship ESLint + Prettier configs.
  - Backend: `npm run lint`, `npm run format` (typescript-eslint + prettier).
  - Frontend: `npm run format` (CRA's `react-app` ESLint runs during `build`).
- **Typed config** — environment variables are validated at startup
  (`src/config/env.validation.ts`); the app fails fast with a clear message if
  configuration is missing or malformed.
- **DTOs** — request/response shapes are explicit DTO classes (not leaked
  entities), which also drive the Swagger schema.
- **Frontend** — shared `usePaginatedResource` hook removes duplication between
  the two paginated views; components declare `propTypes`; magic values live in
  `src/constants.js`.

## Notes

- CORS on the backend allows the CRA dev origin (`http://localhost:3000`),
  configurable via `CORS_ORIGIN`.
- Verified end-to-end: catalogue + filtered/paginated listing, placing an order,
  order history, and the Set Completed action.
- Per the brief, **UI styling was not a focus** — reactstrap/Bootstrap defaults
  are used to keep the layout close to the wireframe.
