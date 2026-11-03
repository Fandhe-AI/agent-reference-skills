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

node-postgres (`npm i pg@>8.16.3`, `npm i -D @types/pg`):

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

Postgres.js (`npm i postgres@>3.4.5`):

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

			return Response.error();
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

Prisma ORM (`npm i -D prisma`; `npm i pg@>8.16.3 @prisma/adapter-pg`; `npx prisma init`):

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

```json
"scripts": {
  "migrate": "npx prisma migrate dev",
  "generate": "npx prisma generate --no-engine",
  "studio": "npx prisma studio"
}
```

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

export interface Env {
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create Prisma client using driver adapter with Hyperdrive connection string
		const adapter = new PrismaPg({ connectionString: env.HYPERDRIVE.connectionString });
		const prisma = new PrismaClient({ adapter });

		// Sample query to create and fetch users
		const user = await prisma.user.create({
			data: {
				name: "John Doe",
				email: `john.doe.${Date.now()}@example.com`,
			},
		});

		const allUsers = await prisma.user.findMany();

		return Response.json({
			newUser: user,
			allUsers: allUsers,
		});
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
- Prisma ORM requires driver adapters (`@prisma/adapter-pg`) to use the Hyperdrive connection string; connection pooling is provided by Hyperdrive, so Prisma Accelerate is not needed.
- Hyperdrive's connections show `Cloudflare Hyperdrive` as `application_name` in `pg_stat_activity` only when the driver does not send its own (Postgres.js sends `postgres.js`); that does not mean it bypasses Hyperdrive. Query: `SELECT DISTINCT usename, application_name FROM pg_stat_activity WHERE application_name = 'Cloudflare Hyperdrive'`.
- Node.js compatibility: dates `2026-08-04`+ enable `nodejs_compat` and `nodejs_compat_v2` by default; earlier dates need `nodejs_compat` (see [get-started](./get-started.md)).
- Consolidated from: https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/ , .../postgres-js/ , .../drizzle-orm/ , .../prisma-orm/
- Wrangler config and bindings in general: see the cloudflare-wrangler and cloudflare-workers skills.

## Related

- [Connect to PostgreSQL providers](./connect-postgres-providers.md)
- [Connect to MySQL (drivers)](./connect-mysql-drivers.md)
- [Supported databases and features](./supported-databases-and-features.md)
- [Connection lifecycle](./connection-lifecycle.md)
