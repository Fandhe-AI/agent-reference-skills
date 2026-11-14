---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/
---

# Test APIs

Runtime helpers for writing tests, exported from `cloudflare:workers` and `cloudflare:test`. `cloudflare:test` is provided by `@cloudflare/vitest-plugin` and can only be imported from test files that execute in the Workers runtime. `cloudflare:workers` is a Workers runtime module that production code also imports (`env`, `exports`, `WorkerEntrypoint`, ...); under the plugin, its `env` is populated from the Vitest configuration.

## Signature / Usage

```js
import { env } from "cloudflare:workers";

it("uses binding", async () => {
  await env.KV_NAMESPACE.put("key", "value");
  expect(await env.KV_NAMESPACE.get("key")).toBe("value");
});
```

Type `env` with an ambient module declaration:

```ts
declare module "cloudflare:workers" {
  interface ProvidedEnv {
    KV_NAMESPACE: KVNamespace;
  }
  // ...or if you have an existing `Env` type...
  interface ProvidedEnv extends Env {}
}
```

### `cloudflare:workers` exports

- `env`: `import("cloudflare:workers").ProvidedEnv` - the `env` object (bindings defined in the Vitest configuration file), for use as the second argument to ES modules format exported handlers.
- `exports`: object - exports of the `main` Worker. Use `exports.default.fetch()` for integration tests against the default export handler. The `main` Worker runs in the same isolate/context as tests so global mocks apply to it. Unlike the previous `SELF` binding, `exports` does not expose Assets; to test assets, use an integration test with `createTestHarness()` (see Notes).

```js
import { exports } from "cloudflare:workers";

it("dispatches fetch event", async () => {
  const response = await exports.default.fetch("https://example.com");
  expect(await response.text()).toMatchInlineSnapshot(...);
});
```

### `cloudflare:test` exports: Events

- `createExecutionContext()`: `ExecutionContext` - context object for use as the third argument to exported handlers.
- `waitOnExecutionContext(ctx:ExecutionContext)`: `Promise<void>` - waits for all Promises passed to `ctx.waitUntil()` to settle. Only accepts instances from `createExecutionContext()`.

```ts
import { env } from "cloudflare:workers";
import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { it, expect } from "vitest";
import worker from "./index.mjs";

it("calls fetch handler", async () => {
  const request = new Request("https://example.com");
  const ctx = createExecutionContext();
  const response = await worker.fetch(request, env, ctx);
  await waitOnExecutionContext(ctx);
  expect(await response.text()).toMatchInlineSnapshot(...);
});
```

- `createScheduledController(options?:FetcherScheduledOptions)`: `ScheduledController` - first argument to `scheduled()` handlers.

```ts
import { env } from "cloudflare:workers";
import { createScheduledController, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { it, expect } from "vitest";
import worker from "./index.mjs";

it("calls scheduled handler", async () => {
  const ctrl = createScheduledController({
    scheduledTime: new Date(1000),
    cron: "30 * * * *"
  });
  const ctx = createExecutionContext();
  await worker.scheduled(ctrl, env, ctx);
  await waitOnExecutionContext(ctx);
});
```

- `createMessageBatch(queueName:string, messages:ServiceBindingQueueMessage[])`: `MessageBatch` - first argument to `queue()` handlers (Queues consumer API: cloudflare-stateful skill; https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer).
- `getQueueResult(batch:MessageBatch, ctx:ExecutionContext)`: `Promise<FetcherQueueResult>` - gets the acknowledged/retry state of messages in the batch and waits for all `waitUntil()`ed Promises to settle. Only accepts instances from `createMessageBatch()` and `createExecutionContext()`.

```ts
import { env } from "cloudflare:workers";
import { createMessageBatch, createExecutionContext, getQueueResult } from "cloudflare:test";
import { it, expect } from "vitest";
import worker from "./index.mjs";

it("calls queue handler", async () => {
  const batch = createMessageBatch("my-queue", [
    {
      id: "message-1",
      timestamp: new Date(1000),
      body: "body-1",
      attempts: 1
    }
  ]);
  const ctx = createExecutionContext();
  await worker.queue(batch, env, ctx);
  const result = await getQueueResult(batch, ctx);
  expect(result.ackAll).toBe(false);
  expect(result.retryBatch).toMatchObject({ retry: false });
  expect(result.explicitAcks).toStrictEqual(["message-1"]);
  expect(result.retryMessages).toStrictEqual([]);
});
```

