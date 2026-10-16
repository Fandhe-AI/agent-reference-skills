# samples

| Name | Description | Path |
| --- | --- | --- |
| conditional-filters | Build a `.where()` clause whose conditions are only applied when the corresponding search parameter is provided, by passing `undefined` for skipped conditions. | [conditional-filters.md](./conditional-filters.md) |
| connect-neon | Connect to Neon using the HTTP driver for fast single-statement serverless queries, or the WebSocket-based serverless driver when interactive transactions are needed. | [connect-neon.md](./connect-neon.md) |
| connect-supabase | Initialize Drizzle against a Supabase Postgres database using the `postgres-js` driver, disabling prepared statements when connecting through Supabase's transaction-mode pooler. | [connect-supabase.md](./connect-supabase.md) |
| count-rows | Count all rows, rows matching a condition, or grouped counts across a join, using the `count()` aggregation helper. | [count-rows.md](./count-rows.md) |
| cursor-pagination | Fetch the next page of rows using the last row's id as a cursor instead of `offset`, avoiding scan-and-skip cost and page drift under concurrent writes. | [cursor-pagination.md](./cursor-pagination.md) |
| drizzle-zod-validation | Generate zod schemas straight from a Drizzle table to validate API request/response bodies without hand-duplicating field types. | [drizzle-zod-validation.md](./drizzle-zod-validation.md) |
| include-exclude-columns | Use `getColumns()` to add computed columns or drop specific columns from a `.select()`, and the RQB `columns` option to include/exclude columns declaratively. | [include-exclude-columns.md](./include-exclude-columns.md) |
| joins-partial-select | Left-join two tables and shape the result with a nested partial `.select({ ... })` object so joined-in nullability stays scoped to the sub-object instead of spreading to every column. | [joins-partial-select.md](./joins-partial-select.md) |
| limit-offset-pagination | Fetch a specific page number of rows with `.limit()` + `.offset()`, ordered by a unique column for consistent results. | [limit-offset-pagination.md](./limit-offset-pagination.md) |
| nextjs-neon-todo | Wire a Drizzle table to Next.js server actions backed by Neon Postgres, revalidating the page after each mutation. | [nextjs-neon-todo.md](./nextjs-neon-todo.md) |
| read-replicas | Route `SELECT` queries across one or more read replicas while writes always go to the primary, using `withReplicas()`. | [read-replicas.md](./read-replicas.md) |
| rqb-avoid-n-plus-one | Load posts together with their comments in one round trip using the Relational Queries API instead of looping and issuing a query per row. | [rqb-avoid-n-plus-one.md](./rqb-avoid-n-plus-one.md) |
| schema-definition | Define tables, enums, self-references, and unique/index constraints for a typical app in a single `schema.ts`. | [schema-definition.md](./schema-definition.md) |
| seed-with-relations | Generate deterministic fake data for a one-to-many relationship (2 users, each with 3 posts) using `drizzle-seed`'s `refine().with` option. | [seed-with-relations.md](./seed-with-relations.md) |
| transactions | Group multiple statements into a single atomic unit, with support for savepoints, rollback, return values, and isolation-level configuration. | [transactions.md](./transactions.md) |
| upsert | Insert a row, updating it in place if a unique/primary-key conflict occurs, using `.onConflictDoUpdate()` (Postgres/Cockroach/SQLite) or `.onDuplicateKeyUpdate()` (MySQL). | [upsert.md](./upsert.md) |
| upstash-cache | Opt individual `SELECT` queries into an Upstash Redis-backed cache with automatic invalidation on writes to the involved tables. | [upstash-cache.md](./upstash-cache.md) |
