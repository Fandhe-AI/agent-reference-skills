---
source: https://orm.drizzle.team/docs/extensions
---

# PostgreSQL extensions

Drizzle does not generate `CREATE EXTENSION` statements — extensions (`pg_vector`, `postgis`) must be installed on the database independently; Drizzle only provides the column types, indexes, and helper functions to use them.

## Signature / Usage

```ts
import { vector, halfvec, sparsevec, bit, index, pgTable } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  embedding: vector({ dimensions: 3 }),
  embedding2: vector({ dimensions: 3 }).default([0, -2, 3]),
}, (table) => [
  index("cosine_index").using("hnsw", table.embedding.op("vector_cosine_ops")),
]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `vector({ dimensions })` | column (pg_vector) | single-precision dense vector |
| `halfvec({ dimensions })` | column (pg_vector) | half-precision dense vector |
| `sparsevec({ dimensions })` | column (pg_vector) | sparse vector |
| `bit({ dimensions })` | column (pg_vector) | binary vector / bit string |
| `geometry(name, { type, mode?, srid? })` | column (postgis) | geospatial data; `mode: 'tuple' \| 'xy'` controls the mapped JS shape |
| `l2Distance` / `l1Distance` / `innerProduct` / `cosineDistance` / `hammingDistance` / `jaccardDistance` | function (`drizzle-orm`) | pg_vector distance operators for use in `.orderBy()` / `select()` |

## Notes

- pg_vector index example: `index('name').using('hnsw', table.col.op('vector_l2_ops' \| 'vector_ip_ops' \| 'vector_cosine_ops'))`; equivalent ops exist for `halfvec_*`, `sparsevec_*`, and `bit_hamming_ops`/`bit_jaccard_ops`
- Custom distance helpers can be written with the `sql` template operator, following the pattern of the built-in helpers
- postgis `geometry` currently ships a predefined `point` type (`geometry(Point)`); any other PostGIS type string can be passed to `type`
- Use `extensionsFilters` in `drizzle.config.ts` to exclude PostGIS-managed tables from `introspect`/`push`

## Related

- [Indexes & Constraints](./indexes-constraints.md)
- [Custom types](./custom-types.md)
