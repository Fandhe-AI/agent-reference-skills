---
source: https://docs.cloud.google.com/spanner/docs/foreign-keys/overview
---

# Foreign keys overview

Foreign keys in Spanner enforce (or, for informational keys, merely declare) referential integrity between tables. Covers enforced vs informational keys, foreign key actions, constraint validation, backing indexes, interleaving comparison, and long-running schema changes.

## Signature / Usage

### Enforced foreign key (default)

```googlesql
CREATE TABLE Customers (
CustomerId INT64 NOT NULL,
CustomerName STRING(MAX) NOT NULL,
) PRIMARY KEY(CustomerId);

CREATE TABLE Orders (
OrderId INT64 NOT NULL,
CustomerId INT64 NOT NULL,
Quantity INT64 NOT NULL,
ProductId INT64 NOT NULL,
CONSTRAINT FK_CustomerOrder FOREIGN KEY (CustomerId)
  REFERENCES Customers (CustomerId) ENFORCED
) PRIMARY KEY (OrderId);
```

PostgreSQL dialect (always enforced):

```postgresql
CREATE TABLE Customers (
CustomerId bigint NOT NULL,
CustomerName character varying(1024) NOT NULL,
PRIMARY KEY(CustomerId)
);

CREATE TABLE Orders (
OrderId BIGINT NOT NULL,
CustomerId BIGINT NOT NULL,
Quantity BIGINT NOT NULL,
ProductId BIGINT NOT NULL,
CONSTRAINT FK_CustomerOrder FOREIGN KEY (CustomerId)
  REFERENCES Customers (CustomerId),
PRIMARY KEY (OrderId)
);
```

### Informational foreign key (GoogleSQL only)

```googlesql
CREATE TABLE Orders (
  OrderId INT64 NOT NULL,
  CustomerId INT64 NOT NULL,
  Quantity INT64 NOT NULL,
  ProductId INT64 NOT NULL,
  CONSTRAINT FK_CustomerOrder FOREIGN KEY (CustomerId)
   REFERENCES Customers (CustomerId) NOT ENFORCED
 ) PRIMARY KEY (OrderId);
```

### Optimizer use of informational keys

Adapted (not in the official docs): SET DATABASE OPTIONS replaced with the ALTER DATABASE ... SET OPTIONS form from the GoogleSQL DDL reference; replace `DATABASE_ID` with your database ID.

```googlesql
ALTER DATABASE DATABASE_ID SET OPTIONS (
    use_unenforced_foreign_key_for_query_optimization = false
);
```

```googlesql
@{use_unenforced_foreign_key=false} SELECT Orders.CustomerId
    FROM Orders
    INNER JOIN Customers ON Customers.CustomerId = Orders.CustomerId;
```

### Foreign key action

```googlesql
CREATE TABLE ShoppingCarts (
CartId INT64 NOT NULL,
CustomerId INT64 NOT NULL,
CustomerName STRING(MAX) NOT NULL,
CONSTRAINT FKShoppingCartsCustomers FOREIGN KEY(CustomerId, CustomerName)
  REFERENCES Customers(CustomerId, CustomerName) ON DELETE CASCADE,
) PRIMARY KEY(CartId);
```

### Foreign key plus interleaving

```googlesql
CREATE TABLE Products (
ProductId INT64 NOT NULL,
Name STRING(256) NOT NULL,
Price FLOAT64
) PRIMARY KEY(ProductId);

CREATE TABLE OrderItems (
OrderId INT64 NOT NULL,
ProductId INT64 NOT NULL,
Quantity INT64 NOT NULL,
FOREIGN KEY (ProductId) REFERENCES Products (ProductId)
) PRIMARY KEY (OrderId, ProductId),
INTERLEAVE IN PARENT Orders ON DELETE CASCADE;
```

## Options / Props

| | Enforced | Informational |
|---|---|---|
| Keyword | `ENFORCED` (default, optional) | `NOT ENFORCED` |
| GoogleSQL / PostgreSQL | Yes / Yes (PostgreSQL only enforced) | Yes / No |
| Backing index storage | Up to two (referenced and referencing columns) | Up to one (referenced only) |
| Foreign key actions | Yes | No |
| Validates integrity | Yes | No (may affect query results when used for optimization; use client-side validation or an enforced key) |