### `cloudflare:test` exports: Durable Objects

- `runInDurableObject<O extends DurableObject, R>(stub:DurableObjectStub, callback:(instance: O, state: DurableObjectState) => R | Promise<R>)`: `Promise<R>` - runs `callback` inside the Durable Object for `stub`. Temporarily replaces the object's `fetch()` handler with `callback`, then sends a request to it and returns the result. Use to call/spy-on methods or seed/get persisted data. Only works with stubs pointing to Durable Objects defined in the `main` Worker.

```ts
export class Counter {
  constructor(readonly state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    let count = (await this.state.storage.get<number>("count")) ?? 0;
    void this.state.storage.put("count", ++count);
    return new Response(count.toString());
	}
}
```

```ts
import { env } from "cloudflare:workers";
import { runInDurableObject } from "cloudflare:test";
import { it, expect } from "vitest";
import { Counter } from "./index.ts";

it("increments count", async () => {
  const id = env.COUNTER.newUniqueId();
  const stub = env.COUNTER.get(id);
  let response = await stub.fetch("https://example.com");
  expect(await response.text()).toBe("1");

  response = await runInDurableObject(stub, async (instance: Counter, state) => {
    expect(instance).toBeInstanceOf(Counter);
    expect(await state.storage.get<number>("count")).toBe(1);

    const request = new Request("https://example.com");
    return instance.fetch(request);
  });
  expect(await response.text()).toBe("2");
});
```

- `runDurableObjectAlarm(stub:DurableObjectStub)`: `Promise<boolean>` - immediately runs and removes the object's alarm if scheduled. Returns `true` if an alarm ran, `false` otherwise. Only for `main` Worker Durable Objects.
- `evictDurableObject(stub:DurableObjectStub, options?:DurableObjectEvictionOptions)`: `Promise<void>` - evicts the currently-running Durable Object, tearing down its instance to reset in-memory state. By default hibernatable WebSockets are hibernated rather than closed, and eviction waits up to 30 seconds for in-flight requests to drain. Rejects if `stub` is not a Durable Object stub, the target is not currently running, or its namespace has eviction prevented. Only for `main` Worker Durable Objects.

```ts
import { env } from "cloudflare:workers";
import { evictDurableObject } from "cloudflare:test";
import { it, expect } from "vitest";

it("preserves stored data across eviction", async () => {
  const id = env.COUNTER.idFromName("evict-test");
  const stub = env.COUNTER.get(id);

  // Each request increments and persists the count to storage
  expect(await (await stub.fetch("https://example.com")).text()).toBe("1");
  expect(await (await stub.fetch("https://example.com")).text()).toBe("2");

  // Evict the Durable Object. The in-memory instance is torn down,
  // but durable storage is preserved.
  await evictDurableObject(stub);

  // The next request reconstructs the instance and reads the persisted count
  expect(await (await stub.fetch("https://example.com")).text()).toBe("3");
});
```

- `listDurableObjectIds(namespace:DurableObjectNamespace)`: `Promise<DurableObjectId[]>` - IDs of all objects created in `namespace`. Respects per-file storage isolation (objects from other test files are not returned).

```ts
import { env } from "cloudflare:workers";
import { listDurableObjectIds } from "cloudflare:test";
import { it, expect } from "vitest";

it("increments count", async () => {
  const id = env.COUNTER.newUniqueId();
  const stub = env.COUNTER.get(id);
  const response = await stub.fetch("https://example.com");
  expect(await response.text()).toBe("1");

  const ids = await listDurableObjectIds(env.COUNTER);
  expect(ids.length).toBe(1);
  expect(ids[0].equals(id)).toBe(true);
});
```

- `reset()`: `Promise<void>` - deletes all data from all attached bindings; useful for resetting state between test blocks.

```ts
import { reset } from "cloudflare:test";
import { afterEach } from "vitest";

afterEach(async () => {
  await reset();
});
```

- `abortAllDurableObjects()`: `Promise<void>` - resets all Durable Object instances. Unlike `reset()`, does not delete persisted data. Forcibly tears down running instances, discarding in-memory state without waiting for in-flight requests.

```ts
import { abortAllDurableObjects } from "cloudflare:test";
import { afterEach } from "vitest";

afterEach(async () => {
  await abortAllDurableObjects();
});
```

