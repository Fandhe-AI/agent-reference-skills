---
source: https://developers.cloudflare.com/workflows/reference/limits/
---

# Limits

Limits for authoring, deploying, and running Workflows on Workers Free and Workers Paid; many are inherited from Workers limits.

## Signature / Usage

CPU time limit raised for a Workflow definition:

```jsonc
{
	// ...rest of your configuration...
	"limits": {
		"cpu_ms": 300000, // 300,000 milliseconds = 5 minutes
	},
	// ...rest of your configuration...
}
```

Subrequest limit raised:

```jsonc
{
	// ...rest of your configuration...
	"limits": {
		"subrequests": 10000000, // 10 million (maximum)
	},
	// ...rest of your configuration...
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Workflow class definitions per script | size | Free: 3MB max script size; Paid: 10MB | Per Worker size limits |
| Total scripts per account | count | Free: 100; Paid: 500 (shared with Worker script limits) | — |
| Compute time per step | time | Free: 10 ms; Paid: 30 seconds (default), configurable to 5 minutes of active CPU time | CPU time, not I/O wait |
| Duration (wall clock) per step | time | Unlimited on both | For example waiting on network I/O or a database |
| Maximum non-stream step result per step | size | 1 MiB (2^20 bytes) on both | Streamed JS output is also supported |
| Maximum event payload size | size | 1 MiB (2^20 bytes) on both | — |
| Maximum state persisted per Workflow instance | size | Free: 100MB; Paid: 1GB | Includes persisted bytes from streamed step outputs |
| Maximum `step.sleep` duration | time | 365 days (1 year) on both | — |
| Maximum steps per Workflow | count | Free: 1,024; Paid: 10,000 (default), configurable up to 25,000 | `step.sleep` does not count |
| Maximum Workflow executions | count | Free: 100,000 per day (shared with Workers daily limit); Paid: Unlimited | — |
| Concurrent Workflow instances per account | count | Free: 100; Paid: 50,000 | Only `running` instances count; `waiting` instances are excluded |
| Maximum instance creation rate | rate | Free: 100 per second; Paid: 300 per second per account, 100 per second per workflow | Each created or restarted instance counts; exceeding returns HTTP 429 |
| Maximum queued instances | count | Free: 100,000; Paid: 2,000,000 | — |
| Retention of completed instance state | time | Free: 3 days; Paid: 30 days | Shorten with `default_retention` or per-instance `retention` |
| Maximum Workflow name length | characters | 64 on both | Pattern `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` |
| Maximum instance ID length | characters | 100 on both | Pattern `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` |
| Maximum subrequests per Workflow instance | count | Free: 50/request; Paid: 10,000/request (default), configurable up to 10 million | — |
| Maximum retries per step | count | 10,000 on both | — |
| Maximum `schedules` (cron expressions) per account | count | 100 | — |
| Maximum cron expression length | characters | 256 | — |

Wall time limits by invocation type:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Incoming HTTP request | time | Unlimited | No hard limit while the client remains connected; `waitUntil()` extends execution up to 30 seconds |
| Cron Triggers | time | 15 minutes | Per invocation |
| Queue consumers | time | 15 minutes | Per invocation |
| Durable Object alarm handlers | time | 15 minutes | Per invocation |
| Durable Objects (RPC / HTTP) | time | Unlimited | While the caller stays connected |
| Workflows (per step) | time | Unlimited | Steps are subject to the configured CPU time limit |

## Notes

- Workflows cannot be deployed to Workers for Platforms namespaces.
- `waiting` instances (sleeping, waiting for retry, or waiting for an event) do not count toward concurrency, so very large numbers can sleep at once. If the running limit is reached, a waking instance is queued; when an instance moves from `running` to `waiting`, queued instances are scheduled (usually the oldest, best effort; a very short wait may skip this transition). The official page's prose mentions a 10,000 concurrent running limit while its table lists 50,000 on Workers Paid; the table value is recorded here, so verify against the live page.
- On Workers Paid, cron-`schedules` instances get a separate one-hour concurrency budget per firing; after that they yield into the normal queue and are not failed or terminated.
- Exceeding CPU time throws `Error: Worker exceeded CPU time limit.` (`exceededCpu` in `wrangler tail`, `exceededResources` in Workers metrics). Exceeding subrequests throws `Error: Too many subrequests.` (`exception` in `wrangler tail`). Workers Free keeps 50 external subrequests and 1,000 subrequests to Cloudflare services per invocation.
- A Workflow instance can run forever as long as each step stays within the CPU limit and the step count limit. For large binary output in JavaScript, return a `ReadableStream<Uint8Array>`; for very large or long-lived artifacts use external storage such as R2.
- Request a higher limit with Cloudflare's Limit Increase Request Form (linked from the official page).
- Historical values (4,500 concurrent instances in 2025, 1,024 steps in late 2024) are in [changelog.md](./changelog.md); the table above is current.

## Related

- [pricing.md](./pricing.md)
- [workflow-configuration.md](./workflow-configuration.md)
- [rules-of-workflows.md](./rules-of-workflows.md)
- [changelog.md](./changelog.md)
