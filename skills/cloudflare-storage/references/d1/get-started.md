---
source: https://developers.cloudflare.com/d1/get-started/
---

# Getting started

Create a D1 database, define a schema, bind it to a Worker, and query it from the Worker.

## Signature / Usage

Create the database (Wrangler offers to add the binding to the Wrangler configuration file):

```sh
npx wrangler@latest d1 create prod-d1-tutorial
```

```txt
✅ Successfully created DB 'prod-d1-tutorial' in region WEUR
Created your new D1 database.

{
	"d1_databases": [
		{
			"binding": "prod_d1_tutorial",
			"database_name": "prod-d1-tutorial",
			"database_id": "<unique-ID-for-your-database>"
		}
	]
}
```

Bind it to the Worker:

```jsonc
{
  "d1_databases": [
    {
      "binding": "prod_d1_tutorial", // available in your Worker on env.DB
      "database_name": "prod-d1-tutorial",
      "database_id": "<unique-ID-for-your-database>"
    }
  ]
}
```

Populate it locally, then remotely (`schema.sql`):

```sql
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
```

```sh
npx wrangler d1 execute prod-d1-tutorial --local --file=./schema.sql
npx wrangler d1 execute prod-d1-tutorial --remote --file=./schema.sql
```

Query from the Worker:

```ts
export interface Env {
	// If you set another name in the Wrangler config file for the value for 'binding',
	// replace "DB" with the variable name you defined.
	prod_d1_tutorial: D1Database;
}

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url);

		if (pathname === "/api/beverages") {
			// If you did not use `DB` as your binding name, change it here
			const { results } = await env.prod_d1_tutorial.prepare(
				"SELECT * FROM Customers WHERE CompanyName = ?",
			)
				.bind("Bs Beverages")
				.run();
			return Response.json(results);
		}

		return new Response(
			"Call /api/beverages to see everyone who works at Bs Beverages",
		);
	},
} satisfies ExportedHandler<Env>;
```

Deploy and delete:

```sh
npx wrangler deploy
npx wrangler d1 delete prod-d1-tutorial
```

## Notes

- The `binding` value is the binding name and must be a valid JavaScript variable name (for example `MY_DB`, `productionDB`). The binding is available at `env.<BINDING_NAME>` and exposes the Workers Binding API.
- A good database name uses ASCII characters, is shorter than 32 characters, uses dashes instead of spaces, describes use-case and environment (for example `staging-db-web`), and is not directly referenced in code.
- `wrangler d1 execute` without `--remote` initializes the local database only; add `--remote` to run against the production database. You can only develop locally when using Wrangler, not through the dashboard.
- Use `bind()` to prevent SQL injection.
- Pages Functions can also bind D1. Cloudflare Pages is not covered by this skill; see https://developers.cloudflare.com/pages/.
- Docs inconsistency: the Wrangler snippet's comment says the binding is "available in your Worker on env.DB" while the binding name is `prod_d1_tutorial` (and the Worker code uses `env.prod_d1_tutorial`).

## Related

- [Overview](./overview.md)
- [Workers Binding API](./worker-binding-api.md)
- [Wrangler commands](./wrangler-commands.md)
- [Local development](./local-development.md)
