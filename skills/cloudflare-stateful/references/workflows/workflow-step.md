---
source: https://developers.cloudflare.com/workflows/build/workers-api/, https://developers.cloudflare.com/workflows/build/events-and-parameters/
---

# WorkflowStep (step.do, sleep, sleepUntil, waitForEvent)

The `step` object passed to `run` defines durable steps: `step.do`, `step.sleep`, `step.sleepUntil`, and `step.waitForEvent`.

## Signature / Usage

```ts
step.do(name: string, callback: (ctx: WorkflowStepContext): RpcSerializable): Promise<T>
step.do(name: string, callback: (ctx: WorkflowStepContext): RpcSerializable, rollbackOptions?: WorkflowStepRollbackOptions<T>): Promise<T>
step.do(name: string, config?: WorkflowStepConfig, callback: (ctx: WorkflowStepContext): RpcSerializable): Promise<T>
step.do(name: string, config?: WorkflowStepConfig, callback: (ctx: WorkflowStepContext): RpcSerializable, rollbackOptions?: WorkflowStepRollbackOptions<T>): Promise<T>
step.sleep(name: string, duration: WorkflowDuration): Promise<void>
step.sleepUntil(name: string, timestamp: Date | number): Promise<void>
```

Returning a stream from a step (JavaScript Workflows):

```ts
type Env = {
	MY_BUCKET: R2Bucket;
};

export class MyWorkflow extends WorkflowEntrypoint<Env> {
	async run(_event: WorkflowEvent<unknown>, step: WorkflowStep) {
		const reportStream = await step.do("read report from R2", async () => {
			const object = await this.env.MY_BUCKET.get("reports/latest.csv");

			if (!object?.body) {
				throw new Error("Could not read reports/latest.csv from R2.");
			}

			return object.body;
		});

		const preview = await new Response(reportStream).text();
		return { preview };
	}
}
```

`waitForEvent`:

```ts
export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		// Other steps in your Workflow
		let stripeEvent = await step.waitForEvent<IncomingStripeWebhook>(
			"receive invoice paid webhook from Stripe",
			{ type: "stripe-webhook", timeout: "1 hour" },
		);
		// Rest of your Workflow
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name (all step methods) | `string` | — | Step name; for `step.do` up to 256 characters. Acts as the cache key |
| config (`step.do`) | `WorkflowStepConfig` | defaults in [sleeping-and-retrying.md](./sleeping-and-retrying.md) | Retry and timeout behaviour for the step |
| callback (`step.do`) | `(ctx: WorkflowStepContext) => RpcSerializable` | — | Async function; returns serializable state to persist |
| rollbackOptions (`step.do`) | `WorkflowStepRollbackOptions<T>` | — | Registers rollback logic; run in reverse step-start order if the Workflow later fails |
| duration (`step.sleep`) | `number` (ms) or `WorkflowDuration` string | — | How long to sleep |
| timestamp (`step.sleepUntil`) | `Date` or `number` (ms since Unix epoch) | — | When to wake |
| options.type (`step.waitForEvent`) | `string` | — | Event type to match against `instance.sendEvent`; up to 100 characters, pattern `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` (letters, digits, `-`, `_`; `.` is rejected with `workflow.invalid_event_type`) |
| options.timeout (`step.waitForEvent`) | `WorkflowTimeoutDuration` | `24 hours` | How long to block before throwing a timeout; between 1 second and 365 days |

## Notes

- Returned state must be serializable: primitives, `Array`/`Object` of serializable values, and any structured-cloneable type up to 1 MiB (non-stream). Functions, Symbols, and circular references throw.
- JavaScript Workflows may return a fresh, unlocked `ReadableStream<Uint8Array>` for larger binary output. Do not return a locked or already-read stream; BYOB streams/readers are unsupported. After persisting, use the new stream returned by the step, not the original. Streamed bytes still count toward the per-instance storage limit.
- `step.sleep` and `step.sleepUntil` do not count toward the maximum steps limit.
- `waitForEvent` is documented as `step.waitForEvent(name, options)`; the official page types its return as `Promise<void>` but its examples use the resolved event (typed via a type parameter such as `IncomingStripeWebhook`).
- When `waitForEvent` times out the Workflow throws and the instance fails; wrap in `try...catch` to continue.
- Events sent before the instance reaches the matching `waitForEvent` are buffered and delivered when it does.
- `step.do` registered rollbacks are covered in [rollback.md](./rollback.md); config and context in [step-config-and-context.md](./step-config-and-context.md).

## Related

- [sleeping-and-retrying.md](./sleeping-and-retrying.md)
- [step-config-and-context.md](./step-config-and-context.md)
- [rollback.md](./rollback.md)
- [events-and-parameters.md](./events-and-parameters.md)
- [workflow-instance.md](./workflow-instance.md)
