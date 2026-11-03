---
source: https://developers.cloudflare.com/agents/tools/codemode/how-it-works/
---

# How Code Mode works

`@cloudflare/codemode` implements the pattern with an isolated executor (runs code, stores no state), service connectors (provide capabilities), and a durable runtime (records execution and controls approvals, replay, rollback, reuse).

## Signature / Usage

What the model sees: one outer tool named `codemode`.

```ts
type CodeModeInput = {
	code: string;
};

type PendingAction = {
	executionId: string;
	seq: number;
	connector: string;
	method: string;
	args: unknown;
};

type CodeModeOutput =
	| { status: "completed"; executionId: string; result: unknown; logs?: string[] }
	| { status: "paused"; executionId: string; pending: PendingAction[] }
	| { status: "error"; executionId: string; error: string; logs?: string[] };
```

Platform SDK inside the sandbox:

```ts
declare const codemode: {
	search(query: string): Promise<SearchOutput>;
	describe(target: string): Promise<DescribeOutput>;
	step<T>(name: string, fn: () => T | Promise<T>): Promise<T>;
	run(name: string, input?: unknown): Promise<unknown>;
};

type SearchOutput = {
	results: Array<{
		path: string;
		connector: string;
		method: string;
		description?: string;
		kind: "method" | "snippet";
		score: number;
	}>;
	total: number;
	truncated: boolean;
};

type DescribeOutput = {
	path: string;
	description?: string;
	types: string;
	kind: "connector" | "method" | "snippet";
};
```

Capture nondeterministic work once so approval replay stays stable:

```js
async () => {
	const createdAt = await codemode.step("created-at", () => Date.now());

	return github.create_issue({
		owner: "cloudflare",
		repo: "agents",
		title: `Review created at ${createdAt}`,
	});
};
```

Save a reviewed execution as a reusable snippet:

```ts
const runs = await runtime.executions(20);

await runtime.saveSnippet("list-open-prs", {
	executionId: runs[0].id,
	description: "List open pull requests for a repository.",
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` (runtime) | string | `default` | Identifies the runtime's durable storage; separate names keep separate execution records and snippets. |
| `replay` (connector call) | `"reexecute"` | store and replay result | `"reexecute"` logs sequence and arguments but reruns the method on later passes; only for idempotent reads with large, inexpensive results. Not allowed for approval-required methods. |
| `maxExecutions` | number | `50` | Terminal executions kept; pruned when a new run begins (can temporarily be 51), or call `pruneExecutions()`. |
| Durable value limit | characters | `1,000,000` | Serialized limit for connector arguments, recorded results, step results, and execution source. Oversized values fail the execution. |
| `transformResult` | function | — | Reshapes the completed result before the model receives it; audit trail keeps the original when it fits. |

## Notes

- Isolation: `DynamicWorkerExecutor` uses a Dynamic Worker Loader to create an isolated Worker per execution pass; `fetch()` and `connect()` are blocked by default (`globalOutbound: null`). The sandbox exposes no Node.js APIs, `process`, `require`, host credentials, or unrestricted network. Generated code never receives connector credentials or clients; calls cross the boundary via Workers RPC and are intercepted for approval, logging, replay, and rollback.
- Approvals: a connector method can require approval. The runtime records the action as pending and aborts the pass; approval re-runs the same source with the same execution ID, returning recorded results for applied calls and then executing the approved action. Only paused executions can resume; rejection ends the execution without undoing earlier actions; rollback is separate.
- Replay needs the same order of connector calls/steps with the same connector, method, and arguments per sequence number, else a replay-divergence error. Issue connector calls sequentially when an execution might pause (`Promise.all()` can reorder). Use `codemode.step()` for `Date.now()`, `Math.random()`, and other nondeterminism.
- Rollback walks applied calls in reverse and runs `revert` where provided; calls without `revert` stay applied; failures do not stop later compensation; it is compensation, not transactional isolation.
- Resources: pass resources are cleaned by `onPassEnd()`; execution resources by `disposeExecution()` (not after a pause). Hooks must not depend on instance memory and cleanup must be idempotent.
- Running/paused executions are never auto-pruned; call `expirePaused()` from recurring maintenance (stale paused runs become rejected, stale running runs errors).
- `saveSnippet()` accepts any execution status: verify it completed first. If a snippet's recorded connector is unavailable `codemode.run()` resolves to an object with `error`.
- Experimental; breaking changes possible. State is held in a Durable Object facet managed by `createCodemodeRuntime()` / the Vite plugin.

## Related

- [Code Mode overview](./codemode-overview.md)
- [Durable runtime guide](./codemode-durable-runtime.md)
- [API reference](./codemode-api-reference.md)
