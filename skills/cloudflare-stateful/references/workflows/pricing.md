---
source: https://developers.cloudflare.com/workflows/reference/pricing/
---

# Pricing

Workflows are included in Workers Free and Paid plans and are billed on CPU time, requests, storage, and steps.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workflows/build/workers-api/ (shorter retention reduces billed storage):

```jsonc
{
	"workflows": [
		{
			"name": "my-workflow",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow",
			"default_retention": {
				"success_retention": "3 days",
				"error_retention": "7 days",
			},
		},
	],
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Requests (millions) | unit | Free: 100,000 per day (shared with Workers requests); Paid: 10 million included per month + $0.30 per additional million | A request is a Workflow invocation (trigger of a new instance); steps and subrequests are not invocations |
| CPU time (ms) | unit | Free: 10 ms per invocation; Paid: 30 million CPU ms included per month + $0.02 per additional million | Idle time (awaiting API, `step.sleep`) incurs no CPU time |
| Storage (GB-mo) | unit | Free: 1 GB-month; Paid: 1 GB-month included + $0.20 per GB-month | Averaged peak daily storage over a 30-day billing period |
| Steps | unit | Free: 3,000 per day; Paid: 500,000 included per month + $0.80 per additional 100,000 per month | Does not include rollback handlers or retries |

## Notes

- Per the page, billing for Workflows steps and storage applies starting 2026-08-10 (the page was fetched 2026-11-03). Check the linked changelog post (https://developers.cloudflare.com/changelog/post/2026-07-07-workflows-billing-updates/) for the current state.
- CPU time and requests use Workers Standard pricing. CPU limit can be raised to 5 minutes per Workflow via `limits.cpu_ms`.
- Storage is billed like Durable Objects SQL storage, calculated across all instances (running, errored, sleeping, completed). Default retention is 3 days on Free and 7 days on Paid (Paid Workflows created before the default changed keep 30 days; Paid retention is configurable up to 30 days); change it with `default_retention` or per-instance `retention`. Deleting instances (Workers API, Wrangler, REST API, dashboard) frees storage, which may take a few minutes to update.
- On Workers Free, an instance that tries to store state after reaching the storage limit throws an error.
- See [limits.md](./limits.md) for non-billing limits.
- Source: https://developers.cloudflare.com/workflows/reference/pricing/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [limits.md](./limits.md)
- [workflow-configuration.md](./workflow-configuration.md)