- `evictAllDurableObjects(options?:DurableObjectEvictionOptions)`: `Promise<void>` - gracefully evicts all running Durable Objects in evictable namespaces (hibernates hibernatable WebSockets by default; waits up to 30 seconds for in-flight requests). Non-running or idle objects are skipped; namespaces with eviction prevented are respected.

```ts
import { evictAllDurableObjects } from "cloudflare:test";
import { afterEach } from "vitest";

afterEach(async () => {
  await evictAllDurableObjects();
});
```

### `cloudflare:test` exports: D1

- `applyD1Migrations(db:D1Database, migrations:D1Migration[], migrationTableName?:string)`: `Promise<void>` - applies all un-applied D1 migrations in `migrations` to `db`, recording state in the `migrationsTableName` table (default `d1_migrations`). Get the `migrations` array from `readD1Migrations()` of `@cloudflare/vitest-plugin/config` inside Node.js. Recipe: https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/d1

### `cloudflare:test` exports: Secrets Store

Available in `@cloudflare/vitest-pool-workers` 0.13.5 and later, and in all versions of `@cloudflare/vitest-plugin`.

- `adminSecretsStore(binding:SecretsStoreSecret)`: `SecretsStoreSecretAdmin` - admin API for a Secrets Store binding (which only exposes a read-only `get()`), to seed, update or remove secret values in tests. Declare with `using` so the admin API is released at end of scope (otherwise workerd logs a warning). On `@cloudflare/vitest-pool-workers`, declare with `const` instead because `using` requires `@cloudflare/vitest-plugin` 1.2.4 or later.

```ts
import { adminSecretsStore } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { expect, it } from "vitest";

it("reads a seeded secret", async () => {
  using admin = adminSecretsStore(env.MY_SECRET);
  await admin.create("test-value");

  expect(await env.MY_SECRET.get()).toBe("test-value");
});
```

### `cloudflare:test` exports: Workflows

Available in `@cloudflare/vitest-plugin` 1.0.0 and later. To ensure test isolation with per-file storage isolation, dispose introspectors at the end of each test with `await using` or by calling `dispose()`.

- `introspectWorkflowInstance(workflow: Workflow, instanceId: string)`: `Promise<WorkflowInstanceIntrospector>` - introspector for a specific instance with a known ID, to modify its behavior, await outcomes, and clear its state.

```ts
import { env } from "cloudflare:workers";
import { introspectWorkflowInstance } from "cloudflare:test";

it("should disable all sleeps, mock an event and complete", async () => {
  // 1. CONFIGURATION
  await using instance = await introspectWorkflowInstance(env.MY_WORKFLOW, "123456");
  await instance.modify(async (m) => {
    await m.disableSleeps();
    await m.mockEvent({
      type: "user-approval",
      payload: { approved: true, approverId: "user-123" },
    });
  });

  // 2. EXECUTION
  await env.MY_WORKFLOW.create({ id: "123456" });

  // 3. ASSERTION
  await expect(instance.waitForStatus("complete")).resolves.not.toThrow();
  const output = await instance.getOutput();
  expect(output).toEqual({ success: true });

  // 4. DISPOSE: is implicit and automatic here.
});
```

`WorkflowInstanceIntrospector` methods:

| Method | Description |
|--------|-------------|
| `modify(fn: (m: WorkflowInstanceModifier) => Promise<void>): Promise<void>` | Applies modifications to the instance's behavior. |
| `waitForStepResult(step: { name: string; index?: number }): Promise<unknown>` | Waits for a step to complete and returns its result. `index` is 1-based, default `1`. |
| `waitForStatus(status: InstanceStatus["status"]): Promise<void>` | Waits for the instance to reach a status (e.g. 'running', 'complete'). |
| `getOutput(): Promise<unknown>` | Output value of the successfully completed instance. |
| `getError(): Promise<{name: string, message: string}>` | Error information of the errored instance. |
| `dispose(): Promise<void>` | Disposes the instance. If not called and `await using` is not used, isolated storage fails and instance state persists across subsequent tests. |
| `[Symbol.asyncDispose](): Promise<void>` | Automatic dispose invoked by `await using`. |

- `introspectWorkflow(workflow: Workflow)`: `Promise<WorkflowIntrospector>` - introspector for a Workflow whose instance IDs are unknown beforehand; modifications apply to all subsequently created instances.

