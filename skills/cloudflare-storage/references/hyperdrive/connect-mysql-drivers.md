---
source: https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/
---

# Connect to MySQL (drivers and ORMs)

Create a Hyperdrive for MySQL and query it from Workers with mysql2 (recommended), mysql, or Drizzle ORM.

## Signature / Usage

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive create my-first-hyperdrive --connection-string="mysql://user:password@database.host.example.com:3306/databasenamehere"
```

mysql2 (`npm i "mysql2@>=3.13.0"`):

```ts
// mysql2 v3.13.0 or later is required
import { createConnection } from "mysql2/promise";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new connection on each request. Hyperdrive maintains the underlying
		// database connection pool, so creating a new connection is fast.
		const connection = await createConnection({
			host: env.HYPERDRIVE.host,
			user: env.HYPERDRIVE.user,
			password: env.HYPERDRIVE.password,
			database: env.HYPERDRIVE.database,
			port: env.HYPERDRIVE.port,

			// Required to enable mysql2 compatibility for Workers
			disableEval: true,
		});

		try {
			// Sample query
			const [results, fields] = await connection.query("SHOW tables;");

			// Return result rows as JSON
			return Response.json({ results, fields });
		} catch (e) {
			console.error(e);
			return Response.json(
				{ error: e instanceof Error ? e.message : e },
				{ status: 500 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

mysql (`npm i mysql`):

Adapted (not in the official docs): callback errors now reject the Promise instead of being thrown inside a callback (which left the request hanging); see Notes.

```ts
import { createConnection } from "mysql";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const result = await new Promise<any>((resolve, reject) => {
			// Create a connection using the mysql driver with the Hyperdrive credentials (only accessible from your Worker).
			const connection = createConnection({
				host: env.HYPERDRIVE.host,
				user: env.HYPERDRIVE.user,
				password: env.HYPERDRIVE.password,
				database: env.HYPERDRIVE.database,
				port: env.HYPERDRIVE.port,
			});

			connection.connect((error: { message: string }) => {
				if (error) {
					return reject(new Error(error.message));
				}

				// Sample query
				connection.query("SHOW tables;", [], (error, rows, fields) => {
					if (error) {
						return reject(error);
					}
					resolve({ fields, rows });
				});
			});
		});

		// Return result  as JSON
		return new Response(JSON.stringify(result), {
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

Drizzle ORM (`npm i drizzle-orm mysql2 dotenv`, `npm i -D drizzle-kit tsx @types/node`):

Adapted (not in the official docs): file path comment corrected to `src/db/schema.ts` to match the import and the Drizzle Kit config; see Notes.

```ts
// src/db/schema.ts
import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at").defaultNow(),
});
```

```ts
// src/index.ts

import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import { users } from "./db/schema";

export interface Env {
	HYPERDRIVE: Hyperdrive;
  }

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a connection using the mysql2 driver with the Hyperdrive credentials (only accessible from your Worker).
		const connection = await createConnection({
			host: env.HYPERDRIVE.host,
			user: env.HYPERDRIVE.user,
			password: env.HYPERDRIVE.password,
			database: env.HYPERDRIVE.database,
			port: env.HYPERDRIVE.port,

			// Required to enable mysql2 compatibility for Workers
			disableEval: true,
		});

		// Create the Drizzle client with the mysql2 driver connection
		const db = drizzle(connection);

		// Sample query to get all users
		const allUsers = await db.select().from(users);

		return Response.json(allUsers);
	},
} satisfies ExportedHandler<Env>;
```

```ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
out: './drizzle',
schema: './src/db/schema.ts',
dialect: 'mysql',
dbCredentials: {
url: process.env.DATABASE_URL!,
  },
});
```

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Options / Props

| Driver | Documentation | Minimum Version Required | Notes |
| --- | --- | --- | --- |
| mysql2 (**recommended**) | mysql2 documentation | `mysql2@3.13.0` | Supported in both Workers & Pages. Using the Promise API is recommended. |
| mysql | mysql documentation | `mysql@2.18.0` | Requires `compatibility_flags = ["nodejs_compat"]` and `compatibility_date = "2024-09-23"`. Requires wrangler `3.78.7` or later. |
| Drizzle | Drizzle documentation | Requires `mysql2@3.13.0` | |
| Kysely | Kysely documentation | Requires `mysql2@3.13.0` | |

MySQL TLS modes:

| Mode | Supported | Details |
| --- | --- | --- |
| `DISABLED` | No | Hyperdrive does not support insecure plain text connections. |
| `PREFERRED` | No (use `REQUIRED`) | Hyperdrive will always use TLS. |
| `REQUIRED` | Yes (default) | TLS is required, and server certificates are validated (based on WebPKI). |
| `VERIFY_CA` | Yes | Verifies the server's TLS certificate is signed by a root CA on the client. |
| `VERIFY_IDENTITY` | Yes | In addition to `VERIFY_CA` checks, Hyperdrive requires the database hostname to match a Subject Alternative Name (SAN) or Common Name (CN) on the certificate. |

## Notes

- `disableEval: true` is required with mysql2 on Workers: mysql2 uses `eval()` for result parsing of rows with more than 100 columns, which is unavailable. Without it you see `Code generation from strings disallowed for this context`.
- Hyperdrive does not support MySQL prepared statements (`COM_STMT_PREPARE`); see [supported-databases-and-features](./supported-databases-and-features.md).
- Identify Hyperdrive connections: `SELECT DISTINCT t.PROCESSLIST_USER, t.PROCESSLIST_HOST FROM performance_schema.threads t JOIN performance_schema.session_connect_attrs a ON a.PROCESSLIST_ID = t.PROCESSLIST_ID WHERE a.ATTR_NAME = 'program_name' AND a.ATTR_VALUE = 'Cloudflare Hyperdrive'`.
- Corrected from the official docs: the official page queries `USER`, `HOST` and `PROGRAM_NAME` columns of `performance_schema.threads`, which do not exist in MySQL 8 (the columns are `PROCESSLIST_USER` / `PROCESSLIST_HOST`; the program name is a connection attribute in `performance_schema.session_connect_attrs`, joined on `PROCESSLIST_ID`). The query above is a MySQL 8 equivalent; it relies on the client sending `program_name` as a connection attribute.
- Drizzle Kit migrations use the direct database connection string. Drizzle ORM API itself: see the drizzle skill.
- Consolidated from: https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql2/, https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/, https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/drizzle-orm/
- Node.js compatibility flags: see [get-started](./get-started.md).
- Corrected from the official docs: the `mysql` driver example throws inside the `connect` callback, which cannot reject the wrapping Promise (the request would hang), and ignores the `query` callback error; both now call `reject`.
- Corrected from the official docs: the Drizzle schema file comment says `src/schema.ts` while the Worker imports `./db/schema` and `drizzle.config` points at `./src/db/schema.ts`; the comment now reads `src/db/schema.ts`.
- Adapted from the official docs: the install command is quoted with `>=` (the official `mysql2@>3.13.0` is a shell redirection when unquoted and would exclude the stated minimum 3.13.0).

## Related

- [Connect to MySQL providers](./connect-mysql-providers.md)
- [Connect to PostgreSQL (drivers)](./connect-postgres-drivers.md)
- [Supported databases and features](./supported-databases-and-features.md)
- [TLS/SSL certificates](./tls-ssl-certificates.md)
