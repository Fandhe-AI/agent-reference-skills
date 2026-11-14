---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/
---

# Configuration

The Workers Vitest integration adds configuration on top of Vitest's usual options through the `cloudflareTest()` Vite plugin, exported from `@cloudflare/vitest-plugin`.

## Signature / Usage

For a project with a `cloudflare.config.ts` file (the new `cf` CLI, beta), set the `config` option:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			config: true,
		}),
	],
});
```

If your project uses a Wrangler configuration file, set the `wrangler` option instead of `config`:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: {
				configPath: "./wrangler.jsonc",
			},
		}),
	],
});
```

`cloudflareTest(options)` also accepts an optionally-`async` function returning `options`. Add it to the `plugins` array alongside `defineConfig()` from Vitest.

### `buildPagesASSETSBinding(assetsPath)`

Creates a Pages ASSETS binding that serves files inside `assetsPath`. Required if you use `createPagesEventContext()` to test Pages Functions.

```ts
import path from "node:path";
import { buildPagesASSETSBinding, cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest(async () => {
			const assetsPath = path.join(__dirname, "public");

			return {
				miniflare: {
					serviceBindings: {
						ASSETS: await buildPagesASSETSBinding(assetsPath),
					},
				},
			};
		}),
	],
});
```

### `readD1Migrations(migrationsPath)`

Reads all D1 migrations stored at `migrationsPath` and returns them ordered by migration number, each split into an array of individual SQL queries. Call `applyD1Migrations()` inside a test or setup file to apply them.

```ts
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

### Dynamic configuration with `inject`

Pass an `async` function to `cloudflareTest()` that receives `inject` to define `miniflare` configuration from values `provide()`d by `globalSetup` scripts (for example an upstream server started on a random port).

```ts
// env.d.ts
declare module "vitest" {
	interface ProvidedContext {
		port: number;
	}
}

// global-setup.ts
import type { GlobalSetupContext } from "vitest/node";
export default function ({ provide }: GlobalSetupContext) {
	// Runs inside Node.js, could start server here...
	provide("port", 1337);
	return () => {
		/* ...then teardown here */
	};
}

// vitest.config.ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest(({ inject }) => ({
			miniflare: {
				hyperdrives: {
					DATABASE: `postgres://user:pass@example.com:${inject("port")}/db`,
				},
			},
		})),
	],
	test: {
		globalSetup: ["./global-setup.ts"],
	},
});
```

### `SourcelessWorkerOptions`

```ts
type SourcelessWorkerOptions = Omit<
	WorkerOptions,
	"script" | "scriptPath" | "modules" | "modulesRoot"
>;
```

## Options / Props

`CloudflareTestOptions` (passed directly to `cloudflareTest()`):

| Name | Type | Description |
|------|------|-------------|
| `config` | `boolean \| string` (optional) | Load the entry point, compatibility settings, bindings, triggers and exports from a `cloudflare.config.ts` file. Pass `true` to load `cloudflare.config.ts` from the project root, or a path relative to the project root. Cannot be used together with `wrangler`. If `cloudflare.config.ts` exports a function, it receives the Vitest mode as `ctx.mode` (default `test`; change with `vitest --mode <MODE>`). |
| `main` | `string` (optional) | Entry point to the Worker run in the same isolate/context as tests. Required to use Durable Objects without an explicit `scriptName` if classes are defined in the same Worker. Goes through Vite transforms and can be TypeScript. `import module from "<path-to-main>"` inside tests gives exactly the same `module` instance used internally for `exports` and Durable Object bindings. If this option is not set, the entry point from your configuration file is used: `main` in a Wrangler configuration file, or `entrypoint` in `cloudflare.config.ts`. |
| `miniflare` | `SourcelessWorkerOptions & { workers?: WorkerOptions[]; }` (optional) | Configuration normally stored in the Wrangler config file (bindings, compatibility dates, compatibility flags). Use `main` instead of Miniflare `script`, `scriptPath`, or `modules`. If no `compatibility_date` is provided, the latest locally available date is used. If you also set `config` or `wrangler`, these options are merged with the configuration from that file, and `miniflare` values take precedence. The `workers` array configures auxiliary Workers that run in the same `workerd` process as tests and can be bound to. |
| `wrangler` | `{ configPath?: string; environment?: string; }` (optional) | `configPath`: Wrangler config file to load `main`, compatibility settings and bindings from (accepts `.toml` and `.json` files). Merged with `miniflare`, with `miniflare` values taking precedence (e.g. a `serviceBindings: { SERVICE(request) { return new Response("body"); } }` entry overrides a `SERVICE` service binding from the Wrangler config). `environment`: Wrangler environment to pick up bindings and variables from. The Wrangler `alias` field is not read; set the same aliases in Vite's `resolve.alias` in your Vitest configuration. Cannot be used together with `config`. |

Auxiliary Workers (`miniflare.workers`), unlike the `main` Worker:

- Cannot have TypeScript entrypoints. Compile them to JavaScript first, e.g. with `wrangler deploy --dry-run --outdir dist`.
- Use regular Workers module resolution semantics (see isolation-and-concurrency).
- Cannot access the `cloudflare:test` module.
- Do not require specific compatibility dates or flags.
- Can be written with the Service Worker syntax.
- Are not affected by global mocks defined in your tests.

## Notes

- Custom Vitest `environment`s or `runner`s are not supported when using the Workers Vitest integration.
- `buildPagesASSETSBinding` and `readD1Migrations` are described as "Exported from `@cloudflare/vitest-plugin/config`", yet the docs' own examples import them from `@cloudflare/vitest-plugin`. The migration page states the rename also applies to the `@cloudflare/vitest-plugin/config` subpath. Docs inconsistency; the import path in the examples is reproduced verbatim.
- `createPagesEventContext()` is mentioned but not defined on this page. The `additionalExports` option appears in [known-issues.md](./known-issues.md) but is not listed in the `CloudflareTestOptions` section of this page.
- Vitest itself (test API, config, mocking): see the vitest skill. This package only provides the Workers runtime pool/plugin.
- Miniflare `WorkerOptions` interface: https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions. D1 recipe: https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/d1. Hyperdrive recipe: https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/hyperdrive.
- `cloudflare.config.ts` and the `cf` CLI are outside this skill (new `cf` CLI beta is not covered); see https://developers.cloudflare.com/cf/projects/cloudflare-config/ .
- Source: https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

### Release notes (@cloudflare/vitest-plugin 1.6.0 to 1.8.2)

- 1.7.0 runs the Containers that the Wrangler configuration attaches to Durable Objects; 1.8.0 does the same for `cloudflare.config.ts`; 1.6.0 adds local Artifacts support. Source: https://github.com/cloudflare/workers-sdk/releases (tags `@cloudflare/vitest-plugin@1.6.0`, `@1.7.0`, `@1.8.0`)

## Related

- [test-apis.md](./test-apis.md)
- [isolation-and-concurrency.md](./isolation-and-concurrency.md)
- [known-issues.md](./known-issues.md)
- [write-your-first-test.md](./write-your-first-test.md)