```ts
import { env, exports } from "cloudflare:workers";
import { introspectWorkflow } from "cloudflare:test";

it("should disable all sleeps, mock an event and complete", async () => {
  // 1. CONFIGURATION
  await using introspector = await introspectWorkflow(env.MY_WORKFLOW);
  await introspector.modifyAll(async (m) => {
    await m.disableSleeps();
    await m.mockEvent({
      type: "user-approval",
      payload: { approved: true, approverId: "user-123" },
    });
  });

  // 2. EXECUTION
  await env.MY_WORKFLOW.create();

  // 3. ASSERTION
  const instances = await introspector.get();
  for(const instance of instances) {
    await expect(instance.waitForStatus("complete")).resolves.not.toThrow();
    const output = await instance.getOutput();
    expect(output).toEqual({ success: true });
  }

  // 4. DISPOSE: is implicit and automatic here.
});
```

The instance need not be created directly in the test; the introspector captures all instances created after initialization, e.g. `await exports.default.fetch("https://example.com/trigger-workflows");`.

`WorkflowIntrospector` methods:

| Method | Description |
|--------|-------------|
| `modifyAll(fn: (m: WorkflowInstanceModifier) => Promise<void>): Promise<void>` | Applies modifications to all instances created after `introspectWorkflow`. |
| `get(): Promise<WorkflowInstanceIntrospector[]>` | All introspectors for instances created after `introspectWorkflow` was called. |
| `dispose(): Promise<void>` | Disposes the introspector and all created instances' introspectors; do not reuse afterwards. |
| `[Symbol.asyncDispose](): Promise<void>` | Automatic dispose invoked by `await using`. |

`WorkflowInstanceModifier` (passed to `modify` / `modifyAll`; target a step by `name`, with optional 1-based `index` defaulting to `1`):

| Method | Description |
|--------|-------------|
| `disableSleeps(steps?: { name: string; index?: number }[])` | `step.sleep()` / `step.sleepUntil()` resolve immediately; omit `steps` to disable all sleeps. |
| `disableRetryDelays(steps?: { name: string; index?: number }[])` | Removes retry backoff delays of a failing `step.do()`; retries still happen. Omit `steps` for all. |
| `mockStepResult(step: { name: string; index?: number }, stepResult: unknown)` | `step.do()` returns the value instantly without running its implementation. |
| `mockStepError(step: { name: string; index?: number }, error: Error, times?: number)` | Forces `step.do()` to throw; `times` sets how many times, omitted means every attempt (instance fails). |
| `forceStepTimeout(step: { name: string; index?: number }, times?: number)` | Forces `step.do()` to time out immediately; `times` as above. |
| `mockEvent(event: { type: string; payload: unknown })` | Resolves `step.waitForEvent()` with the payload; `type` must match the `waitForEvent` type. |
| `forceEventTimeout(step: { name: string; index?: number })` | Forces `step.waitForEvent()` to time out instantly, failing the step. |

Explicit disposal example (`try` / `finally` with `instance.dispose()`):

```ts
import { env } from "cloudflare:workers";
import { introspectWorkflowInstance } from "cloudflare:test";

// This example showcases explicit disposal
it("should apply all modifier functions", async () => {
  // 1. CONFIGURATION
  const instance = await introspectWorkflowInstance(env.COMPLEX_WORKFLOW, "123456");

  try {
    // Modify instance behavior
    await instance.modify(async (m) => {
      // Disables all sleeps to make the test run instantly
      await m.disableSleeps();

      // Disables retry backoff delays so retries execute without waiting
      await m.disableRetryDelays();

      // Mocks the successful result of a data-fetching step
      await m.mockStepResult(
        { name: "get-order-details" },
        { orderId: "abc-123", amount: 99.99 }
      );

      // Mocks an incoming event to satisfy a `step.waitForEvent()`
      await m.mockEvent({
        type: "user-approval",
        payload: { approved: true, approverId: "user-123" },
      });

      // Forces a step to fail once with a specific error to test retry logic
      await m.mockStepError(
        { name: "process-payment" },
        new Error("Payment gateway timeout"),
        1 // Fail only the first time
      );

      // Forces a `step.do()` to time out immediately
      await m.forceStepTimeout({ name: "notify-shipping-partner" });

      // Forces a `step.waitForEvent()` to time out
      await m.forceEventTimeout({ name: "wait-for-fraud-check" });
    });

    // 2. EXECUTION
    await env.COMPLEX_WORKFLOW.create({ id: "123456" });

    // 3. ASSERTION
    expect(await instance.waitForStepResult({ name: "get-order-details" })).toEqual({
      orderId: "abc-123",
      amount: 99.99,
    });
    // Given the forced timeouts, the workflow will end in an errored state
    await expect(instance.waitForStatus("errored")).resolves.not.toThrow();

    const error = await instance.getError();
    expect(error.name).toEqual("Error");
    expect(error.message).toContain("Execution timed out");

  } finally {
    // 4. DISPOSE
    await instance.dispose();
  }
});
```

