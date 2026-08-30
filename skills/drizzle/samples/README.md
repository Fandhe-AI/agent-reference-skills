# samples

| Name | Description | Path |
| --- | --- | --- |
| schema-definition | Define tables, enums, self-references, and unique/index constraints in a single schema.ts | [schema-definition.md](./schema-definition.md) |
| rqb-avoid-n-plus-one | Load posts with their comments in one round trip via RQB `with`, avoiding an N+1 query loop | [rqb-avoid-n-plus-one.md](./rqb-avoid-n-plus-one.md) |
| cursor-pagination | Fetch the next page of rows using a unique-column cursor instead of offset | [cursor-pagination.md](./cursor-pagination.md) |
| limit-offset-pagination | Fetch a specific page number of rows with `.limit()` + `.offset()` | [limit-offset-pagination.md](./limit-offset-pagination.md) |
| transactions | Group statements into an atomic unit with savepoints, rollback, and isolation-level config | [transactions.md](./transactions.md) |
| joins-partial-select | Left-join two tables and shape the result with a nested partial select object | [joins-partial-select.md](./joins-partial-select.md) |
| include-exclude-columns | Add/drop columns from a select with `getColumns()`, or via RQB `columns` | [include-exclude-columns.md](./include-exclude-columns.md) |
| drizzle-zod-validation | Generate zod schemas from a Drizzle table to validate insert/update/select payloads | [drizzle-zod-validation.md](./drizzle-zod-validation.md) |
| read-replicas | Route SELECT queries across read replicas while writes go to the primary via `withReplicas()` | [read-replicas.md](./read-replicas.md) |
| upstash-cache | Opt SELECT queries into an Upstash Redis-backed cache with automatic invalidation | [upstash-cache.md](./upstash-cache.md) |
| nextjs-neon-todo | Wire a Drizzle table to Next.js server actions backed by Neon Postgres | [nextjs-neon-todo.md](./nextjs-neon-todo.md) |
| connect-supabase | Initialize Drizzle against Supabase Postgres via postgres-js, handling the transaction pooler | [connect-supabase.md](./connect-supabase.md) |
| connect-neon | Connect to Neon Postgres via the HTTP driver or the WebSocket serverless driver | [connect-neon.md](./connect-neon.md) |
| seed-with-relations | Seed a one-to-many relationship with deterministic fake data via `refine().with` | [seed-with-relations.md](./seed-with-relations.md) |
| conditional-filters | Build a `.where()` clause whose conditions apply only when a parameter is provided | [conditional-filters.md](./conditional-filters.md) |
| upsert | Insert a row, updating it in place on a unique/primary-key conflict | [upsert.md](./upsert.md) |
| count-rows | Count all rows, filtered rows, or grouped counts across a join | [count-rows.md](./count-rows.md) |
