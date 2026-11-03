---
source: https://developers.cloudflare.com/d1/best-practices/local-development/
---

# Local development

D1 supports local development running the same version of D1 as Cloudflare runs globally, using Wrangler (v3.0 or later) to manage local sessions and state.

## Signature / Usage

```sh
wrangler dev
```

```jsonc
{
	"d1_databases": [
		{
			"binding": "DB",
			"database_name": "test-db",
			"database_id": "c020574a-5623-407b-be0c-cd192bab9545"
		}
	]
}
```

Pages (local only) needs `preview_database_id`:

```jsonc
{
	// If you are only using Pages + D1, you only need the below in your Wrangler config file to interact with D1 locally.
	"d1_databases": [
		{
			"binding": "DB", // Should match preview_database_id
			"database_name": "YOUR_DATABASE_NAME",
			"database_id": "the-id-of-your-D1-database-goes-here", // wrangler d1 info YOUR_DATABASE_NAME
			"preview_database_id": "DB" // Required for Pages local development
		}
	]
}
```

```bash
wrangler d1 execute YOUR_DATABASE_NAME \
  --local --command "CREATE TABLE IF NOT EXISTS users ( user_id INTEGER PRIMARY KEY, email_address TEXT, created_at INTEGER, deleted INTEGER, settings TEXT);"
```

Test with Miniflare:

```js
const mf = new Miniflare({
	d1Databases: {
		DB: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	},
});

const db = await mf.getD1Database("DB");

const stmt = db.prepare("SELECT name, age FROM users LIMIT 3");
const { results } = await stmt.run();

console.log(results);
```

Test with `unstable_dev()`:

```ts
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("Test D1 Worker endpoint", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		// Optional: Run any migrations to set up your `--local` database
		// By default, this will default to the preview_database_id
		execSync(`NO_D1_WARNING=true wrangler d1 migrations apply db --local`);

		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return an array of users", async () => {
		// Our expected results
		const expectedResults = `{"results": [{"user_id": 1234, "email": "foo@example.com"},{"user_id": 6789, "email": "bar@example.com"}]}`;
		// Pass an optional URL to fetch to trigger any routing within your Worker
		const resp = await worker.fetch("/api/users/?limit=2");
		if (resp) {
			// https://jestjs.io/docs/expect#tobevalue
			expect(resp.status).toBe(200);
			const data = await resp.json();
			// https://jestjs.io/docs/expect#tomatchobjectobject
			expect(data).toMatchObject(expectedResults);
		}
	});
});
```

## Notes

- `wrangler dev` separates local and production (remote) data; a local session cannot access production data by default. Set `"remote": true` in the D1 binding configuration to use the remote database (changes against a remote database cannot be undone).
- Pages: you can only develop against a local D1 database; remote D1 development with Pages is not possible. Without `--local`, `wrangler d1 execute` runs against the remote database.
- Persistence: in Wrangler v3+, data persists across `wrangler dev` runs (start with `DROP TABLE <tablename>` if you assume an empty database). Use `wrangler dev --persist-to=/path/to/file` for a specific location. Wrangler 2.x required `--persist`.
- Run migrations locally in CI with `wrangler d1 migrations apply your-database --local`; set `preview_database_id` (e.g. `"local-test-db"`) for the local test database.
- The `unstable_dev` example in the source uses `execSync` and `describe`/`expect` without importing them (test-framework globals; `execSync` from `node:child_process`), as written.
- `wrangler dev` and Wrangler configuration generally are covered by the cloudflare-wrangler skill.

## Related

- [Remote development](./remote-development.md)
- [Migrations](./migrations.md)
- [Wrangler commands](./wrangler-commands.md)
- [Debug D1](./debug-d1.md)
