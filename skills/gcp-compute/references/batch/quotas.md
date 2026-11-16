---
source: https://docs.cloud.google.com/batch/quotas
---

# Batch quotas and limits

Batch uses quotas (default values, adjustment usually requestable) and system limits (fixed) for fair allocation. Batch jobs also count against Compute Engine quotas and limits and those of other services they use. Exceeding a quota or limit returns an error. The Batch limits below cannot be changed.

## Signature / Usage

The twin for this page has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs/submit (gcloud 593.0.0 help); the submitted `--config` file counts toward the 1 MB job definition limit:

```bash
gcloud batch jobs submit \
    projects/foo/locations/us-central1/jobs/bar --config=config.json
```

## Options / Props

### Rate quotas

They appear as quotas (for example in the console) but cannot be increased.

| Limit | Value |
|---|---|
| Agent requests per minute per region | 30,000 |
| Mutation requests per minute per region | 6,000 |
| Read requests per minute per region | 15,000 |

### Job limits

| Limit | Value |
|---|---|
| Tasks per task group | 100,000 |
| Parallel tasks per job | 5,000 |
| Concurrent VMs per single-zone job | 2,000 |
| Concurrent VMs per multi-zone job | 4,000 |
| Size of the job definition | 1 MB |
| Wait time (`QUEUED` state) before automatic failure | 2 days |
| Run time (`RUNNING` state) before automatic failure | 14 days |

## Notes

- Single-zone / multi-zone refers to the number of zones allowed for the job's VMs, which may differ from the zones of the job's location.
- Job definition size is roughly the size of the `jobs.create` REST request or the gcloud `--config` file. Work around it by dividing tasks across multiple jobs, for example with dependent jobs (Preview).
- Run time exceptions: with `provisioningModel` set to `FLEX_START` the maximum is 7 days; for an A3-series machine type with `reservation` set to `NO_RESERVATION` and `provisioningModel` undefined or `STANDARD` the maximum is 7 days. You can reduce the maximum with timeouts.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs/submit (gcloud 593.0.0 help).
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Source: https://docs.cloud.google.com/batch/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-timeouts.md](./set-timeouts.md)
- [create-run-job.md](./create-run-job.md)
- [get-started.md](./get-started.md)
