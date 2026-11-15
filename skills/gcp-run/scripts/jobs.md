---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs
---

# Cloud Run Jobs

Copy-paste gcloud commands for Cloud Run jobs: create and update a job, execute it (with overrides), watch and cancel executions, and delete jobs and executions.

## Signature / Usage

### Create a job

`OPTIONS` stands for further flags such as `--tasks`, `--max-retries`, `--task-timeout` and `--parallelism` (see the table below); it is a placeholder, not a literal argument. The two forms below are templates (hence `text`), not commands to paste as is.

```text
gcloud run jobs create JOB --image IMAGE_URL OPTIONS
```

```text
gcloud run jobs deploy JOB --image IMAGE_URL OPTIONS
```

Create and run immediately (equal to `create` followed by `execute`):

```bash
gcloud run jobs create JOB \
  --image IMAGE_URL \
  --execute-now \
  --region=REGION
```

### Set retries, timeout and parallelism

```bash
gcloud run jobs create JOB --image IMAGE_URL --max-retries RETRY
```

```bash
gcloud run jobs create JOB_NAME --image IMAGE_URL --task-timeout TIMEOUT
```

```bash
gcloud run jobs create JOB --image IMAGE_URL --parallelism PARALLELISM
```

```bash
gcloud run jobs update JOB --max-retries RETRY
```

```bash
gcloud run jobs update JOB_NAME --task-timeout TIMEOUT
```

```bash
gcloud run jobs update JOB --parallelism PARALLELISM
```

### Update a job

The source shows this bare form and lists the flags as optional `OPTIONS` (see the table below): add the flags to change after `JOB`, for example `gcloud run jobs update JOB --max-retries RETRY` above.

```bash
gcloud run jobs update JOB
```

Export, edit `spec.template`, then re-apply (the YAML replaces the whole job configuration):

```bash
gcloud run jobs describe JOB --format export > job.yaml
```

```bash
gcloud run jobs replace job.yaml
```

Run immediately after updating:

```bash
gcloud run jobs update JOB --execute-now --region=REGION
```

### List and describe jobs

```bash
gcloud run jobs list --region REGION
```

```bash
gcloud run jobs describe  JOB
```

### Execute a job

```bash
gcloud run jobs execute JOB
```

Wait until the execution completes:

```bash
gcloud run jobs execute JOB --wait --region=REGION
```

Tail the logs right after launching. Available only in `gcloud beta run jobs execute`:

```bash
gcloud beta run jobs execute JOB --tail --region=REGION
```

### Execute with overrides for one run

The overrides apply to this execution only; the job definition is unchanged.

```bash
gcloud run jobs execute JOB \
     --args ARGS \
     --update-env-vars KEY=VALUE,KEY_N=VALUE_N \
     --tasks TASKS \
     --task-timeout TIMEOUT
```

### List and describe executions

```bash
gcloud run jobs executions list --job JOB
```

```bash
gcloud run jobs executions describe EXECUTION_NAME --format yaml
```

```bash
gcloud run jobs executions describe-latest --job=JOB
```

Get the name of the latest execution of a job:

```bash
gcloud run jobs describe JOB --format="value(status.latestCreatedExecution.name)"
```

### Cancel an execution

> **Warning**: Cancelling stops a running execution and does not reverse charges for the time already run. Try it on a disposable job first.

```bash
gcloud run jobs executions cancel EXECUTION_NAME
```

The command asks for confirmation; enter `y`.

### Delete an execution

> **Warning**: Deleting an execution stops it if it is running and removes it from the list. Try it on a disposable job first.

```bash
gcloud run jobs executions delete EXECUTION_NAME
```

If prompted to confirm, respond `y`.

### Read the job IAM policy

```bash
gcloud run jobs get-iam-policy JOB_NAME
```

### Delete a job

> **Warning**: Deleting a job terminates all job executions in progress and all running container instances. Try it on a disposable job first.

```bash
gcloud run jobs delete JOB
```

If prompted to confirm, respond `y`.

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--tasks` | `jobs create`, `jobs update`, `jobs execute` | Integer >= 1, default 1, maximum 10,000; each task gets `CLOUD_RUN_TASK_INDEX` and `CLOUD_RUN_TASK_COUNT` |
| `--max-retries` | `jobs create`, `jobs update` | Retries of a failed task; default 3, integers 0 to 10 |
| `--task-timeout` | `jobs create`, `jobs update`, `jobs execute` | Duration such as `2s`; default 10 minutes, maximum 168 hours (12 hours for tasks with GPUs) |
| `--parallelism` | `jobs create`, `jobs update` | Maximum tasks running in parallel; default as quickly as possible |
| `--execute-now` | `jobs create`, `jobs update` | Start an execution right after the job is created or updated |
| `--wait` | `jobs execute` | Wait until the execution completes |
| `--args` / `--update-env-vars` | `jobs execute` | Per-execution overrides for arguments and environment variables |

Roles on the job: Cloud Run Invoker (`roles/run.invoker`) is enough to execute with gcloud; overriding configuration or cancelling executions needs Cloud Run Developer (`roles/run.developer`); creating and updating needs Cloud Run Developer on the job, Service Account User (`roles/iam.serviceAccountUser`) on the service identity and Artifact Registry Reader (`roles/artifactregistry.reader`) on the image repository.

## Notes

- Destructive commands on this page: `jobs delete`, `jobs executions delete`, `jobs executions cancel`. Try each on a disposable job first.
- Source inconsistency: https://docs.cloud.google.com/run/docs/securing/managing-access lists "cancel job executions" under Cloud Run Invoker, while https://docs.cloud.google.com/run/docs/execute/jobs requires Cloud Run Developer (`run.executions.cancel`). The IAM roles reference (https://docs.cloud.google.com/iam/docs/roles-permissions/run) lists no `run.executions.cancel` in `roles/run.invoker`; its permissions are `run.instances.invoke`, `run.jobs.run` and `run.routes.invoke`.
- The job name cannot be edited after creation. Execution details are kept for the most recent 1,000 executions of a job.
- To run a job on a schedule see [scheduler.md](./scheduler.md).
- Cloud Run jobs are Google Cloud's run-to-completion containers, distinct from Cloudflare Workers (`cloudflare-workers`) cron triggers and Vercel Functions (`vercel`). See the `gcp-foundation` skill for IAM and service accounts.
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs
- Source: https://docs.cloud.google.com/run/docs/create-jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/execute/jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/job-executions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/max-retries (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/task-timeout (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/parallelism (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/securing/managing-access (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/run (IAM roles and permissions reference)

## Related

- [services.md](./services.md)
- [scheduler.md](./scheduler.md)
- [worker-pools.md](./worker-pools.md)
