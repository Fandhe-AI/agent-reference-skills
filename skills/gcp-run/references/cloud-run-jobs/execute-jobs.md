---
source: https://docs.cloud.google.com/run/docs/execute/jobs
---

# Execute jobs

Executing a job creates a job execution in which all tasks must run to completion successfully for the execution to succeed. Executions log to Cloud Logging and send data to Cloud Monitoring. This page covers executing, executing immediately, overriding configuration for one execution (args, env vars, task count, task timeout), and cancelling.

## Signature / Usage

### Execute a job

```bash
gcloud run jobs execute JOB
```

Wait until the execution completes:

```bash
gcloud run jobs execute JOB --wait --region=REGION
```

Tail the logs right after launching:

```bash
gcloud beta run jobs execute JOB --tail --region=REGION
```

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X POST \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB:run
```

### Execute immediately on create or update

```bash
gcloud run jobs create JOB \
  --image IMAGE_URL \
  --execute-now \
  --region=REGION
```

```bash
gcloud run jobs update JOB --execute-now --region=REGION
```

YAML form uses `startExecutionToken`:

Adapted (not in the official docs): `apiVersion` set to `run.googleapis.com/v1`; `gcloud run jobs replace` sends the YAML to the v1 Admin API, and the source's step links the v1 Job YAML reference.

```yaml
apiVersion: run.googleapis.com/v1
kind: Job
metadata:
  name: JOB
spec:
  template:
    spec:
      template:
        spec:
          containers:
          - image: IMAGE_URL
  startExecutionToken: START_EXECUTION_SUFFIX
```

`START_EXECUTION_SUFFIX` is a unique string used as a suffix for creating a new execution; the sum of job name and token length must be fewer than 63 characters.

### Execute with overrides

Overrides affect only this execution; the job definition is unchanged.

```bash
gcloud run jobs execute JOB \
     --args ARGS \
     --update-env-vars KEY=VALUE,KEY_N=VALUE_N \
     --tasks TASKS \
     --task-timeout TIMEOUT
```

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X POST \
  -d '{"overrides": {"containerOverrides": [{"args": ["ARGS"], "env": [{"name": "KEY", "value": "VALUE"}]}], "taskCount": TASKS, "timeout": "TIMEOUT" }}' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB:run
```

`TIMEOUT` has a different format in each form. In gcloud, `--task-timeout` takes a duration such as `10m5s` (a bare number means seconds). In the REST body, `overrides.timeout` is a `google-duration` string ("Duration in seconds"), so write seconds with an `s` suffix, for example `"605s"` or `"3.5s"`. `TASKS` is an integer.

### Cancel an execution

```bash
gcloud run jobs executions cancel EXECUTION_NAME
```

The command asks for confirmation; enter `y`.

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X POST \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB/executions/EXECUTION_NAME:cancel
```

## Options / Props

### Required roles (on the Cloud Run job)

| Operation | Role |
| --- | --- |
| Execute with the gcloud CLI | Cloud Run Invoker (`roles/run.invoker`) |
| Execute with the console, override job configuration, or cancel executions | Cloud Run Developer (`roles/run.developer`) |

Cancel permission: since September 16, 2024 the permission required to cancel is `run.executions.cancel` (contained in Cloud Run Developer and Cloud Run Source Developer).

### Execution methods

| Method | Command / trigger | Cost tier | Max delay / timeout |
| --- | --- | --- | --- |
| Standard (on demand) | `gcloud run jobs execute` | Standard job rates | Immediate start; max 7 days runtime |
| Create/update and run | `gcloud run jobs create/update --execute-now` | Standard job rates | Immediate start; max 7 days runtime |
| Delayed execution | `gcloud beta run jobs execute --delay-execution` | Discounted rate | Max 12h delay before auto-cancellation, max 12 hour timeout |
| Execution with overrides | `gcloud run jobs execute --args=... --tasks=...` | Standard job rates | Immediate start; overridden timeout |

### Overridable fields

| Field | gcloud flag | REST field |
| --- | --- | --- |
| Arguments | `--args` | `overrides.containerOverrides[].args` |
| Environment variables | `--update-env-vars` | `overrides.containerOverrides[].env` |
| Number of tasks | `--tasks` | `overrides.taskCount` |
| Task timeout | `--task-timeout` | `overrides.timeout` |

## Notes

- Least privilege: the roles above are the source's; Cloud Run Developer can also create, update and delete Cloud Run resources. For running and cancelling only, the IAM roles reference lists Cloud Run Jobs Executor (`roles/run.jobsExecutor`, includes `run.jobs.run` and `run.executions.cancel`) and Cloud Run Jobs Executor With Overrides (`roles/run.jobsExecutorWithOverrides`, adds `run.jobs.runWithOverrides`); grant them on the job.
- The REST `overrides.timeout` format comes from the Cloud Run Admin API v2 Discovery document (`GoogleCloudRunV2Overrides.timeout`, type `string (google-duration)`); the `3.5s` form also appears as `timeout = "3.500s"` in the source task-timeout page's Terraform sample.
- Execution details are shown for the most recent 1,000 executions plus any from the last seven days; older logs and monitoring data stay in Cloud Logging / Monitoring per their retention policies.
- Source inconsistency: this page keeps execution details for "the most recent 1,000 executions of a job ... along with any executions that occurred within the last seven days"; https://docs.cloud.google.com/run/docs/managing/job-executions says only "the most recent 1,000 executions of a job".
- Source inconsistency: this page requires Cloud Run Developer (`run.executions.cancel`) to cancel executions; https://docs.cloud.google.com/run/docs/securing/managing-access lists "cancel job executions" under Cloud Run Invoker. The IAM roles reference (https://docs.cloud.google.com/iam/docs/roles-permissions/run) lists no `run.executions.cancel` in `roles/run.invoker`; its permissions are `run.instances.invoke`, `run.jobs.run` and `run.routes.invoke`.
- Corrected from the official docs: the `startExecutionToken` YAML had `apiVersion: run.googleapis.com/v2`; Job YAML for `gcloud run jobs replace` uses `run.googleapis.com/v1` (https://docs.cloud.google.com/run/docs/reference/yaml/v1#job).
- Entities: Job (static configuration), Execution (one run), Task (one running container instance; count is `taskCount`).
- Cancelled executions get status cancelled and stay viewable; deleting an execution removes it from the list. Cancelling does not reverse charges for the time already run. You can also delete an execution while it is running.
- "max 7 days runtime" in the execution methods table is the source's wording; 7 days (168 hours) is the maximum task timeout per attempt, and the task-timeout page says there is no explicit timeout on a job execution (https://docs.cloud.google.com/run/docs/configuring/task-timeout).
- Delayed jobs defer non-urgent tasks up to 12 hours for a better price; see https://docs.cloud.google.com/run/docs/delayed-jobs.
- Cancel and delete are destructive to a running execution; try them on a disposable job first.
- The source also shows Console, Terraform and client library forms, omitted here.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`).
- Source: https://docs.cloud.google.com/run/docs/execute/jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/run (IAM roles and permissions reference)
- Source: https://run.googleapis.com/$discovery/rest?version=v2 (Cloud Run Admin API v2 Discovery document, `GoogleCloudRunV2Overrides`)
- Source: https://docs.cloud.google.com/run/docs/configuring/task-timeout (retrieved 2026-11-15; Terraform `timeout = "3.500s"`)

## Related

- [create-jobs.md](./create-jobs.md)
- [managing-job-executions.md](./managing-job-executions.md)
- [task-timeout.md](./task-timeout.md)
