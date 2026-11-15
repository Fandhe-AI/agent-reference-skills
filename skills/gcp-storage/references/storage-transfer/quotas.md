---
source: https://docs.cloud.google.com/storage-transfer/quotas
---

# Storage Transfer Service quotas and limits

Current API restrictions and usage quotas for Storage Transfer Service. Rate quotas are per project; requests from the Google Cloud CLI, console and client libraries count too.

## Signature / Usage

Quota adjustment goes through the standard quota process (https://docs.cloud.google.com/docs/quotas/overview#manage_quota_values). Job creation (counted under `create_requests`):

```bash
gcloud transfer jobs create \
  SOURCE DESTINATION
```

## Options / Props

| Limit | Value | Applies to |
|---|---|---|
| Maximum in-progress `transferOperations` | 200 | project |
| URL list maximum size | 128 MB | per list |

When the in-progress limit is reached, new and resumed `transferOperations` go to `QUEUED` status and move to `IN_PROGRESS` as others complete.

| Metric | API methods | Default limits |
|---|---|---|
| `storagetransfer.googleapis.com/create_requests` | `projects.agentPools.create`, `transferJobs.create` | 600 requests/min/project; 5000 requests/day/project |
| `storagetransfer.googleapis.com/read_requests` | `googleServiceAccounts.get`, `projects.agentPools.get`, `projects.agentPools.list`, `transferJobs.get`, `transferJobs.list`, `transferOperations.get`, `transferOperations.list` | 1500 requests/min/project |
| `storagetransfer.googleapis.com/update_requests` | `projects.agentPools.patch`, `transferJobs.patch` | 600 requests/min/project |
| `storagetransfer.googleapis.com/delete_requests` | `projects.agentPools.delete`, `transferJobs.delete` | 600 requests/min/project |
| `storagetransfer.googleapis.com/operation_requests` | `transferOperations.cancel`, `transferOperations.pause`, `transferOperations.resume` | 900 requests/min/project |

## Notes

- Snippet taken from https://docs.cloud.google.com/storage-transfer/docs/create-transfers (the source twin has no code block).
- Source: https://docs.cloud.google.com/storage-transfer/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [known-limitations-transfer.md](./known-limitations-transfer.md)
- [schedule-transfer-jobs.md](./schedule-transfer-jobs.md)
