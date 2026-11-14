---
source: https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/
---

# Connect to PostgreSQL (drivers and ORMs)

Create a Hyperdrive for PostgreSQL and query it from Workers with node-postgres (recommended), Postgres.js, Drizzle ORM, or Prisma ORM.

## Signature / Usage

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive create my-first-hyperdrive --connection-string="postgres://user:password@database.host.example.com:5432/databasenamehere"
```

```jsonc
{
	// required for database drivers to function
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<your-hyperdrive-id-here>"
		}
	]
}
```

node-postgres (`npm i "pg@>=8.16.3"`, `npm i -D @types/pg`):

```ts
// filepath: src/index.ts
import { Client } from "pg";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		// Create a new client instance for each request. Hyperdrive maintains the
		// underlying database connection pool, so creating a new client is fast.
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});

		try {
			// Connect to the database
			await client.connect();

			// Perform a simple query
			const result = await client.query("SELECT * FROM pg_tables");

			return Response.json({
				success: true,
				result: result.rows,
			});
		} catch (error: any) {
			console.error("Database error:", error.message);

			return new Response("Internal error occurred", { status: 500 });
		}
	},
};
```

Postgres.js (`npm i "postgres@>=3.4.5"`):

Adapted (not in the official docs): the catch block returns a 500 response instead of `Response.error()`; see Notes.

```ts
// filepath: src/index.ts
import postgres from "postgres";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		// Create a database client that connects to your database via Hyperdrive.
		// Hyperdrive maintains the underlying database connection pool,
		// so creating a new client on each request is fast and recommended.
		const sql = postgres(env.HYPERDRIVE.connectionString, {
			// Limit the connections for the Worker request to 5 due to Workers' limits on concurrent external connections
			max: 5,
			// If you are not using array types in your Postgres schema, disable `fetch_types` to avoid an additional round-trip (unnecessary latency)
			fetch_types: false,

			// This is set to true by default, but certain query generators such as Kysely or queries using sql.unsafe() will set this to false. Hyperdrive will not cache prepared statements when this option is set to false and will require additional round-trips.  
			prepare: true,
		});

		try {
			// A very simple test query
			const result = await sql`select * from pg_tables`;

			// Return result rows as JSON
			return Response.json({ success: true, result: result });
		} catch (e: any) {
			console.error("Database error:", e.message);

			return new Response("Internal error occurred", { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
```

Drizzle ORM (`npm i drizzle-orm pg dotenv`, `npm i -D drizzle-kit tsx @types/pg @types/node`):

```ts
// src/db/schema.ts
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at").defaultNow(),
});
```

```ts
// src/index.ts
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./db/schema";

export interface Env {
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new client instance for each request.
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});

		// Connect to the database
		await client.connect();

		// Create the Drizzle client with the node-postgres connection
		const db = drizzle(client);

		// Sample query to get all users
		const allUsers = await db.select().from(users);

		return Response.json(allUsers);
	},
} satisfies ExportedHandler<Env>;
```

Drizzle Kit migrations (optional; use the direct database connection string, not Hyperdrive):

```ts
// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
```

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

Prisma ORM 8 (initialize in the Worker project; installs `@prisma/orm-postgres`, which includes the `pg` driver, and the Prisma CLI, and creates `src/prisma/contract.prisma`, `prisma.config.ts`, and a `.env` with a placeholder `DATABASE_URL`):

```sh
npx prisma@latest orm init --yes --target postgres --authoring psl --write-env
```

```prisma
// use prisma-8

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now()) @onCreate(now())
}
```

Replace the placeholder `DATABASE_URL` in `.env` with your database connection string (the Prisma CLI connects to the database directly, not through Hyperdrive), then emit the contract files and create the tables:

```txt
DATABASE_URL="postgres://user:password@host:port/database"
```

```sh
npx prisma contract emit
npx prisma db init
```

Adapted (not in the official docs): the sample email uses `crypto.randomUUID()` instead of `Date.now()` so requests in the same millisecond do not collide on a unique email; see Notes.

```ts
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "./prisma/contract.d";
import contractJson from "./prisma/contract.json" with { type: "json" };

