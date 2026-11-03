---
source: https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/, https://developers.cloudflare.com/workflows/build/workers-api/
---

# Sleeping and retrying

Sleep a Workflow with `step.sleep` / `step.sleepUntil`, configure per-step retries and timeouts, stop retries with `NonRetryableError`, and catch step failures.

## Signature / Usage

```ts
await step.sleep("sleep for a bit", "1 hour");

// sleepUntil accepts a Date object as its second argument
const workflowsLaunchDate = Date.parse("24 Oct 2024 13:00:00 UTC");
await step.sleepUntil("sleep until X times out", workflowsLaunchDate);
```

Default retry configuration applied when none is given:

```ts
const defaultConfig: WorkflowStepConfig = {
	retries: {
		limit: 5,
		delay: 10000,
		backoff: "exponential",
	},
	timeout: "10 minutes",
};
```

Custom retries and timeout:

```ts
let someState = await step.do(
	"call an API",
	{
		retries: {
			limit: 10, // The total number of retries (11 attempts total)
			delay: "10 seconds", // Delay between each retry
			backoff: "exponential", // Any of "constant" | "linear" | "exponential";
		},
		timeout: "30 minutes",
	},
	async () => {
		/* Step code goes here */
	},
);
```

Dynamic retry delay (`syncCustomer` is a placeholder for your own function):

```ts
await step.do(
	"sync customer",
	{
		retries: {
			limit: 5,
			delay: ({ ctx, error }) => {
				if (error.message.includes("rate limit")) {
					return `${ctx.attempt * 30} seconds`;
				}

				return "10 seconds";
			},
		},
	},
	async () => {
		await syncCustomer();
	},
);
```

`NonRetryableError`:

```ts
import {
	WorkflowEntrypoint,
	WorkflowStep,
	WorkflowEvent,
} from "cloudflare:workers";
import { NonRetryableError } from "cloudflare:workflows";

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		await step.do("some step", async () => {
			if (!event.payload.data) {
				throw new NonRetryableError(
					"event.payload.data did not contain the expected payload",
				);
			}
		});
	}
}
```

Adapted (not in the official docs): the official snippet for catching errors is an elided fragment (`...`) that is not valid code; it is wrapped in a class here and `e` is narrowed.

```ts
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import { NonRetryableError } from "cloudflare:workflows";

export class MyWorkflow extends WorkflowEntrypoint<Env> {
	async run(_event: WorkflowEvent<unknown>, step: WorkflowStep) {
		await step.do("task", async () => {
			// work to be done
		});

		try {
			await step.do("non-retryable-task", async () => {
				// work not to be retried
				throw new NonRetryableError("oh no");
			});
		} catch (e) {
			console.log(`Step failed: ${(e as Error).message}`);
			await step.do("clean-up-task", async () => {
				// Clean up code here
			});
		}

		// the Workflow will not fail and will continue its execution
		await step.do("next-task", async () => {
			// more work to be done
		});
	}
}
```

## Options / Props

`WorkflowStepConfig`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| retries.limit | `number` | `5` | Retries per step (limited to 10,000 retries per step); `limit: 10` means 11 attempts total |
| retries.delay | `string \| number \| WorkflowDelayFunction` | `10000` (ms) | Fixed duration (ms or human-readable string) or a function returning the next delay |
| retries.backoff | `WorkflowBackoff` (`"constant"`, `"linear"`, `"exponential"`) | `"exponential"` | Backoff algorithm between attempts |
| timeout | `string \| number` | `"10 minutes"` | Per-attempt timeout; the step is failed when exceeded (also applies during retry attempts) |

Delay function input (`WorkflowDynamicDelayContext`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ctx | `WorkflowStepContext` | — | Current step context, including `ctx.attempt` |
| error | `Error` | — | Error that caused the retry |

Units accepted by human-readable durations for `step.sleep`: `second`, `minute`, `hour`, `day`, `week`, `month`, `year` (for example `"1 minute"`, `"26 hours"`). The second argument also accepts a `number` of milliseconds.

## Notes

- A delay function returns a duration string, a number in milliseconds, or a promise of either. The dynamic delay is not exposed on `ctx.config.retries.delay`.
- An instance resuming from sleep takes priority over newly queued instances.
- An uncaught `NonRetryableError` fails the Workflow instance immediately: no further steps run and nothing is retried. Earlier steps' rollback handlers still run before the instance settles. If the failing `step.do` is wrapped in `try...catch` (as in the last example), the step still fails without retrying but the instance continues. Import it from `cloudflare:workflows`.
- Uncaught exceptions at the top level, or steps reaching their retry limit, end the instance in `errored`; use `try...catch` around a step to continue.
- Maximum `step.sleep` duration is 365 days. Keep step timeouts at 30 minutes or less (use `step.waitForEvent` for longer waits).
- Adapted from the official docs: the catch-errors snippet was a fragment with `...` placeholders; wrapped in a class to be valid.
- Retry only transient failures (timeouts, 5xx, rate limits). Throw `NonRetryableError` for permanent errors (for example validation failures or 4xx responses) so the step is not retried up to its limit, and make retried steps idempotent.

## Related

- [rollback.md](./rollback.md)
- [step-config-and-context.md](./step-config-and-context.md)
- [workflow-step.md](./workflow-step.md)
- [limits.md](./limits.md)