#### Introspect Workflows declared in `exports`

Requires `@cloudflare/vitest-plugin` 1.3.0 or above. `introspectWorkflow()` / `introspectWorkflowInstance()` need a Workflow binding from `env` and throw if you pass a Workflow from `ctx.exports`. For a Workflow declared in the `exports` field of the Wrangler config, add a test-only binding via `miniflare.workflows` (`vitest.config.ts`):

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: {
				configPath: "./wrangler.jsonc",
			},
			miniflare: {
				// Test-only binding to the Workflow declared in `exports`
				workflows: {
					MY_WORKFLOW: { name: "my-workflow", className: "MyWorkflow" },
				},
			},
		}),
	],
});
```

The introspector also captures instances your Worker creates through `ctx.exports`:

```ts
import { env, exports } from "cloudflare:workers";
import { introspectWorkflow } from "cloudflare:test";

it("introspects instances created through ctx.exports", async () => {
	await using introspector = await introspectWorkflow(env.MY_WORKFLOW);

	// The Worker creates an instance through `ctx.exports.MyWorkflow`
	await exports.default.fetch("https://example.com/");

	const instances = await introspector.get();
	expect(instances).toHaveLength(1);
	await instances[0].waitForStatus("complete");
});
```

## Options / Props

`DurableObjectEvictionOptions`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `webSockets` | `"close" \| "hibernate"` | `"hibernate"` | What happens to hibernatable WebSockets when evicting. `"hibernate"` hibernates them so they can resume after eviction; `"close"` closes them. |

## Notes

- Corrected from the official docs: the official page points to `startDevWorker()` for testing Assets, which is not a public Wrangler API; the documented public APIs are `createTestHarness()` (recommended) and the deprecated `unstable_startWorker()` / `unstable_dev()` (see [api.md](../commands/api.md) and [test-harness-overview.md](../miniflare/test-harness-overview.md)). The same applies to the `startDevWorker()` mention in [migrate-from-vitest-3-to-vitest-4.md](./migrate-from-vitest-3-to-vitest-4.md).
- The official page describes both modules as plugin-provided and test-file-only; only `cloudflare:test` has that restriction. `cloudflare:workers` is a runtime module also used from Worker source.
- `SELF` and `env` from `cloudflare:test` are deprecated in favor of `cloudflare:workers` (see [migrate-from-vitest-3-to-vitest-4.md](./migrate-from-vitest-3-to-vitest-4.md)).
- As of cloudflare-docs production `34d908a` (fetched 2026-11-14) the official `introspectWorkflow` example uses `await introspector.get()` and the explicit-disposal example disposes in `finally`; earlier revisions called `get()` without `await` and disposed in `catch`, which this page had corrected. The queue `createMessageBatch` example now includes `attempts: 1`.
- Source: https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)
- The D1 bullet above and `configuration.md` reference `@cloudflare/vitest-plugin/config` for `readD1Migrations`, while the configuration examples import it from `@cloudflare/vitest-plugin`; both subpaths are covered by the rename in migrate-to-vitest-plugin.md.
- Docs inconsistency: the D1 text says "`migrationsTableName`" while the signature parameter is `migrationTableName`.
- Vitest itself (test API, config, mocking): see the vitest skill. This package only provides the Workers runtime pool/plugin. Durable Objects, Queues and Workflows are covered by the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/ , https://developers.cloudflare.com/queues/ , https://developers.cloudflare.com/workflows/ ); for Secrets Store see https://developers.cloudflare.com/secrets-store/ .

## Related

- [configuration.md](./configuration.md)
- [known-issues.md](./known-issues.md)
- [write-your-first-test.md](./write-your-first-test.md)
