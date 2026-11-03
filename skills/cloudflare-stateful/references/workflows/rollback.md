---
source: https://developers.cloudflare.com/workflows/build/workers-api/, https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/
---

# Rollback handlers

Attach a rollback handler to `step.do()` for saga-style compensation; handlers run in reverse step-start order when the Workflow later fails.

## Signature / Usage

```ts
type WorkflowRollbackContext<T = unknown> = {
	ctx: WorkflowStepContext;
	error: Error;
	output: T | undefined;
};

type WorkflowRollbackHandler<T = unknown> = (
	ctx: WorkflowRollbackContext<T>,
) => Promise<void>;

type WorkflowStepRollbackConfig = Pick<
	WorkflowStepConfig,
	"retries" | "timeout"
>;

type WorkflowStepRollbackOptions<T = unknown> = {
	rollback: WorkflowRollbackHandler<T>;
	rollbackConfig?: WorkflowStepRollbackConfig;
};
```

Adapted (not in the official docs): the rollback handler returns early when `output` is `undefined` instead of destructuring it (which would throw). See Notes.

```ts
import {
	WorkflowEntrypoint,
	type WorkflowEvent,
	type WorkflowStep,
} from "cloudflare:workers";
import { NonRetryableError } from "cloudflare:workflows";

export class OrderWorkflow extends WorkflowEntrypoint<Env> {
	async run(_event: WorkflowEvent<unknown>, step: WorkflowStep) {
		await step.do(
			"reserve inventory",
			async () => {
				const reservation = await reserveInventory();
				return { reservationId: reservation.id };
			},
			{
				rollback: async ({ output }) => {
					// `output` is undefined when this step failed before returning.
					if (!output) return;
					const { reservationId } = output as { reservationId: string };
					await releaseInventory(reservationId);
				},
				rollbackConfig: {
					retries: { limit: 3, delay: "10 seconds", backoff: "linear" },
					timeout: "2 minutes",
				},
			},
		);

		await step.do("charge card", async () => {
			throw new NonRetryableError("payment processor rejected the charge");
		});
	}
}
```

## Options / Props

`WorkflowStepRollbackOptions`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| rollback | `WorkflowRollbackHandler<T>` | — | Compensating action for a successful step |
| rollbackConfig | `WorkflowStepRollbackConfig` | — | Retry and timeout settings applied to the rollback handler itself |

Rollback handler input (`WorkflowRollbackContext`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ctx | `WorkflowStepContext` | — | The original step context |
| error | `Error` | — | Error that caused the Workflow to fail |
| output | `T \| undefined` | — | Value returned by the forward step, `undefined` if it failed before returning |

## Notes

- `reserveInventory` and `releaseInventory` are placeholders for your own functions.
- Pass the options object as the final argument to `step.do()`.
- Adapted from the official docs: the official handler destructures `output` unconditionally, which throws a `TypeError` in exactly the case the page describes (the step failed before returning, so `output` is `undefined`). The handler now returns early; if your forward step can reserve something before it fails, release it by a key you can derive without `output` (for example the instance ID).
- Rollback handlers can be retried (see `rollbackConfig`) and may run when the forward step only partly completed (`output` is `undefined`), so make them idempotent.
- A failed step that registered rollback also participates: for example, a `NonRetryableError` after registering rollback runs its handler with `output` set to `undefined`.
- Throw `NonRetryableError` from a rollback handler to stop retrying it immediately.
- `instance.terminate({ rollback: true })` (or `wrangler workflows instances terminate ... --rollback`) runs registered rollback handlers before the `terminated` state; steps without handlers are skipped. `instance.delete()` and `deleteBatch()` do not run rollback handlers.
- While rollback is running the Workers API still reports `status: "running"`; after the terminal state inspect `rollback` on `InstanceStatus` (see [workflow-instance.md](./workflow-instance.md)).
- Step count for billing does not include rollback handlers or retries.

## Related

- [sleeping-and-retrying.md](./sleeping-and-retrying.md)
- [workflow-instance.md](./workflow-instance.md)
- [subscribe-instance-events.md](./subscribe-instance-events.md)