| Interleaving vs enforced FK | Table interleaving | Enforced foreign keys |
|---|---|---|
| Non-primary-key columns | No | Yes |
| Parents supported | 0..1 | 0..N |
| Stores parent and child together | Yes | No |
| Cascade delete | Yes | Yes |
| Enforcement timing | Per operation (mutation API); per statement (DML) | Per transaction (mutation API); per statement (DML) |
| Can be removed | No (unless the child table is deleted) | Yes |

Characteristics: the same number and order of referencing and referenced columns; same types and indexable; not allowed on `allow_commit_timestamp=true` columns; `ARRAY` and `JSON` columns not supported; self-referencing and circular keys allowed (at least one must be added with `ALTER TABLE`); referenced keys must be unique; constraint names are schema-scoped (generated if omitted, visible in `INFORMATION_SCHEMA`). Actions are `ON DELETE CASCADE`, `ON DELETE SET NULL`, `ON DELETE NO ACTION`; `SET NULL` is not allowed on columns in the referencing primary key, `NOT NULL`, or generated columns.

## Notes

- Recommendation: start with enforced foreign keys; consider informational keys only to give the optimizer a logical model when strict integrity is impractical (eventually consistent sources, heavily referenced rows) and the application tolerates inconsistencies. The optimizer uses `NOT ENFORCED` keys by default.
- Validation (enforced): checked at commit or when writes become visible; DML is validated per statement (insert the referenced row first), mutation API validation is deferred to commit. `NULL` referencing values are not checked.
- Delete cascades are destructive and can be slow. The source says a transaction exceeding 80,000 mutations fails (for DML the limit applies per statement, see dml-versus-mutations.md); for large deletes, first explicitly delete (or set to `NULL`) the child/referencing rows. For deletes that would cascade to millions of rows, use `INTERLEAVE IN PARENT` with `ON DELETE CASCADE`. Try these on a disposable database first.
- `ON DELETE SET NULL` counts multiple mutations per updated row and never cascades to interleaved children; `ON DELETE CASCADE` can delete a key range directly when the referencing columns are a primary key prefix.
- Backing indexes: created automatically (`UNIQUE NULL_FILTERED` on referenced columns when the referenced primary key is not used; `NULL_FILTERED` on referencing columns for enforced keys), shared between foreign keys, cannot be altered or dropped, dropped with the last foreign key using them. `INFORMATION_SCHEMA.INDEXES` rows with `SPANNER_IS_MANAGED` = `true` describe them.
- Adding an enforced key to an existing table backfills indexes and validates existing data (fails on invalid data); a new table is not writable until the operation completes. Check `INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS.SPANNER_STATE`.
- Not supported: adding an action to an existing key, or changing enforcement. Instead add a new constraint with the required action or enforcement, then drop the old one (dropping first can drop backing indexes and cause costly re-backfill). Dropping a constraint is destructive; test on a disposable database.
- Google recommends interleaving or foreign keys for one relationship, not both.
- Spanner is Google Cloud's distributed relational database; it is not a PostgreSQL server even with the PostgreSQL interface, and is distinct from `supabase` and `drizzle`.
- The source also shows PostgreSQL variants for the action and interleaving examples, and diagrams.
- Corrected from the official docs: "SET DATABASE OPTIONS (" — the GoogleSQL DDL reference (https://docs.cloud.google.com/spanner/docs/reference/standard-sql/data-definition-language#alter-database) defines database options only via `ALTER DATABASE database_id SET OPTIONS ( ... )` and describes `use_unenforced_foreign_key_for_query_optimization = { true | false | null }` there; not run-verified against a live database.
- The optimizer option and the `@{use_unenforced_foreign_key}` hint are GoogleSQL-only: informational foreign keys aren't available in PostgreSQL.
- Source: https://docs.cloud.google.com/spanner/docs/foreign-keys/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/reference/standard-sql/data-definition-language (ALTER DATABASE syntax; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-and-data-model.md](./schema-and-data-model.md)
- [schema-updates.md](./schema-updates.md)
- Create and manage foreign keys: https://docs.cloud.google.com/spanner/docs/foreign-keys/how-to
- Information schema: https://docs.cloud.google.com/spanner/docs/information-schema
