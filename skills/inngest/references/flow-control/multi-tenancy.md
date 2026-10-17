# Multi-tenancy

Apply concurrency and throttle limits per tenant by using the same stable tenant ID in each key expression, so one busy tenant does not consume capacity reserved for others.

## Signature / Usage

```ts
import { Inngest } from "inngest";

const inngest = new Inngest({ id: "tenant-sync" });

export const syncTenant = inngest.createFunction(
  {
    id: "sync-tenant-data",
    triggers: { event: "app/tenant.sync.requested" },
    concurrency: {
      key: "event.data.tenant_id",
      limit: 5,
    },
    throttle: {
      key: "event.data.tenant_id",
      limit: 100,
      period: "1m",
    },
  },
  async ({ event, step }) => {
    await step.run("sync-data", async () => {
      console.log(event.data.tenant_id);
    });
  }
);
```

Python:

```python
import datetime

import inngest

inngest_client = inngest.Inngest(app_id="tenant-sync")

@inngest_client.create_function(
    fn_id="sync-tenant-data",
    trigger=inngest.TriggerEvent(event="app/tenant.sync.requested"),
    concurrency=[
        inngest.Concurrency(key="event.data.tenant_id", limit=5),
    ],
    throttle=inngest.Throttle(
        key="event.data.tenant_id",
        limit=100,
        period=datetime.timedelta(minutes=1),
    ),
)
async def sync_tenant(ctx: inngest.Context) -> None:
    async def sync_data() -> None:
        ctx.logger.info(ctx.event.data["tenant_id"])

    await ctx.step.run("sync-data", sync_data)
```

Go:

```go
_, err = inngestgo.CreateFunction(
	client,
	inngestgo.FunctionOpts{
		ID: "sync-tenant-data",
		Concurrency: &inngestgo.ConfigConcurrency{
			Step: []inngestgo.ConfigStepConcurrency{
				{
					Key:   inngestgo.StrPtr("event.data.tenant_id"),
					Limit: 5,
				},
			},
		},
		Throttle: &inngestgo.ConfigThrottle{
			Key:    inngestgo.StrPtr("event.data.tenant_id"),
			Limit:  100,
			Period: time.Minute,
		},
	},
	inngestgo.EventTrigger("app/tenant.sync.requested", nil),
	func(ctx context.Context, input inngestgo.Input[TenantSyncRequested]) (any, error) {
		_, err := step.Run(ctx, "sync-data", func(ctx context.Context) (any, error) {
			log.Println(input.Event.Data.TenantID)
			return nil, nil
		})
		return nil, err
	},
)
```

## Notes

- With the example above, each `tenant_id` has its own limit of five executing steps and its own throttle of 100 run starts per minute. A backlog for tenant A does not consume tenant B's per-key limit. Concurrency does not limit function runs that are sleeping or waiting between steps.
- Keys are Common Expression Language (CEL) expressions over the triggering event. Use a stable account, workspace, or tenant ID present on every relevant event; if two events for one tenant use different IDs, Inngest treats them as different keys with separate limits.
- Concurrency defaults to function scope; throttling is applied per function. For a concurrency limit shared across functions or environments, use the documented `scope` option with a key.
- Per-key limits and key-queue scheduling are distinct. Key-queue scheduling groups queued work by the evaluated key so a ready item for tenant B is not stuck behind tenant A's blocked backlog. Ordering is best effort: fairness between keys, generally older work first within a key; not a guarantee of equal share or strict event order.
- Availability: key-queue scheduling is currently available to Enterprise customers on request. Setting per-key limits in the function definition does not confirm it is enabled for your account.
- If you change a key expression, items already queued keep the key value assigned when they entered the queue; only new items use the new expression.
- A flow-control key separates limits and scheduling only; enforce tenant authorization and data access in your application.
- Source: https://www.inngest.com/docs-markdown/durable-execution/flow-control/multi-tenancy (fetched 2026-10). The Go example is abridged from the original (imports, client creation, and `TenantSyncRequested` type omitted).

## Related

- [Concurrency](./concurrency.md)
- [Throttling](./throttling.md)
- [Priority](./priority.md)
