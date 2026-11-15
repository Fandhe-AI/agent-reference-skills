---
source: https://docs.cloud.google.com/run/docs/execute/jobs
---

# Cloud Run Job with Task Overrides and Retries

Create a Cloud Run job, tune its task count, retries, parallelism and timeout, then run executions with per-execution overrides and wait for or cancel them.

## Signature / Usage

`JOB` and `JOB_NAME` are the same job name; each block keeps the placeholder of its source page. Example image: `us-docker.pkg.dev/cloudrun/container/job:latest`.

### 1. Create the job

```bash
gcloud run jobs create JOB --image IMAGE_URL OPTIONS
```

`OPTIONS` can include `--tasks`, `--max-retries`, `--task-timeout` and `--parallelism`. Each task gets `CLOUD_RUN_TASK_INDEX` (0 to tasks minus 1) and `CLOUD_RUN_TASK_COUNT`; your code picks its slice of the data from them.

### 2. Set retries, parallelism and task timeout

```bash
gcloud run jobs update JOB --max-retries RETRY
```

```bash
gcloud run jobs update JOB --parallelism PARALLELISM
```

`TIMEOUT` specifies amount and unit, for example `10m5s`.

```bash
gcloud run jobs update JOB_NAME --task-timeout TIMEOUT
```

### 3. Execute and wait

```bash
gcloud run jobs execute JOB --wait --region=REGION
```

### 4. Execute with overrides for this run only

The job definition is unchanged.

```bash
gcloud run jobs execute JOB \
     --args ARGS \
     --update-env-vars KEY=VALUE,KEY_N=VALUE_N \
     --tasks TASKS \
     --task-timeout TIMEOUT
```

### 5. Cancel an execution

Cancelling is destructive to the running execution; try it on a disposable job first. The command asks for confirmation; enter `y`.

```bash
gcloud run jobs executions cancel EXECUTION_NAME
```

## Options / Props

| Setting | Detail |
|---|---|
| `--tasks` | Integer >= 1; default 1; maximum 10,000 |
| `--max-retries` | Integer 0 to 10; default 3; per task, not per job; 1 means two attempts in total |
| `--task-timeout` | Default 10 minutes; maximum 168 hours (7 days); 12 hours for tasks using GPUs (preview) |
| `--parallelism` | Maximum tasks running in parallel; default as fast as possible, up to a limit that depends on CPUs; not above the task count |
| Overridable per execution | `--args`, `--update-env-vars`, `--tasks`, `--task-timeout` |
| Roles | `roles/run.invoker` to execute with gcloud; `roles/run.developer` to override or cancel |

## Notes

- Lower `--parallelism` to protect backing resources such as a database. If any task exceeds its retries the execution is marked failed after all tasks were tried.
- The timeout applies to each attempt; Google recommends enabling retries for all jobs, especially long-running ones.
- Run the job as a dedicated user-managed service account rather than the Compute Engine default one.
- Cancelling does not reverse charges for the time already run; deleting an execution also removes it from the list.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/execute/jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/create-jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/max-retries (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/parallelism (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/task-timeout (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [scheduler-oidc-private-service.md](./scheduler-oidc-private-service.md)
- [secrets-env-and-volume.md](./secrets-env-and-volume.md)
- Job executions: https://docs.cloud.google.com/run/docs/managing/job-executions
