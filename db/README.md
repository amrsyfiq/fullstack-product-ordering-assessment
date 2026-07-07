# SQL exports

Plain SQL dumps of the seeded database, provided as an alternative to running the
TypeORM migration + seed. Generated with `pg_dump` from PostgreSQL 17.

| File         | Contents |
|--------------|----------|
| `dump.sql`   | Full schema **and** seed data in one file (COPY-based). |
| `schema.sql` | Schema only (tables, enums, constraints). |
| `seed.sql`   | Data only, as `INSERT` statements (`--column-inserts`). |

## Load into the Docker Postgres

```bash
docker exec -i assessment_postgres psql -U assessment -d assessment < dump.sql
```

## Load into a local Postgres

```bash
createdb assessment
psql -d assessment -f dump.sql
```

> Note: the app itself manages schema via a TypeORM migration
> (`backend/src/database/migrations`). These SQL files are a convenience for
> reviewers who prefer to load data directly. If you use `dump.sql`, you do not
> also need to run the migration.
