# Bursty Concurrency

Lets Pro and above accounts burst up to 3x their account concurrency limit for up to 60 minutes per month, so unexpected work runs immediately instead of building a backlog.

## Signature / Usage

This is an account-level plan feature with no function configuration option. Example from the docs:

```text
Plan concurrency limit: 100 (normal usage: ~30 slots)
Import fans out to 250 concurrent steps over 20 minutes

Before: first 100 run concurrently, next 150 wait.
With bursty concurrency: ceiling rises to 300 slots (3 x 100), all 250 steps run at once.
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Burst ceiling | 3x account concurrency limit | Maximum concurrency while bursting. |
| Burst budget | 60 minutes per month | Pro and above accounts. Measured in whole minutes; each minute with concurrency above the account limit consumes one whole minute. |
| Refill | monthly | Refills at a fixed time per account, visible on the billing usage page in the dashboard. |
| Notifications | email to admins | Sent at 25%, 50%, 75%, and 100% of the budget exhausted. |

## Notes

- Concurrency is the number of steps actively executing at once. The account limit is determined by plan and is shared across all steps, regardless of environment or function.
- When the burst budget is exhausted, concurrency returns to the plan limit until the budget refills.
- Function-level flow control you set yourself (concurrency, throttling, priority) remains in effect during a burst.
- Rollout: the docs state bursty concurrency is rolling out to all users across October 2026.
- Frequent notifications or an exhausted budget mean the workload has outgrown the concurrency limit; the docs advise upgrading to the peak you burst to. The Pro maximum is 1,000; above that, contact Inngest about Enterprise.
- Source: https://www.inngest.com/docs-markdown/durable-execution/flow-control/bursty-concurrency (fetched 2026-10).

## Related

- [Concurrency](./concurrency.md)
- [Throttling](./throttling.md)
- [Priority](./priority.md)
