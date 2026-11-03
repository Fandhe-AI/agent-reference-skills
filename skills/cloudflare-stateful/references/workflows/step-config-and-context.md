---
source: https://developers.cloudflare.com/workflows/build/step-context/, https://developers.cloudflare.com/workflows/build/workers-api/
---

# WorkflowStepConfig and WorkflowStepContext

`WorkflowStepConfig` sets retry and timeout behaviour for `step.do`; `WorkflowStepContext` is passed to every `step.do` callback with runtime information.

## Signature / Usage

```ts
export type WorkflowDynamicDelayContext = {
	ctx: WorkflowStepContext;
	error: Error;
};

export type WorkflowDelayFunction = (
	input: WorkflowDynamicDelayContext,
) => string | number | Promise<string | number>;

export type WorkflowStepConfig = {
	retries?: {
		limit: number;
		delay: string | number | WorkflowDelayFunction;
		backoff?: WorkflowBackoff;
	};
	timeout?: string | number;
};

export type WorkflowStepContext = {
	step: {
		name: string;
		count: number;
	};
	attempt: number;
	config: WorkflowStepConfig;
};
```

Accessing the context:

```ts
await step.do("my-step", async (ctx) => {
	console.log(ctx.step.name); // "my-step"
	console.log(ctx.step.count); // 1
	console.log(ctx.attempt); // 1 on first try, 2 on first retry, etc.
	console.log(ctx.config); // { retries: { limit: 5, ... }, timeout: "10 minutes" }
});
```

Use `ctx.attempt` to change behaviour on retries:

```ts
await step.do(
	"fetch data",
	{ retries: { limit: 5, delay: "5 seconds", backoff: "linear" } },
	async (ctx) => {
		const url =
			ctx.attempt <= 3
				? "https://api.example.com/primary"
				: "https://api.example.com/fallback";

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}
		return await response.json();
	},
);
```

## Options / Props

`WorkflowStepContext` properties:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| step.name | `string` | — | The name passed to `step.do` |
| step.count | `number` | — | How many times `step.do` was called with this name in the current run (1-indexed) |
| attempt | `number` | — | Current attempt (1-indexed): `1` first try, `2` first retry |
| config | `WorkflowStepConfig` | — | Resolved retry and timeout configuration including runtime defaults |

## Notes

- If `retries.delay` is a function, the computed delay is not exposed on `ctx.config.retries.delay`; the function receives its own context with the current step context and the error.
- `ctx.config.retries` may be undefined in the type, so use optional chaining when reading it (for example `ctx.config.retries?.limit`).
- Structured logging example from the docs: `console.log(JSON.stringify({ step: ctx.step.name, stepCount: ctx.step.count, attempt: ctx.attempt, retryLimit: ctx.config.retries?.limit }))`.
- Defaults, units, and the dynamic delay function are covered in [sleeping-and-retrying.md](./sleeping-and-retrying.md).
- In Python Workflows the context is a dict injected into a `ctx` parameter; see [python-sdk.md](./python-sdk.md).

## Related

- [sleeping-and-retrying.md](./sleeping-and-retrying.md)
- [workflow-step.md](./workflow-step.md)
- [rollback.md](./rollback.md)
