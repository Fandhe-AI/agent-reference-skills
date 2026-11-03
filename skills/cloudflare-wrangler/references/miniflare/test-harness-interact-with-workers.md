---
source: https://developers.cloudflare.com/workers/testing/test-harness/interact-with-workers/
---

# Test harness: Interact with Workers

Send requests through configured routes, target a specific Worker, dispatch events, assert logs, and control Workflows.

## Signature / Usage

Route dispatch across Workers (first Worker is primary):

```ts
const server = createTestHarness({
	workers: [
		/** Includes `"routes": ["example.com/*"]` */
		{ configPath: "./workers/web/wrangler.jsonc" },
		/** Includes `"routes": ["api.example.com/v1/*"]` */
		{ configPath: "./workers/api/wrangler.jsonc" },
	],
});

const primaryResponse = await server.fetch("/");
const apiResponse = await server.fetch("http://api.example.com/v1/users/123");
const webResponse = await server.fetch("http://example.com/users/123");
```

Target a specific Worker:

```ts
const apiWorker = server.getWorker("api-worker");
const response = await apiWorker.fetch("http://api.example.com/v1/users/123");

await apiWorker.scheduled({
	cron: "0 0 * * *",
	scheduledTime: new Date(),
});
```

Assert logged behavior:

```ts
test("logs scheduled job results", async ({ expect }) => {
	const apiWorker = server.getWorker("api-worker");

	await apiWorker.scheduled({
		cron: "0 0 * * *",
		scheduledTime: new Date("2026-05-29T00:00:00.000Z"),
	});

	expect(server.getLogs()).toEqual([
		expect.objectContaining({
			level: "info",
			message: "Generated daily report for 2026-05-29",
		}),
	]);

	server.clearLogs();

	await apiWorker.scheduled({
		cron: "0 0 * * *",
		scheduledTime: new Date("2026-05-30T00:00:00.000Z"),
	});

	expect(server.getLogs()).toEqual([
		expect.objectContaining({
			level: "info",
			message: "Generated daily report for 2026-05-30",
		}),
	]);
});
```

Inspect and control Workflows:

```ts
const worker = server.getWorker<ApiEnv>("api-worker");
await using workflow = await worker.introspectWorkflow("MY_WORKFLOW");

await workflow.modifyAll(async (modifier) => {
	await modifier.disableSleeps([{ name: "wait-for-approval" }]);
});

await worker.fetch("/start-workflow");

const [instance] = await workflow.get();
await instance.waitForStatus("complete");
expect(await instance.getOutput()).toEqual({ approved: true });
```

```ts
const instance = await worker.introspectWorkflowInstance(
	"MY_WORKFLOW",
	"instance-id",
);

await instance.modify(async (modifier) => {
	await modifier.mockStepResult({ name: "load-user" }, { id: "123" });
});

await instance.waitForStatus("complete");
```

## Options / Props

| Name | Description |
|------|-------------|
| server.fetch(urlOrPath) | Relative URLs go to the primary Worker; absolute URLs match configured routes, falling back to the primary Worker |
| server.getWorker(name) | Bypasses route matching and returns a Worker handle (`fetch`, `scheduled`, `getEnv`, ...) |
| server.getLogs() / server.clearLogs() | Read / clear captured runtime logs; logs are reset by `server.reset()` |
| worker.introspectWorkflow(bindingName) | Controls new Workflow instances and inspects their state |
| worker.introspectWorkflowInstance(bindingName, instanceId) | Introspect a known instance directly |

## Notes

- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [test-harness-get-started.md](./test-harness-get-started.md)
- [test-harness-prepare-test-state.md](./test-harness-prepare-test-state.md)
- [test-harness-configure.md](./test-harness-configure.md)
- [scheduled-events.md](./scheduled-events.md)
