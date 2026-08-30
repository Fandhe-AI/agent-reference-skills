---
source: https://orm.drizzle.team/docs/connect-pglite
---

# Drizzle <> PGlite

PGlite is a WASM Postgres build packaged into a TypeScript client library that runs Postgres in the browser, Node.js, and Bun with no other dependencies (2.6mb gzipped). It can run as an ephemeral in-memory database or persist to the file system (Node/Bun) or indexedDB (browser).

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/pglite';

const db = drizzle(); // in-memory

await db.select().from(/* ... */);
```

```ts
import { drizzle } from 'drizzle-orm/pglite';

const db = drizzle('path-to-dir'); // persisted to a directory
```

Providing an existing driver instance:

```ts
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

const client = new PGlite();
const db = drizzle({ client });

await db.select().from(users);
```

## Notes

- Transcribed from `pg/connect-pglite.mdx`.
- Unlike previous "Postgres in the browser" projects, PGlite does not use a Linux virtual machine — it is Postgres compiled to WASM.
- Extra native PGLite configuration can be passed via `drizzle({ connection: { dataDir: 'path-to-dir' } })`.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
