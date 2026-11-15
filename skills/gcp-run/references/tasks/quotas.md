---
source: https://docs.cloud.google.com/tasks/docs/quotas
---

# Cloud Tasks quotas and limits

Quotas have default values and can typically be adjusted; system limits are fixed. Quotas apply per Google Cloud project and are shared across all applications and IP addresses; exceeding a quota usually makes the request fail.

## Signature / Usage

Quotas are adjusted in the console (Cloud Tasks API > Quotas & System limits > Edit quota); see https://docs.cloud.google.com/docs/quotas/help/request_increase. To spread load beyond the per-queue rate limit, create more queues (Snippet taken from https://docs.cloud.google.com/tasks/docs/creating-queues):

```bash
gcloud tasks queues create QUEUE_ID \
    --location=LOCATION
```

## Options / Props

### Quotas

| Resource | Console quota name | Default |
| --- | --- | --- |
| Queues | Number of queues per region | 1,000 per region (queues created via `queue.yaml` start at 100) |
| API requests | Requests per minute per region | 6,000,000 per minute; each task in `batchCreate` / `batchDelete` counts as one request |
| Force run task requests | Run task requests per minute per region | 60 per minute (manual debugging only) |
| List requests | List group requests per minute per region | 600 per minute (`list tasks`, `list queues`, `list locations`) |

### System limits

| Resource | Value |
| --- | --- |
| Queue dispatch rate | 500 tasks per second per queue (use multiple queues for more) |
| Maximum task size | 1 MiB |
| Maximum batch size | 10 MiB |
| Tasks created per `batchCreate` | 100 |
| Tasks deleted per `batchDelete` | 1,000 |
| Task deduplication window | up to 24 hours |
| Batch operation deduplication window | 7 days |
| Inactive queues | `INACTIVE` after 30 days without method calls and dispatches |
| Dispatch deadline, HTTP targets | default 10 minutes; `dispatchDeadline` 15 seconds to 30 minutes (1,800 seconds) |
| Dispatch deadline, App Engine targets | 10 minutes (standard, automatic scaling), 24 hours (standard basic/manual scaling), 60 minutes (flexible), configurable from 15 seconds up to the scaling type's maximum |
| Maximum task retention | 31 days |
| Maximum schedule time | 30 days from now |
| Queue re-creation | wait 3 days after deleting a queue before re-creating the same name |

## Notes

- A missed dispatch deadline marks the attempt `DEADLINE_EXCEEDED` and the task is retried per the retry policy.
- Queue-level rate and retry settings are in configuring-queues.
- Source: https://docs.cloud.google.com/tasks/docs/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/tasks/docs/creating-queues (retrieved 2026-11-15)

## Related

- [configuring-queues.md](./configuring-queues.md)
- [creating-queues.md](./creating-queues.md)
- [dual-overview.md](./dual-overview.md)
