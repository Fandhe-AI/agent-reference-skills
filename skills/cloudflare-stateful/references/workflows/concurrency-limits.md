---
source: https://developers.cloudflare.com/workflows/build/concurrency-limits/
---

# Concurrency limits

A per-Workflow concurrency limit caps how many instances of a single Workflow run at once. By default, a Workflow's instances can use the whole account concurrency limit, shared by every Workflow in the account. Instances above a per-Workflow limit are queued, not rejected.

## Signature / Usage

Set `concurrency.limit` on the Workflow definition in the Wrangler configuration, then deploy (requires Wrangler 4.127.0 or above):

```jsonc
{
	"workflows": [
		{
			"name": "my-workflow",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow",
			"concurrency": {
				"limit": 10,
			},
		},
	],
}
```

```toml
[[workflows]]
name = "my-workflow"
binding = "MY_WORKFLOW"
class_name = "MyWorkflow"

  [workflows.concurrency]
  limit = 10
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| concurrency.limit | positive integer | none (account limit only) | Maximum running instances of this Workflow; cannot exceed the account concurrency limit. Can also be set on a Workflow declared in `exports`. |

## Notes

- Use it to protect a downstream dependency, spread bursts of expensive calls, or stop one high-volume Workflow from using all account concurrency.
- Queued instances have the `queued` status and start in queue order on a best-effort basis. An instance starts only when both the account and the Workflow have capacity.
- `waiting` and `paused` instances do not count toward the limit; `running`, `waitingForPause` and rollback-handler instances do. A `waiting` instance frees its slot but not immediately (a short wait stays `running`), and is queued again when ready if the account or Workflow is at its limit.
- Limits are caps, not reservations; per-Workflow limits can add up to more than the account limit. Lowering the limit does not stop running instances. Workflows without a limit are only bound by the account limit.
- On Workers Paid, instances created by `schedules` are not held back by the limit during their one-hour cron concurrency budget, then are queued until both limits have a free slot.
- `concurrency` cannot be combined with `script_name`; set it on the Worker that defines the Workflow. Limits are not applied in local development.
- Each deploy sets the limit from the configuration: deploying without `concurrency.limit` removes it. To remove the limit, delete `concurrency` and run `wrangler deploy`.
- Track `WORKFLOW_QUEUED` events in the metrics page to see instances waiting for capacity.
- Source: https://developers.cloudflare.com/workflows/build/concurrency-limits/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Limits](./limits.md)
- [Workflow configuration](./workflow-configuration.md)
- [Trigger Workflows](./trigger-workflows.md)
- [Metrics and analytics](./metrics-analytics.md)
