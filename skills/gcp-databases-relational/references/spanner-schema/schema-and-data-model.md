---
source: https://docs.cloud.google.com/spanner/docs/schema-and-data-model
---

# Schema and data model

Spanner schema requirements: strongly typed columns, primary key choice, parent-child relationships via table interleaving or foreign keys, splits, named schemas, locality groups, key-column rules, and multi-tenancy design. Each database must have a schema.

## Signature / Usage

### Create a parent table

```googlesql
CREATE TABLE Singers (
SingerId   INT64 NOT NULL PRIMARY KEY,
FirstName  STRING(1024),
LastName   STRING(1024),
SingerInfo BYTES(MAX),
);
```

PostgreSQL dialect equivalent:

```postgresql
CREATE TABLE singers (
singer_id   BIGINT PRIMARY KEY,
first_name  VARCHAR(1024),
last_name   VARCHAR(1024),
singer_info BYTEA
);
```

### Sibling (non-interleaved) tables

```googlesql
CREATE TABLE Albums (
SingerId     INT64 NOT NULL,
AlbumId      INT64 NOT NULL,
AlbumTitle   STRING(MAX),
) PRIMARY KEY (SingerId, AlbumId);
```

Top-level tables have no data-locality relationship; Spanner can place rows of `Albums` and `Singers` in different splits.

### Interleaved child table (enforced parent)

```googlesql
CREATE TABLE Albums (
 SingerId     INT64 NOT NULL,
 AlbumId      INT64 NOT NULL,
 AlbumTitle   STRING(MAX),
 ) PRIMARY KEY (SingerId, AlbumId),
INTERLEAVE IN PARENT Singers ON DELETE CASCADE;
```

PostgreSQL dialect:

```postgresql
CREATE TABLE albums (
 singer_id     BIGINT,
 album_id      BIGINT,
 album_title   VARCHAR,
 PRIMARY KEY (singer_id, album_id)
 )
 INTERLEAVE IN PARENT singers ON DELETE CASCADE;
```

### Interleave without enforcing the parent (`INTERLEAVE IN`)

```googlesql
CREATE TABLE Projects (
  ProjectId   INT64 NOT NULL,
  ProjectName STRING(1024),
) PRIMARY KEY (ProjectId);

CREATE TABLE Resources (
  ProjectId    INT64 NOT NULL,
  ResourceId   INT64 NOT NULL,
  ResourceName STRING(1024),
) PRIMARY KEY (ProjectId, ResourceId),
  INTERLEAVE IN Projects;
```

`Resources(1, 10)` can exist without `Projects(1)`, and `Projects(1)` can be deleted while those `Resources` rows still exist.

### Hierarchy of interleaved tables

```googlesql
CREATE TABLE Songs (
 SingerId     INT64 NOT NULL,
 AlbumId      INT64 NOT NULL,
 TrackId      INT64 NOT NULL,
 SongName     STRING(MAX),
) PRIMARY KEY (SingerId, AlbumId, TrackId),
 INTERLEAVE IN PARENT Albums ON DELETE CASCADE;
```

`Songs` primary key must include all primary keys of its ancestors (`SingerId`, `AlbumId`).

### Join interleaved tables by primary key

```googlesql
SELECT s.FirstName, a.AlbumTitle
FROM Singers AS s JOIN Albums AS a ON s.SingerId = a.SingerId;
```

### NULL in a primary key (GoogleSQL only)

```sql
CREATE TABLE Singers (
  SingerId   INT64 PRIMARY KEY,
  FirstName  STRING(1024),
  LastName   STRING(1024),
);
```

Omit `NOT NULL` on the key column to allow NULL; only one row can then hold NULL in that column.

## Options / Props

| Topic | Rule |
|-------|------|
| Primary key | Required to update or delete existing rows. A table with no primary key columns can have only one row; only GoogleSQL-dialect databases allow it. |
| Key hotspots | Monotonically increasing keys send inserts to one server. Fixes: hash the key into a column, swap key column order, UUID (version 4 recommended; not version 1), bit-reverse sequential values. |
| Interleave depth | Hierarchies up to 7 layers deep. |
| Interleaved child key | Composite primary key must include all parent primary key components, in the same order. |
| `INTERLEAVE IN PARENT` | Enforces parent-child; parent row must exist before child insert (it can be inserted earlier in the same transaction). |
| `INTERLEAVE IN` | Same physical layout; referential integrity not enforced. |
| `ON DELETE CASCADE` | Deleting a parent row deletes its child rows. Without it, or with `ON DELETE NO ACTION`, delete child rows first. |
| Interleaving permanence | After a table is interleaved it cannot be undone; re-create the table and migrate data. `ALTER TABLE ... SET INTERLEAVE IN [PARENT]` (DDL reference) only switches an interleaved table between `INTERLEAVE IN` and `INTERLEAVE IN PARENT`. |
| `STRING` / `BYTES` (GoogleSQL) | Must be defined with a length (max Unicode characters). Length is optional for PostgreSQL `varchar` / `character varying`. |
| Key changes | Cannot add or remove key columns of an existing table. |
| NULL in keys | GoogleSQL: omit `NOT NULL`. PostgreSQL dialect: NULL in a primary key column is not supported. Nullability of key columns must match between parent and child. |
| `ARRAY` | Cannot be used for a table's key columns or an index's key columns. |
| Named schemas | Support `TABLE` (`CREATE`, `INTERLEAVE IN [PARENT]`, `FOREIGN KEY`, `SYNONYM`), `VIEW`, `INDEX`, `SEARCH INDEX`, `FOREIGN KEY`, `SEQUENCE`. Schema-level fine-grained access control applies to objects existing at grant time; grant again for objects added later. |
| Locality groups | Spanner Enterprise / Enterprise Plus editions only. Without explicit groups, all columns go in the `default` group on SSD. Used for tiered storage (SSD / HDD) and column-grouping. |

## Notes

- Foreign keys vs interleaving: foreign keys are not limited to key columns and allow multiple relationships but imply no co-location. Google recommends one representation (interleaved or foreign key), not both.
- Splits: Spanner divides data into splits by key range and adds/removes boundaries by size and load (load-based splitting). A split holding a single row with no interleaved children cannot be divided further.
- Multi-tenancy: either one database per customer, or one database with a leading `CustomerId` key column for locality. Separate databases are bounded by per-instance database and per-database table/index limits, and adding tables and non-interleaved indexes can be slow; spread per-customer tables across many databases.
- Spanner is Google Cloud's distributed relational database; it is not a PostgreSQL server even with the PostgreSQL interface, and is distinct from `supabase` and `drizzle` (client/ORM skills).
- The source also shows PostgreSQL variants for most DDL, diagrams, and a locality-group discussion linking to separate pages. One PostgreSQL `Projects` DDL in the source has a trailing comma and was not reproduced.
- Source: https://docs.cloud.google.com/spanner/docs/schema-and-data-model (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/reference/standard-sql/data-definition-language (retrieved 2026-11-16; CC BY 4.0; `SET INTERLEAVE IN [PARENT]`)

## Related

- [schema-design.md](./schema-design.md)
- [primary-keys-overview.md](./primary-keys-overview.md)
- [foreign-keys-overview.md](./foreign-keys-overview.md)
- [schema-updates.md](./schema-updates.md)
- Named schemas: https://docs.cloud.google.com/spanner/docs/named-schemas
- Locality groups: https://docs.cloud.google.com/spanner/docs/create-manage-locality-groups
