---
source: https://docs.cloud.google.com/batch/docs/create-run-job
---

# Job creation and execution overview

Explains how Batch jobs are created, queued, scheduled and executed, and lists the job creation options (service account, networking, Secret Manager, MPI, VM templates, GPUs, storage, retries, timeouts, reservations and more). A job is created, runs automatically, and its information is kept until deleted.

## Signature / Usage

The twin for this page has no code. The following snippets are from the example job page (a job config and its submission):

```json
{
  "taskGroups": [
    {
      "taskSpec": {
        "runnables": [
          {
            "script": {
              "text": "bash /mnt/share/transcode.sh"
            }
          }
        ],
        "computeResource": {
          "cpuMilli": 2000,
          "memoryMib": 2048
        },
        "volumes": [
          {
            "gcs": {
              "remotePath": "BUCKET_NAME"
            },
            "mountPath": "/mnt/share"
          }
        ],
        "maxRetryCount": 2,
        "maxRunDuration": "600s"
      },
      "taskCount": 3,
      "parallelism": 3
    }
  ],
  "allocationPolicy": {
    "instances": [
      {
        "policy": {
          "machineType": "n2d-standard-4",
          "provisioningModel": "SPOT"
        }
      }
    ]
  },
  "labels": {
    "department": "creative",
    "env": "testing"
  },
  "logsPolicy": {
    "destination": "CLOUD_LOGGING"
  }
}
```

```bash
gcloud batch jobs submit transcode \
    --config=job.json \
    --location=us-central1
```

## Options / Props

### Job states

| Level | State | Meaning |
|---|---|---|
| Job | `QUEUED` | Admitted and waiting in the queue. If it exceeds the maximum wait time in the queue (2 days, see [quotas.md](./quotas.md)) Batch fails it. |
| Job | `SCHEDULED` | Selected from the queue; resources are being allocated. |
| Job | `RUNNING` | Resources created; tasks can start. |
| Job | `SUCCEEDED` / `FAILED` / `CANCELLED` | All tasks succeeded / at least one task failed / a user cancelled the job. |
| Task | `PENDING` → `ASSIGNED` → `RUNNING` | Waiting for a VM, assigned a VM, running. |
| Task | `SUCCEEDED` / `FAILED` | Each runnable succeeded (exit code 0), or failed but `ignoreExitStatus` is enabled, or did not finish but is a `background` runnable / at least one runnable did not meet these conditions. |

### Queuing and scheduling factors

| Factor | Detail |
|---|---|
| Job prerequisites | None by default; dependent jobs (Preview) can wait for other jobs to succeed or fail. |
| Priority | `--priority` flag or `priority` JSON field, `0` (lowest, default) to `99` (highest). Equal priority: the job created first wins. |
| Resource availability | Resources not offered in the location cause a zone availability error; low-capacity resources can delay or fail the job. |
| Quotas and limits | Exceeding a limit or quota can delay and retry, or fail the job. |

### Task scheduling and resources

| Field | Values / rule |
|---|---|
| `schedulingPolicy` | `AS_SOON_AS_POSSIBLE` (default; parallel) or `IN_ORDER` (one task at a time in increasing index order, one VM). |
| `taskCount` | Total tasks. VMs per job (max) = `taskCount` / parallel tasks per VM, also limited by the concurrent VMs per job limits. |
| Parallel tasks per VM | Min 1; max is the smaller of 20 and `parallelism` (if defined). Uses `taskCountPerNode` if defined; otherwise vCPUs per VM / vCPUs per task (`cpuMilli`). |
| `computeResource` | vCPUs (`cpuMilli`), memory (`memoryMib`), extra boot disk (`bootDiskMib`) per task. |
| VM resources | `instances[].policy` or `instances[].instanceTemplate`; optionally `instanceFlexibilityPolicy`. If undefined (not possible in the console) Batch selects compatible VMs and adds no extra resources. |

## Notes

- A job's information remains until you or Google Cloud delete it; Google Cloud deletes a job 60 days after it finishes. Export job information before then if you need it. Logs follow the Cloud Logging retention policy.
- If you specify VM resources, make sure they are compatible with each other, available in the job's location, and that the machine type has enough vCPUs and memory for `cpuMilli`, `memoryMib` and `taskCountPerNode`.
- Smaller jobs that use few common resources and do not restrict zones are likelier to run sooner.
- Some job creation options are not available in the Google Cloud console; use the gcloud CLI or Batch API for the full set.
- The example job uses Spot VMs and a Cloud Storage volume (`gcs.remotePath`); run it in a disposable project first.
- Snippets taken from https://docs.cloud.google.com/batch/docs/create-run-example-job.
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Source: https://docs.cloud.google.com/batch/docs/create-run-job (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-started.md](./get-started.md)
- [create-run-example-job.md](./create-run-example-job.md)
- [automate-task-retries.md](./automate-task-retries.md)
- [set-timeouts.md](./set-timeouts.md)
- [networking-overview.md](./networking-overview.md)
- [vm-os-environment-overview.md](./vm-os-environment-overview.md)
- [quotas.md](./quotas.md)