const contract = contractFromJson<Contract>(contractJson);

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a Prisma ORM client with the Hyperdrive connection string
		const db = postgres({ contract, url: env.HYPERDRIVE.connectionString });

		try {
			// Sample query to create and fetch users
			const user = await db.orm.public.User.create({
				name: "John Doe",
				email: `john.doe.${crypto.randomUUID()}@example.com`,
			});

			const allUsers = await db.orm.public.User.all();

			return Response.json({
				newUser: user,
				allUsers: allUsers,
			});
		} finally {
			// Close the connection after the response is sent
			ctx.waitUntil(db.close());
		}
	},
} satisfies ExportedHandler<Env>;
```

Identify Hyperdrive connections with Postgres.js (it sends its own `application_name`):

```ts
const sql = postgres(env.HYPERDRIVE.connectionString, {
	max: 5,
	fetch_types: false,
	connection: {
		application_name: "Cloudflare Hyperdrive",
	},
});
```

## Options / Props

| Driver | Documentation | Minimum Version Required | Notes |
| --- | --- | --- | --- |
| node-postgres - `pg` (recommended) | node-postgres documentation | `pg@8.16.3` | `8.11.4` introduced a bug with URL parsing and will not work. `8.11.5` fixes this. Requires `compatibility_flags = ["nodejs_compat"]` and `compatibility_date = "2024-09-23"`. Requires wrangler `3.78.7` or later. |
| Postgres.js | Postgres.js documentation | `postgres@3.4.5` | Supported in both Workers & Pages. |
| Drizzle | Drizzle documentation | `0.26.2`^ | |
| Kysely | Kysely documentation | `0.26.3`^ | |
| rust-postgres | rust-postgres documentation | `v0.19.8` | Use the `query_typed` method for best performance. |

^ The marked libraries use `node-postgres` as a dependency.

## Notes

- node-postgres (`pg`) is the recommended driver: best compatibility with Hyperdrive caching and widely available in ORMs. Postgres.js is also supported.
- Do not use `prepare: false` with Postgres.js: it disables prepared statements, so Postgres.js sends extra protocol messages to discover parameter types, which transaction pooling mode does not reliably support (queries can hang or fail intermittently).
- Drizzle ORM with the Postgres.js driver over Hyperdrive is not currently supported; use node-postgres. Drizzle ORM API itself: see the drizzle skill.
- Prisma ORM 8 (official page updated 2026-11-10, #34891): the example now uses `npx prisma@latest orm init`, the `@prisma/orm-postgres` runtime (`postgres({ contract, url })`) and a `contract.prisma` data model; the earlier `@prisma/adapter-pg` driver-adapter flow (`PrismaPg` + `PrismaClient`, `npx prisma migrate dev` / `generate --no-engine`) is no longer shown on the official page. Run `npx wrangler types` so the generated `Env` type includes the `HYPERDRIVE` binding. The client is created inside `fetch` and closed with `ctx.waitUntil(db.close())`: Workers do not allow a socket opened during one request to be reused by another, so do not share a module-level client across requests. Hyperdrive pools connections at the network level, so no Prisma-specific pooling is needed. For `wrangler dev`, set a `localConnectionString` for the binding (see `local-development.md`).
- Source: https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/ (production `34d908a`, fetched 2026-11-14)
- Hyperdrive's connections show `Cloudflare Hyperdrive` as `application_name` in `pg_stat_activity` only when the driver does not send its own (Postgres.js sends `postgres.js`); that does not mean it bypasses Hyperdrive. Query: `SELECT DISTINCT usename, application_name FROM pg_stat_activity WHERE application_name = 'Cloudflare Hyperdrive'`.
- Node.js compatibility: dates `2026-08-04`+ enable `nodejs_compat` and `nodejs_compat_v2` by default; earlier dates need `nodejs_compat` (see [get-started](./get-started.md)).
- Consolidated from: https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/, https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/, https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/drizzle-orm/, https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/
- Adapted from the official docs: install commands are quoted with `>=` (the official `pg@>8.16.3` form is a shell redirection when unquoted and would exclude the stated minimum 8.16.3; same for `postgres@>3.4.5`).
- Adapted from the official docs: the Prisma ORM 8 sample's `john.doe.${Date.now()}@example.com` is replaced with a `crypto.randomUUID()` suffix, because two requests in the same millisecond would produce the same email (a unique-constraint failure if the schema has `@unique`).
- Adapted from the official docs: the official Postgres.js catch block returns `Response.error()` (a network-error response with no status or body); it is replaced with the same 500 response the node-postgres example uses.
- Clients are created per request and not closed explicitly: Hyperdrive cleans up the client connection when the request ends (see [connection-lifecycle](./connection-lifecycle.md)); do not add `client.end()` or module-level clients.
- Wrangler config and bindings in general: see the cloudflare-wrangler and cloudflare-workers skills.

## Related

- [Connect to PostgreSQL providers](./connect-postgres-providers.md)
- [Connect to MySQL (drivers)](./connect-mysql-drivers.md)
- [Supported databases and features](./supported-databases-and-features.md)
- [Connection lifecycle](./connection-lifecycle.md)
