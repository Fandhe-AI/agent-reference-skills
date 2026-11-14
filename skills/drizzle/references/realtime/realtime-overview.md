---
source: https://orm.drizzle.team/docs/realtime-overview
---

# Drizzle Pulse

Drizzle Pulse keeps your application in sync with your PostgreSQL database as rows change. You describe the rows that you care about as a query on a Drizzle table, for example "all accepted orders". Drizzle Pulse then keeps those rows in memory and updates them shortly after each transaction commits.

## Signature / Usage

Drizzle Pulse is a library that runs inside your existing server process, next to your request handlers. It connects to the database that your application already uses, so there is no extra service to deploy and operate. You add a package and a few lines of code, and you deploy your application as before.

Use it to:

- answer requests from an in-memory list of rows that is always up to date, such as the open orders on a dispatch screen;
- send changes to connected clients, for example over WebSockets or server-sent events;
- run code when data changes, such as sending a notification or updating a search index.

Your application writes to the database as before. Drizzle Pulse reads the changes from PostgreSQL itself, so it also sees changes from other services, scripts and manual SQL.

Here is a complete example. It uses a plain Drizzle table, starts Drizzle Pulse in the same process as an HTTP server, and serves the current accepted orders:

```ts
import { createServer } from 'node:http';
import { drizzle } from 'drizzle-orm/postgres';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { pulse } from 'drizzle-pulse';
import { createRuntime } from 'drizzle-pulse/embedded';

// An ordinary Drizzle table.
const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  status: text('status').notNull(),
  price: integer('price').notNull(),
});

// The rows to keep in sync: all orders with the status 'accepted'.
const acceptedOrders = pulse(orders).query((ctx) => ctx.query({ status: 'accepted' }));

// The runtime runs inside your application process.
const runtime = createRuntime({
  queries: { acceptedOrders },
  databaseUrl: process.env.DATABASE_URL!,
  sourceDb: drizzle(process.env.DATABASE_URL!),
});
await runtime.start();

// A live collection holds the matching rows and stays up to date.
const collection = await runtime.client.acceptedOrders();

createServer((req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(collection.list()));
}).listen(3000);
```

The code expects an `orders` table with these columns in the database. Each request returns the current accepted orders from memory, without a database query. Insert a row with the status `accepted`, or change the status of a row to or from `accepted`, from anywhere, for example from `psql`. The next request returns the new list.

You can also run code when the rows change. Register a listener on the live collection, or subscribe to a CDC event stream to get each row change as an event:

```ts
// Called after each change to the accepted orders.
collection.onChange(({ events, state }) => {
  for (const event of events) {
    // event.op is 'insert', 'update' or 'delete'.
    console.log(event.op, event.pk);
  }
  console.log('Accepted orders now:', state);
});

// Called for each row that enters, changes in, or leaves the accepted orders.
runtime.events.acceptedOrders((event) => {
  if (event.op === 'insert') console.log('New accepted order', event.row);
});
```

When an order changes to `accepted`, it appears in the live collection and the CDC event stream gets an `insert`. When the order is completed or deleted, it leaves the live collection and the CDC event stream gets a `delete`.

The example shows the two ways to use a query:

- A **live collection** is the current set of rows that match a query. Drizzle Pulse keeps it in memory and updates it after each change. Read it with `list()` and listen with `onChange()`.
- A **CDC event stream** delivers each row change for a query as an `insert`, `update` or `delete` event. CDC stands for change data capture. The stream keeps no rows.

Drizzle Pulse works with PostgreSQL only.

To try the example:

1. Turn on [logical replication](https://orm.drizzle.team/docs/realtime-server-setup#wal_level--logical) in PostgreSQL.
2. [Install the packages](#installation).
3. Run the code above.

### Installation

```bash
npm i drizzle-pulse drizzle-orm@rc
```

Drizzle Pulse needs Node.js 20 or newer. Your project must install `drizzle-orm`, version `^1.0.0-rc.6`.

To describe [query arguments](https://orm.drizzle.team/docs/realtime-queries#arguments), you also need a schema library that supports [Standard Schema](https://standardschema.dev). The examples on these pages use `zod`:

```bash
npm i zod
```

The package has two entrypoints:

1. `drizzle-pulse` has `pulse()`, which defines Pulse tables and queries. See [Queries](./realtime-queries.md).
2. `drizzle-pulse/embedded` has the runtime. See [Server setup](./realtime-server-setup.md).

### How it works

PostgreSQL writes every change to its write-ahead log (WAL). Drizzle Pulse reads the WAL through logical replication, checks each changed row against your queries, and sends the matching changes to your live collections and CDC event streams.

Logical replication needs the PostgreSQL setting `wal_level = logical`, which you must set yourself. Drizzle Pulse creates the other [database objects](https://orm.drizzle.team/docs/realtime-server-setup#database-objects) that it needs when it starts.

## Notes

- Source: https://orm.drizzle.team/docs/realtime-overview (docs repo commit 55f7f9e, retrieved 2026-11-14)
- Drizzle Pulse is PostgreSQL-only realtime for `drizzle-orm@rc`. It is distinct from Supabase Realtime (skill `supabase`) and Upstash (skill `upstash`).
- Version mismatch (not resolved by the official docs): the official page above requires `drizzle-orm` `^1.0.0-rc.6`, but at retrieval (2026-11-14) npm has no `1.0.0-rc.6` (dist-tag `rc` = `1.0.0-rc.5`, which is this skill's target) and the published `drizzle-pulse@0.5.0` (dist-tag `latest`) declares the peer dependency `drizzle-orm: ^1.0.0-rc.5` (checked with `npm view drizzle-pulse peerDependencies`). The `npm i drizzle-pulse drizzle-orm@rc` command therefore resolves to rc.5; treat the `^1.0.0-rc.6` requirement as the docs getting ahead of the registry and re-check once `1.0.0-rc.6` is published. This category describes the docs at commit 55f7f9e and was not run against rc.5.
- Prerequisites listed by the official page: database connection basics with Drizzle, schema declaration, and a PostgreSQL database.
- Transcribed from `pg/realtime-overview.mdx` (pg is the canonical dialect). The `<Npm>` blocks are rendered as `npm i` commands.

## Related

- [Queries](./realtime-queries.md)
- [Server setup](./realtime-server-setup.md)
- [Live collections and CDC event streams](./realtime-live-collections.md)
