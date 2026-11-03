---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/
---

# Vitest D1 Migrations

Read D1 migrations in Node.js at config time and pass them to tests as a test-only binding.

```ts
// vitest.config.ts
import path from "node:path";
import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest(async () => {
			const migrationsPath = path.join(__dirname, "migrations");
			const migrations = await readD1Migrations(migrationsPath);

			return {
				miniflare: {
					// Add a test-only binding for migrations, so we can apply them in a setup file
					bindings: { TEST_MIGRATIONS: migrations },
				},
			};
		}),
	],
	test: {
		setupFiles: ["./test/apply-migrations.ts"],
	},
});
```

Signature of the helper to call from the setup file (`cloudflare:test`):

```ts
applyD1Migrations(db: D1Database, migrations: D1Migration[], migrationTableName?: string): Promise<void>
```

## Notes

- The docs do not show the body of `test/apply-migrations.ts`; refer to the D1 recipe in the `workers-sdk` repository (`fixtures/vitest-plugin-examples/d1`) rather than guessing it.
- Docs inconsistency: the prose says `readD1Migrations` is exported from `@cloudflare/vitest-plugin/config`, but the example imports it from `@cloudflare/vitest-plugin`.
- `applyD1Migrations` applies only un-applied migrations and records state in the `d1_migrations` table by default.
- For `createTestHarness()` the equivalent is `worker.applyD1Migrations("DATABASE")` (see the test harness state sample).
- See [../references/vitest-integration/README.md](../references/vitest-integration/README.md).
