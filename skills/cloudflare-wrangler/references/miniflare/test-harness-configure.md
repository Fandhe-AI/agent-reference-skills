---
source: https://developers.cloudflare.com/workers/testing/test-harness/configure/
---

# Configure the test harness

Configure Workers, environments, variables, secrets, lifecycle, debug output, and types for `createTestHarness()`.

## Signature / Usage

Multiple project types in one harness (run `vite build` first for Cloudflare Vite plugin projects):

```ts
const server = createTestHarness({
	workers: [
		// Wrangler project
		{ configPath: "./workers/api/wrangler.jsonc" },
		// Vite project (built output from the Cloudflare Vite plugin)
		{ configPath: "./dist/web_worker/wrangler.json" },
	],
});
```

Select a Wrangler environment:

```ts
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc", env: "test" }],
});
```

Override variables and secrets:

```ts
const server = createTestHarness({
	workers: [
		{
			configPath: "./wrangler.jsonc",
			vars: { API_HOST: "http://identity.example.com" },
			secrets: { API_TOKEN: "test-token" },
		},
	],
});
```

Configure after setup with `server.update()`:

```ts
const server = createTestHarness();
let upstream: { url: string; close(): Promise<void> };

beforeAll(async () => {
	upstream = await startLocalApi();

	await server.update({
		workers: [
			{
				configPath: "./wrangler.jsonc",
				vars: { API_HOST: upstream.url },
			},
		],
	});

	await server.listen();
});

afterAll(async () => {
	await server.close();
	await upstream.close();
});
```

Reset between tests:

```ts
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});

afterEach(async () => {
	await server.reset();
});
```

Print debug output on failure:

```ts
afterEach(({ task }) => {
	if (task.result?.state === "fail") {
		server.debug();
	}
});
```

Types for Worker handles (generate env type, one interface per Worker):

```sh
npx wrangler types ./workers/api/worker-configuration.d.ts --config ./workers/api/wrangler.jsonc --env-interface ApiEnv
```

```json
{
	"include": ["./workers/*/worker-configuration.d.ts", "./tests/**/*.ts"]
}
```

```ts
const apiWorker = server.getWorker<
	ApiEnv,
	typeof import("../workers/api/index")
>("api-worker");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| workers[].configPath | string | Path to the Wrangler configuration file (or generated config for a Vite project) |
| workers[].env | string | Wrangler environment to load; default is the top-level config |
| workers[].vars | object | Override `vars` for that Worker |
| workers[].secrets | object | Override `secrets` for that Worker |
| workers[].bindingOverrides | object | Route a binding to a test Worker (see Prepare test state) |

## Notes

- `workers` entries each run in a single local server and are configured independently.
- `server.reset()` recreates local storage and restores Workers to the options used when the current session started; reapply migrations and seed data afterwards.
- `server.debug()` prints the server timeline and captured Workers runtime logs.
- `server.getWorker()` takes type parameters for the Worker env and module exports; re-run `wrangler types` when the Worker configuration changes.
- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [test-harness-overview.md](./test-harness-overview.md)
- [test-harness-prepare-test-state.md](./test-harness-prepare-test-state.md)
- [test-harness-interact-with-workers.md](./test-harness-interact-with-workers.md)
- [../vite-plugin/overview.md](../vite-plugin/overview.md)
