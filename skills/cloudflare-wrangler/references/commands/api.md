---
source: https://developers.cloudflare.com/workers/wrangler/api/
---

# Wrangler programmatic API

Wrangler offers APIs to programmatically interact with your Cloudflare Workers: `createTestHarness`, `experimental_generateTypes`, `unstable_startWorker`, `unstable_dev`, and `getPlatformProxy`.

## Signature / Usage

### `createTestHarness`

`createTestHarness()` starts one or more Workers for integration tests from any Node.js test runner. It runs production build output from Wrangler configuration files, Vite-generated configuration files, or inline Wrangler configuration objects. The API wraps Miniflare and provides methods for dispatching requests and scheduled events. For setup guidance and examples, refer to the Integration test harness docs (https://developers.cloudflare.com/workers/testing/test-harness/).

```ts
import { createTestHarness } from "wrangler";

const server = createTestHarness(options);
```

Each `WorkerInput` can load a Worker from a Wrangler configuration file:

```ts
const server = createTestHarness({
	workers: [
		{ configPath: "./wrangler.web.jsonc" },
		{ configPath: "./wrangler.api.jsonc" },
	],
});
```

Each `WorkerInput` can also use `config` to provide an inline Wrangler configuration object:

```ts
const server = createTestHarness({
	workers: [
		{
			config: {
				name: "api-worker",
				main: "src/api.ts",
				compatibility_date: "YYYY-MM-DD",
			},
		},
	],
});
```

Usage with the Node.js built-in test runner:

```ts
import assert from "node:assert/strict";
import { after, afterEach, before, describe, test } from "node:test";
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [
		{ configPath: "./wrangler.web.jsonc" },
		{ configPath: "./wrangler.api.jsonc" },
	],
});

const apiWorker = server.getWorker("api-worker");

describe("Worker", () => {
	before(async () => {
		await server.listen();
	});

	afterEach(async () => {
		await server.reset();
	});

	after(async () => {
		await server.close();
	});

	test("dispatches through configured routes", async () => {
		const response = await server.fetch("http://example.com/users/123");
		assert.equal(response.status, 200);
	});

	test("calls a specific Worker directly", async () => {
		const response = await apiWorker.fetch(
			"http://api.example.com/v1/users/123",
		);
		assert.equal(response.status, 200);
	});

	test("triggers a scheduled handler", async () => {
		const result = await apiWorker.scheduled({
			cron: "0 0 * * *",
			scheduledTime: new Date(),
		});
		assert.equal(result.outcome, "ok");
	});
});
```

### `experimental_generateTypes`

Generate TypeScript type definitions from your Worker configuration. This API uses the same core logic as the `wrangler types` CLI command, so outputs stay aligned between the CLI and programmatic API. Unlike the CLI command, `experimental_generateTypes` does not write to disk automatically. Instead, it returns the generated type content as structured strings for you to handle as needed.

```ts
import { experimental_generateTypes } from "wrangler";

const result = await experimental_generateTypes(options);
```

Write the combined content to disk yourself, or pass it to other tools:

```ts
import { experimental_generateTypes } from "wrangler";
import * as fs from "node:fs";

const result = await experimental_generateTypes({
	config: "wrangler.json",
	includeRuntime: true,
	includeEnv: true,
});

// Write the combined content to the path specified in options
fs.writeFileSync(result.path, result.content, "utf-8");
```

To generate only env types without runtime types:

```ts
const result = await experimental_generateTypes({
	includeRuntime: false,
});
```

To generate types for a specific environment with a custom interface name:

```ts
const result = await experimental_generateTypes({
	env: "staging",
	envInterface: "StagingEnv",
	path: "./types/staging.d.ts",
});
```

### `unstable_startWorker` (deprecated)

Caution: `unstable_startWorker()` is deprecated. Cloudflare recommends `createTestHarness()` for integration testing. To start a development server programmatically, use the Vite `createServer()` API (https://vite.dev/guide/api-javascript.html#createserver) with the Cloudflare Vite plugin.

This API exposes the internals of Wrangler's dev server, and allows you to customise how it runs. For example, you could use `unstable_startWorker()` to run integration tests against your Worker. This example uses `node:test`, but should apply to any testing framework:

```js
import assert from "node:assert";
import test, { after, before, describe } from "node:test";
import { unstable_startWorker } from "wrangler";

describe("worker", () => {
	let worker;

	before(async () => {
		worker = await unstable_startWorker({ config: "wrangler.json" });
	});

	test("hello world", async () => {
		assert.strictEqual(
			await (await worker.fetch("http://example.com")).text(),
			"Hello world",
		);
	});

	after(async () => {
		await worker.dispose();
	});
});
```

### `unstable_dev` (deprecated)

Caution: `unstable_dev()` is deprecated. Cloudflare recommends `createTestHarness()` for integration testing. To start a development server programmatically, use the Vite `createServer()` API with the Cloudflare Vite plugin.

Start an HTTP server for testing your Worker. Once called, `unstable_dev` will return a `fetch()` function for invoking your Worker without needing to know the address or port, as well as a `stop()` function to shut down the HTTP server.

By default, `unstable_dev` will perform integration tests against a local server. If you wish to perform an e2e test against a preview Worker, pass `local: false` in the `options` object when calling the `unstable_dev()` function. Note that e2e tests can be significantly slower than integration tests.

```js
const worker = await unstable_dev(script, options);
```

When initiating each test suite, use a `beforeAll()` function to start `unstable_dev()`. The `beforeAll()` function is used to minimize overhead: starting the dev server takes a few hundred milliseconds, starting and stopping for each individual test adds up quickly, slowing your tests down. In each test case, call `await worker.fetch()`, and check that the response is what you expect. To wrap up a test suite, call `await worker.stop()` in an `afterAll` function.

Single Worker example:

```ts
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return Hello World", async () => {
		const resp = await worker.fetch();
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello World!"`);
	});
});
```

The official page also shows the same test in JavaScript (`const { unstable_dev } = require("wrangler");`, `src/index.js`, `let worker;`).

Multi-Worker example. You can test Workers that call other Workers. In the example, the Worker that calls other Workers is the parent Worker, and the Worker being called is a child Worker. If you shut down the child Worker prematurely, the parent Worker will not know the child Worker exists and your tests will fail.

```ts
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("multi-worker testing", () => {
	let childWorker: UnstableDevWorker;
	let parentWorker: UnstableDevWorker;

	beforeAll(async () => {
		childWorker = await unstable_dev("src/child-worker.js", {
			config: "src/child-wrangler.toml",
			experimental: { disableExperimentalWarning: true },
		});
		parentWorker = await unstable_dev("src/parent-worker.js", {
			config: "src/parent-wrangler.toml",
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await childWorker.stop();
		await parentWorker.stop();
	});

	it("childWorker should return Hello World itself", async () => {
		const resp = await childWorker.fetch();
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it("parentWorker should return Hello World by invoking the child worker", async () => {
		const resp = await parentWorker.fetch();
		const parsedResp = await resp.text();
		expect(parsedResp).toEqual("Parent worker sees: Hello World!");
	});
});
```

### `getPlatformProxy`

The `getPlatformProxy` function provides a way to obtain an object containing proxies (to **local** `workerd` bindings) and emulations of Cloudflare Workers specific values, allowing the emulation of such in a Node.js process.

One general use case for getting a platform proxy is for emulating bindings in applications targeting Workers, but running outside the Workers runtime (for example, framework local development servers running in Node.js), or for testing purposes (for example, ensuring code properly interacts with a type of binding).

```js
const platform = await getPlatformProxy(options);
```

The `getPlatformProxy` function uses bindings found in the Wrangler configuration file. For example, if you have an environment variable configuration set up in the Wrangler configuration file:

```jsonc
{
	"vars": {
		"MY_VARIABLE": "test"
	}
}
```

```toml
[vars]
MY_VARIABLE = "test"
```

You can access the bindings by importing `getPlatformProxy` like this:

```js
import { getPlatformProxy } from "wrangler";

const { env } = await getPlatformProxy();
```

To access the value of the `MY_VARIABLE` binding add the following to your code:

```js
console.log(`MY_VARIABLE = ${env.MY_VARIABLE}`);
```

This will print the following output: `MY_VARIABLE = test`.

Durable Object bindings: to use a Durable Object binding with `getPlatformProxy`, always specify a `script_name`. For example:

```jsonc
{
  "durable_objects": {
    "bindings": [
      {
        "name": "MyDurableObject",
        "class_name": "MyDurableObject",
        "script_name": "external-do-worker"
      }
    ]
  }
}
```

```toml
[[durable_objects.bindings]]
name = "MyDurableObject"
class_name = "MyDurableObject"
script_name = "external-do-worker"
```

You will need to declare your Durable Object `"MyDurableObject"` in another Worker, called `external-do-worker` in this example (`./external-do-worker/src/index.ts`):

```ts
export class MyDurableObject extends DurableObject {
	// Your DO code goes here
}

export default {
	fetch() {
		// Doesn't have to do anything, but a DO cannot be the default export
		return new Response("Hello, world!");
	},
};
```

That Worker also needs a Wrangler configuration file that looks like this:

```jsonc
{
	"name": "external-do-worker",
	"main": "src/index.ts",
    "upload_source_maps": true,
	"compatibility_date": "XXXX-XX-XX"
}
```

```toml
name = "external-do-worker"
main = "src/index.ts"
upload_source_maps = true
compatibility_date = "XXXX-XX-XX"
```

If you are not using RPC with your Durable Object, you can run a separate Wrangler dev session alongside your framework development server. Otherwise, you can build your application and run both Workers in the same Wrangler dev session.

If you are using Pages run:

```sh
npx wrangler pages dev -c path/to/pages/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
```

If you are using Workers with Assets run:

```sh
npx wrangler dev -c path/to/workers-assets/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
```

## Options / Props

### `createTestHarness(options)` parameters

`options` is optional. If you call `createTestHarness()` without options, call `server.update(options)` before `server.listen()`.

| Name | Type | Description |
| --- | --- | --- |
| `root` | string, optional | Base directory used to resolve relative Worker configuration paths. Defaults to `process.cwd()`. |
| `workers` | WorkerInput[] | Workers to run in the test server. The first Worker is the primary Worker. |

Configuration file inputs (`WorkerInput`) support these fields:

| Name | Type | Description |
| --- | --- | --- |
| `configPath` | string \| URL | Path to a Wrangler configuration file. Relative paths resolve from `root`. |
| `env` | string, optional | Wrangler environment to load from the configuration file. |
| `vars` | Record<string, Json>, optional | Test-only variables that override variables from the Wrangler configuration file. |
| `secrets` | Record<string, string>, optional | Test-only secrets that override values loaded from `.dev.vars` and `.env` files. |
| `bindingOverrides` | Record<string, string>, optional | Test-only service binding overrides. Keys are binding names in this Worker's environment. Values are Worker names in this test harness. |

### `createTestHarness` return type (`TestHarness`)

| Method | Returns | Description |
| --- | --- | --- |
| `listen()` | Promise<{ url: URL }> | Starts the server and returns its current URL. Repeated calls return the same session until the server is closed or reset. |
| `fetch(input, init)` | Promise<Response> | Dispatches a fetch request through the server. Relative URLs resolve against the current server URL. Absolute URLs follow the configured Worker routes and fall back to the primary Worker. |
| `getWorker(name?)` | WorkerHandle | Returns a handle for dispatching events directly to a Worker. When no name is provided, this returns the primary Worker. |
| `getLogs()` | WorkerdStructuredLog[] | Returns captured Workers runtime logs since the current server session started or `clearLogs()` was last called. |
| `clearLogs()` | void | Clears captured Workers runtime logs. |
| `debug()` | void | Prints a diagnostic timeline for this test server, including server events and captured Workers runtime logs. This is useful in a test runner failure or cleanup hook. |
| `update(optionsOrUpdater)` | Promise<void> | Updates the server configuration with a `TestHarnessOptions` object or a function that receives the current options and returns the next options. If the server has not started yet, this configures the options used by `listen()`. If the server is running, this reloads the running Workers. Updating the number of Workers in a running server is not supported. |
| `reset()` | Promise<void> | Restores the server to the options used when the current session first started. Storage is recreated, and the server URL may change after reset. |
| `close()` | Promise<void> | Stops the server and releases all runtime resources. |

`getWorker(name?)` returns a `WorkerHandle`:

| Method | Returns | Description |
| --- | --- | --- |
| `fetch(input, init)` | Promise<Response> | Dispatches a fetch event directly to this Worker. |
| `scheduled(options)` | Promise<{ outcome: "ok" \| "canceled" \| "exception"; noRetry: boolean }> | Dispatches a scheduled event directly to this Worker. |
| `getEnv()` | Promise<Env> | Returns the full environment object configured for this Worker, including variables, secrets, and bindings. |
| `getExport()` | Promise<Service<Module['default']>> | Returns the default Worker export, including RPC methods. |
| `applyD1Migrations(bindingName)` | Promise<void> | Applies local D1 migration files that have not already run to a D1 binding on this Worker. |
| `getDurableObjectStorage(classNameOrBindingName, options)` | Promise<DurableObjectStorageHandle> | Returns SQL storage access for a Durable Object instance. |
| `introspectWorkflow(bindingName)` | Promise<WorkflowIntrospector> | Creates an introspector for Workflow instances created after this method is called. |
| `introspectWorkflowInstance(bindingName, instanceId)` | Promise<WorkflowInstanceIntrospector> | Creates an introspector for a specific Workflow instance. |

### `experimental_generateTypes(options)` parameters

`options` is optional and mirrors the `wrangler types` CLI flags:

| Name | Type | Description |
| --- | --- | --- |
| `config` | string \| string[] | Path to the Wrangler configuration file to use. Can be an array for multi-config type resolution. |
| `env` | string | Name of the Wrangler environment to generate types for. |
| `envFile` | string[] | Paths to `.env` files to load when inferring local variables and secrets. |
| `envInterface` | string | Name of the generated environment interface. Defaults to `Env`. |
| `includeEnv` | boolean | Whether to include environment and bindings types in the output. Defaults to `true`. |
| `includeRuntime` | boolean | Whether to include runtime types in the output. Defaults to `true`. |
| `path` | string | Path to the declaration file for generated types. Defaults to `worker-configuration.d.ts`. |
| `strictVars` | boolean | Whether to generate strict literal and union types for variables. Defaults to `true`. |

Return type: a `Promise` resolving to:

| Field | Type | Description |
| --- | --- | --- |
| `content` | string | Combined formatted output containing all generated sections, including headers and both env and runtime types. |
| `env` | string \| null | Generated environment and bindings types, or `null` when env types are excluded. |
| `path` | string | Target declaration file path associated with this generation run. |
| `runtime` | string \| null | Generated runtime types, or `null` when runtime types are excluded. |

### `unstable_dev(script, options)` parameters

| Name | Type | Description |
| --- | --- | --- |
| `script` | string | A string containing a path to your Worker script, relative to your Worker project's root directory. |
| `options` | object, optional | Optional options object containing `wrangler dev` configuration settings. Include an `experimental` object inside `options` to access experimental features such as `disableExperimentalWarning`. Set `disableExperimentalWarning` to `true` to disable Wrangler's warning about using `unstable_` prefixed APIs. |

Return type: an object containing:

| Method | Returns | Description |
| --- | --- | --- |
| `fetch()` | Promise<Response> | Send a request to your Worker. Returns a Promise that resolves with a `Response` object. |
| `stop()` | Promise<void> | Shuts down the dev server. |

### `getPlatformProxy(options)` parameters

| Name | Type | Description |
| --- | --- | --- |
| `environment` | string | The environment to use. |
| `configPath` | string | The path to the config file to use. If no path is specified, the default behavior is to search from the current directory up the filesystem for a Wrangler configuration file to use. Note: this field is optional but if a path is specified it must point to a valid file on the filesystem. |
| `persist` | boolean \| `{ path: string }` | Indicates if and where to persist the bindings data. If `true` or `undefined`, defaults to the same location used by Wrangler, so data can be shared between it and the caller. If `false`, no data is persisted to or read from the filesystem. Note: If you use `wrangler`'s `--persist-to` option, note that this option adds a subdirectory called `v3` under the hood while `getPlatformProxy`'s `persist` does not. For example, if you run `wrangler dev --persist-to ./my-directory`, to reuse the same location using `getPlatformProxy`, you will have to specify: `persist: { path: "./my-directory/v3" }`. |
| `remoteBindings` | boolean, optional (default: `true`) | Whether or not remote bindings should be enabled. |

Return type: a `Promise` resolving to:

| Field | Type | Description |
| --- | --- | --- |
| `env` | Record<string, unknown> | Object containing proxies to bindings that can be used in the same way as production bindings. This matches the shape of the `env` object passed as the second argument to modules-format workers. These proxy to binding implementations run inside `workerd`. TypeScript Tip: `getPlatformProxy<Env>()` is a generic function. You can pass the shape of the bindings record as a type argument to get proper types without `unknown` values. |
| `cf` | IncomingRequestCfProperties (read-only) | Mock of the `Request`'s `cf` property, containing data similar to what you would see in production. |
| `ctx` | object | Mock object containing implementations of the `waitUntil` and `passThroughOnException` functions that do nothing. |
| `caches` | object | Emulation of the Workers `caches` runtime API. For the time being, all cache operations do nothing. A more accurate emulation will be made available soon. |
| `dispose()` | () => Promise<void> | Terminates the underlying `workerd` process. Call this after the platform proxy is no longer required by the program. If you are running a long running process (such as a dev server) that can indefinitely make use of the proxy, you do not need to call this function. |

## Notes

- `experimental_generateTypes()` has an `experimental_` prefix because the API is experimental and may change in the future.
- `unstable_startWorker()` and `unstable_dev()` are deprecated; use `createTestHarness()`.
- `getPlatformProxy` is, by design, to be used exclusively in Node.js applications. It cannot be run inside the Workers runtime. Binding proxies are a best effort emulation of the real production bindings; there might be slight differences.
- `getPlatformProxy` does not run your Worker's code. It ignores the Workflows declared in the `exports` field of your Wrangler configuration.
- Supported bindings for `getPlatformProxy`: environment variables, service bindings, KV namespace bindings, R2 bucket bindings, Queue bindings, D1 database bindings, Hyperdrive bindings, Workers AI bindings, Durable Object bindings.
- Hyperdrive proxies return passthrough values: values such as `connectionString` and `host` do not have a valid meaning outside of a `workerd` process, so they correspond to the database connection provided by the user.
- Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.
- Binding API details for KV / R2 / D1 / Hyperdrive / Queue belong to the cloudflare-storage skill; Durable Object, `ctx.waitUntil`, and `caches` runtime APIs belong to the cloudflare-workers skill.
- Docs formatting glitch kept out of the transcription: the official page's Durable Object example caption reads `./external-do-worker/src/index.tsts`; the correct file is `src/index.ts` per the config shown.

## Related

- [Workers](./workers.md)
- [Workers versions and deployments](./workers-versions.md)
- [Global flags](./global-flags.md)
