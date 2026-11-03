---
source: https://developers.cloudflare.com/agents/agent-class/durable-execution/
---

# Durable execution with fibers (runFiber / startFiber / keepAlive)

`runFiber()` registers a task in SQLite, keeps the agent alive, lets you checkpoint with `stash()`, and calls `onFiberRecovered()` on the next activation if the agent was evicted mid-task. `startFiber()` durably accepts background work with idempotency, status and cancellation.

## Signature / Usage

```ts
import { Agent } from "agents";
import type { FiberRecoveryContext } from "agents";

class MyAgent extends Agent {
	async doWork() {
		await this.runFiber("my-task", async (ctx) => {
			const step1 = await expensiveOperation();
			ctx.stash({ step1 });

			const step2 = await anotherExpensiveOperation(step1);
			this.setState({ ...this.state, result: step2 });
		});
	}

	async onFiberRecovered(ctx: FiberRecoveryContext) {
		if (ctx.name !== "my-task") return;
		const snapshot = ctx.snapshot as { step1: unknown } | null;
		if (snapshot) {
			const step2 = await anotherExpensiveOperation(snapshot.step1);
			this.setState({ ...this.state, result: step2 });
		}
	}
}
```

API surface:

```ts
class Agent {
	keepAlive(): Promise<() => void>;
	keepAliveWhile<T>(fn: () => Promise<T>): Promise<T>;
	runFiber<T>(name: string, fn: (ctx: FiberContext) => Promise<T>): Promise<T>;
	startFiber(
		name: string,
		fn: (ctx: FiberContext) => Promise<void>,
		options?: StartFiberOptions,
	): Promise<StartFiberResult>;
	inspectFiber(fiberId: string): Promise<FiberInspection | null>;
	inspectFiberByKey(idempotencyKey: string): Promise<FiberInspection | null>;
	listFibers(options?: ListFibersOptions): Promise<FiberInspection[]>;
	cancelFiber(fiberId: string, reason?: string): Promise<boolean>;
	cancelFiberByKey(idempotencyKey: string, reason?: string): Promise<boolean>;
	deleteFibers(options?: DeleteFibersOptions): Promise<number>;
	resolveFiber(fiberId: string, result: FiberRecoveryResult): Promise<boolean>;
	stash(data: unknown): void;
	onFiberRecovered(
		ctx: FiberRecoveryContext,
	): Promise<void | FiberRecoveryResult>;
}

type FiberContext = {
	id: string;
	signal: AbortSignal;
	stash(data: unknown): void;
	snapshot: unknown | null;
};

type FiberStatus =
	| "pending"
	| "running"
	| "completed"
	| "aborted"
	| "interrupted"
	| "error";

type FiberRecoveryContext = {
	id: string;
	name: string;
	status?: FiberStatus;
	idempotencyKey?: string;
	metadata?: Record<string, unknown> | null;
	snapshot: unknown | null;
	createdAt: number;
	recoveryReason: "interrupted";
};
```

Managed (`startFiber`) work:

```ts
const receipt = await this.startFiber(
	"reply-to-webhook",
	async (ctx) => {
		ctx.stash({ webhookId, threadId });
		await postReply(threadId);
	},
	{
		idempotencyKey: `webhook:${webhookId}`,
		metadata: { threadId },
	},
);

if (!receipt.accepted) {
	// This webhook was already accepted by an earlier delivery.
}
```

```ts
const current = await this.inspectFiberByKey(`webhook:${webhookId}`);

if (current) {
	await this.cancelFiber(current.fiberId, "No longer needed");
}

await this.deleteFibers({
	status: ["completed", "error", "aborted"],
	settledBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
});
```

```ts
async onFiberRecovered(ctx: FiberRecoveryContext) {
	if (ctx.name !== "reply-to-webhook") return;

	const snapshot = ctx.snapshot as { webhookId: string; threadId: string };
	await postRecoveryMessage(snapshot.threadId);

	return {
		status: "completed",
		snapshot: { ...snapshot, recovered: true },
	};
}
```

keepAlive:

```ts
const dispose = await this.keepAlive();
try {
	await longWork();
} finally {
	dispose();
}

class MyAgent extends Agent {
	static options = { keepAliveIntervalMs: 2_000 };
}
```

## Options / Props

`startFiber` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `idempotencyKey` | `string` | — | Stable external key used to dedupe retries |
| `metadata` | JSON-serializable | — | Stored with the retained row |
| `waitForCompletion` | `boolean` | `false` | Wait for terminal status before returning |

`FiberRecoveryContext` fields: `id`, `name`, `status` (managed only), `idempotencyKey`, `metadata`, `snapshot` (last `stash()` or `null`), `createdAt` (epoch ms), `recoveryReason` (currently always `"interrupted"`).

Other knobs:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keepAliveIntervalMs` | `number` (`static options`) | `30000` | Heartbeat alarm interval |
| `fiberRecoveryMaxAgeMs` | `number` | `24 h` | Age after which an un-recoverable row is discarded (`fiber:recovery:skipped`, `reason: "max_age_exceeded"`); `0` retains indefinitely |
| `listFibers` options | `status`, `name`, `limit` | — | Filters for retained managed fibers |
| `deleteFibers` options | `status`, `settledBefore`, `limit` | `completed`, `error`, `aborted` | Interrupted rows are not deleted unless asked |

## Notes

- Eviction causes: inactivity (~70–140 s with no requests or WebSockets), code updates/runtime restarts (1–2x per day, non-deterministic), alarm handler timeout (15 min). `keepAlive()` reduces eviction odds; `runFiber()` makes eviction survivable.
- `ctx.stash(data)` writes SQLite synchronously and each call fully replaces the previous snapshot (not a merge). `this.stash()` uses AsyncLocalStorage, works with concurrent fibers, and throws outside a `runFiber` callback.
- The original closure is gone on recovery; only `name` and `snapshot` remain. Unmanaged `runFiber()` rows are deleted after `onFiberRecovered()` returns successfully; managed `startFiber()` rows are retained (return a `FiberRecoveryResult` with status `completed`, `error`, `aborted`, or leave `interrupted`). If the hook throws, the row is kept and retried on a capped (5 min) exponential backoff.
- No automatic retries on errors during `fn`. An inline `await runFiber()` caller is lost on eviction; use `startFiber()` for accept-and-inspect semantics. `startFiber()` stores no callback result.
- Cancellation is cooperative: check `ctx.signal.aborted` before side effects.
- Sub-agents: fiber rows live in the child's SQLite; the top-level parent owns the physical heartbeat alarm.
- Heartbeat is invisible to `listSchedules()`. `AIChatAgent` and `Think` wrap each chat turn in a fiber.
- In `wrangler dev`, recovery works the same; kill and restart wrangler to test.
- `resolveFiber()` only updates managed fibers currently `interrupted`.
- Helpers such as `expensiveOperation`, `postReply`, `webhookId` in the snippets are placeholders defined elsewhere.
- DO eviction and alarm limits are Durable Object behaviour; see the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/).

## Related

- [Schedule tasks](./schedule-tasks.md)
- [Run Workflows](./run-workflows.md)
- [Sub-agents](./sub-agents.md)
- [Chat agents](./chat-agents.md)
