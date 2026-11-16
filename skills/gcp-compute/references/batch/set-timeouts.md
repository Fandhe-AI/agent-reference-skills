---
source: https://docs.cloud.google.com/batch/docs/set-timeouts
---

# Limit run times using timeouts

Limit how long a task or runnable may run by setting `maxRunDuration` (task) or `timeout` (runnable) in a Batch job. Batch usually does not allow jobs to run longer than 14 days and sets no default timeouts, so without timeouts a task or runnable can run up to 14 days, risking unexpected cost and delay.

## Signature / Usage

### Timeout for a task

`TIMEOUT` is a number of seconds or fractional seconds, for example `255s`. Create the job with the gcloud CLI or REST API.

```json
{
    "taskGroups": [
      {
        "taskSpec": {
          "runnables": [
            {
              "script": {
                "text": "echo Hello world! This is task ${BATCH_TASK_INDEX}. This job has a total of ${BATCH_TASK_COUNT} tasks."
              }
            }
          ],
          "maxRunDuration": "255s"
        },
        "taskCount": 3
      }
    ],
    "logsPolicy": {
        "destination": "CLOUD_LOGGING"
    }
}
```

### Timeout for a runnable

Example: a 3.5 second timeout.

```json
{
    "taskGroups": [
      {
        "taskSpec": {
          "runnables": [
            {
              "script": {
                "text": "echo Hello world! This is task ${BATCH_TASK_INDEX}. This job has a total of ${BATCH_TASK_COUNT} tasks."
              },
              "timeout": "3.5s"
            }
          ]
        },
        "taskCount": 3
      }
    ],
    "logsPolicy": {
        "destination": "CLOUD_LOGGING"
    }
}
```

## Options / Props

| Field | Location | Description |
|---|---|---|
| `maxRunDuration` | `taskSpec` | Max run time of the task = sum of the run times of its runnables (3 runnables running together for 1 minute = 3 minutes, not 1). |
| `timeout` | `runnable` | Max run time of that runnable. |

## Notes

- Exceeding either timeout fails the task or runnable; it is indicated by exit code `50005` in status events and logs.
- With overlapping timeouts, exceeding any one triggers failure (task 60 s and runnable 120 s: the 120 s timeout can never fire).
- Known issue: logs for an exceeded timeout do not say whether the task or the runnable timeout was exceeded; see the Batch known issues page for a workaround.
- To finish a runnable as soon as the other runnables of the task finish, use a `background` runnable instead.
- Choose timeouts by analyzing logs of similar past jobs. Maximum job run time limits are in [quotas.md](./quotas.md).
- Required roles to create the job: Batch Job Editor (`roles/batch.jobsEditor`) and Service Account User (`roles/iam.serviceAccountUser`) on the job's service account.
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Source: https://docs.cloud.google.com/batch/docs/set-timeouts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [automate-task-retries.md](./automate-task-retries.md)
- [create-run-job.md](./create-run-job.md)
- [quotas.md](./quotas.md)
