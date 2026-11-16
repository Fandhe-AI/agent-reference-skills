---
source: https://docs.cloud.google.com/batch/docs/automate-task-retries
---

# Automate task retries

Configure a Batch job to automatically retry failed tasks, for all failures (`maxRetryCount`) or only for specific exit codes (`lifecyclePolicies[]`). By default a task runs once and is not retried. Retries suit loosely coupled tasks and time-sensitive issues such as Spot VM preemption, VM maintenance events and host errors, and transient network errors.

## Signature / Usage

### Retry tasks for all failures

Job config (`MAX_RETRY_COUNT` is an integer between `1` and `10`; default `0` = no retries):

```json
{
  "taskGroups": [
    {
      "taskSpec": {
        "runnables": [
          {
            "script": {
              "text": "echo Hello world from task ${BATCH_TASK_INDEX}"
            }
          }
        ],
        "maxRetryCount": MAX_RETRY_COUNT
      },
      "taskCount": 3
    }
  ],
  "logsPolicy": {
    "destination": "CLOUD_LOGGING"
  }
}
```

```bash
gcloud batch jobs submit JOB_NAME \
  --location LOCATION \
  --config JSON_CONFIGURATION_FILE
```

API form:

```text
POST https://batch.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/jobs?job_id=JOB_NAME
```

### Retry tasks for some failures

Adapted (not in the official docs): the twin rendered this template with markdown escapes (`\[`, `\]`) and flattened indentation; restored the brackets and indentation (same fields). Replace `MAX_RETRY_COUNT`, `ACTION` and `EXIT_CODES` before using it; the file is not valid JSON until the unquoted `MAX_RETRY_COUNT` and `EXIT_CODES` are replaced.

```json
{
  "taskGroups": [
    {
      "taskSpec": {
        "runnables": [
          {
            "script": {
              "text": "echo Hello world from task ${BATCH_TASK_INDEX}"
            }
          }
        ],
        "maxRetryCount": MAX_RETRY_COUNT,
        "lifecyclePolicies": [
          {
            "action": "ACTION",
            "actionCondition": {
              "exitCodes": [EXIT_CODES]
            }
          }
        ]
      }
    }
  ],
  "logsPolicy": {
    "destination": "CLOUD_LOGGING"
  }
}
```

Example that retries only tasks that failed because a Spot VM was preempted (exit code `50001`):

```json
{
  "taskGroups": [
    {
      "taskSpec": {
        "runnables": [
          {
            "script": {
              "text": "sleep 30"
            }
          }
        ],
        "maxRetryCount": 3,
        "lifecyclePolicies": [
          {
            "action": "RETRY_TASK",
            "actionCondition": {
              "exitCodes": [50001]
            }
          }
        ]
      }
    }
  ],
  "allocationPolicy": {
    "instances": [
      {
        "policy": {
          "machineType": "e2-standard-4",
          "provisioningModel": "SPOT"
        }
      }
    ]
  }
}
```

Submit with the same `gcloud batch jobs submit JOB_NAME --location LOCATION --config JSON_CONFIGURATION_FILE` command, or via API:

```text
POST https://batch.googleapis.com/v1/projects/example-project/locations/us-central1/jobs?job_id=example-job
```

## Options / Props

| Field | Description |
|---|---|
| `maxRetryCount` | Max automatic retries per task; `1`-`10` to enable, default `0`. Required (at least `1`) for lifecycle policies to work. |
| `lifecyclePolicies[].action` | `RETRY_TASK`: retry tasks failing with the listed exit codes, do not retry other codes. `FAIL_TASK`: do not retry the listed codes, retry all other codes. |
| `lifecyclePolicies[].actionCondition.exitCodes[]` | Exit codes (comma-separated, e.g. `50001, 50002`); defined by your application or Batch. `50001`-`59999` are reserved by Batch. |
| `BATCH_TASK_RETRY_ATTEMPT` | Predefined environment variable: number of times the task has already been attempted; use it to change behavior on retry. |

## Notes

- Corrected from the official docs: the template rendered `"lifecyclePolicies": \[` and `"exitCodes": \[EXIT_CODES\]` with backslash escapes and flattened indentation; they are shown as `[` / `]` with normal indentation. The placeholders `MAX_RETRY_COUNT`, `ACTION` and `EXIT_CODES` remain; both templates on this page are valid JSON only after the unquoted `MAX_RETRY_COUNT` and `EXIT_CODES` are replaced. The fields are unchanged and match the batch v1 Discovery document (`LifecyclePolicy.action` enum `RETRY_TASK` / `FAIL_TASK`; `ActionCondition.exitCodes` an array of integers; `TaskSpec.maxRetryCount` valid range 0-10).
- Roles to create a job: Batch Job Editor (`roles/batch.jobsEditor`) on the project and Service Account User (`roles/iam.serviceAccountUser`) on the job's service account (default: Compute Engine default service account).
- Any exit code not listed in a lifecycle policy takes the opposite action.
- Spot VMs (Compute Engine) can be preempted at any time, which is a typical use for retries.
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Source: https://docs.cloud.google.com/batch/docs/automate-task-retries (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-timeouts.md](./set-timeouts.md)
- [create-run-job.md](./create-run-job.md)
