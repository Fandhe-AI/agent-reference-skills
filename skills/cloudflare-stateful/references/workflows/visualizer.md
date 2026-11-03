---
source: https://developers.cloudflare.com/workflows/build/visualizer/
---

# Visualize Workflows

The Cloudflare dashboard renders a diagram of your parsed Workflow code showing sequenced and parallel steps, conditionals, loops, and nested logic (beta).

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workflows/build/rules-of-workflows/ (a `Promise.all` of steps renders as a `ParallelNode`):

```js
const imageList = await Promise.all([
	step.do("get first cutest cat from KV", async () => {
		return await this.env.KV.get("cutest-http-cat-1");
	}),

	step.do("get second cutest cat from KV", async () => {
		return await this.env.KV.get("cutest-http-cat-2");
	}),
]);
```

## Options / Props

Node types:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| StepSleep | node | — | Pauses execution for a specified duration |
| StepDo | node | — | A named, retriable step wrapping a unit of work |
| StepWaitForEvent | node | — | Suspends execution until an external event is received |
| StepSleepUntil | node | — | Pauses execution until a specific date and time |
| LoopNode | node | — | A loop construct (`for`, `while`, etc.) |
| ParallelNode | node | — | Steps executing concurrently, such as inside `Promise.all()` |
| TryNode | node | — | A `try...catch` block |
| BlockNode | node | — | Groups a sequence of steps for display |
| IfNode | node | — | A conditional branch (`if/else`) |
| SwitchNode | node | — | A `switch` statement |
| StartNode | node | — | Entry point of the Workflow or a function definition |
| FunctionCall | node | — | A call to a named function within the Workflow code |
| FunctionDef | node | — | Definition of a function used within the Workflow |
| BreakNode | node | — | A `break` statement exiting a loop early |

## Notes

- Beta, for TypeScript and JavaScript Workers. Workflows using a non-default bundler may display unexpectedly. Python Workflows are not supported.
- View diagrams in the Cloudflare dashboard Workflows page; loops and conditionals can be collapsed or expanded.
- Each node has `starts` and `resolves` fields tracking execution order relative to the first promise that started without an immediate conclusion; they determine concurrency and vertical position. If steps are awaited at declaration, both are undefined and execution follows source order.

## Related

- [rules-of-workflows.md](./rules-of-workflows.md)
- [workflow-step.md](./workflow-step.md)
