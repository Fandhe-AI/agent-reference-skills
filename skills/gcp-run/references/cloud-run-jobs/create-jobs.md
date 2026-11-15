---
source: https://docs.cloud.google.com/run/docs/create-jobs
---

# Create and update Cloud Run jobs

Create and update Cloud Run jobs from an existing container image. Unlike a Cloud Run service, a job only runs its tasks and exits when finished; it does not listen for or serve requests. A job is a single task or up to 10,000 independent tasks that can run in parallel; each task runs one container instance and can be retried on failure.

## Signature / Usage

### Create a job (gcloud)

```bash
gcloud run jobs create JOB --image IMAGE_URL OPTIONS
```

Alternatively, use the deploy command:

```bash
gcloud run jobs deploy JOB --image IMAGE_URL OPTIONS
```

Replace `JOB` with the job name and `IMAGE_URL` with a container image reference, for example `us-docker.pkg.dev/cloudrun/container/job:latest`.

### Create a job (YAML)

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
```

```bash
gcloud run jobs replace job.yaml
```

### Create a job (REST)

Adapted (not in the official docs): quoted the JSON keys so the body is valid JSON, and double-quoted the URL so `?` is not globbed by the shell (zsh aborts with "no matches found").

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X POST \
  -d '{"template": {"template": {"containers": [{"image": "IMAGE_URL"}]}}}' \
  "https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs?jobId=JOB"
```

`ACCESS_TOKEN` can come from `gcloud auth print-access-token`, or from the container instance metadata server inside a Cloud Run container.

### Update a job

```bash
gcloud run jobs update JOB
```

Export, edit `spec.template` attributes, then redeploy (YAML replaces the whole job configuration):

```bash
gcloud run jobs describe JOB --format export > job.yaml
```

```bash
gcloud run jobs replace job.yaml
```

Adapted (not in the official docs): quoted the JSON keys so the body is valid JSON.

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X PATCH \
  -d '{"template": {"template": {"containers": [{"image": "IMAGE_URL"}]}}}' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB
```

### Deploy sidecars to a job

```bash
gcloud run jobs create JOB \
 --container JOB_CONTAINER_NAME \
 --image='IMAGE_URL' \
 --container SIDECAR_CONTAINER_NAME \
 --image='SIDECAR_IMAGE'
```

Per-container configuration goes after each `--container`:

```bash
gcloud run jobs create JOB \
  --container CONTAINER_1_NAME \
  --image='IMAGE_URL' \
  --set-env-vars=KEY=VALUE \
  --container SIDECAR_CONTAINER_NAME \
  --image='SIDECAR_IMAGE' \
  --set-env-vars=KEY_N=VALUE_N
```

Adapted (not in the official docs): nested `containers` under the task template (`spec.template.spec.template.spec`); the source put it directly under the execution template, which `gcloud run jobs replace` rejects.

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
          - image: SIDECAR_IMAGE
```

## Options / Props

### gcloud run jobs create / update options

| Option | Description |
| --- | --- |
| `--tasks` | Integer >= 1. Default 1; maximum 10,000. Each task gets `CLOUD_RUN_TASK_INDEX` (0 to tasks minus 1) and `CLOUD_RUN_TASK_COUNT` (number of tasks). |
| `--max-retries` | Times a failed task is retried; once any task fails beyond this limit the whole job is marked failed. Default 3; integers 0 to 10. Example: 1 means two attempts in total. |
| `--task-timeout` | Duration such as "2s". Default 10 minutes; maximum 168 hours (7 days); 12 hours for tasks using GPUs. |
| `--parallelism` | Maximum number of tasks that run in parallel. Default: started as quickly as possible. |
| `--execute-now` | (create only) Start a job execution right after the job is created; equals `create` followed by `execute`. |

### Required roles

| Role | Scope |
| --- | --- |
| Cloud Run Developer (`roles/run.developer`) | the Cloud Run job |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |
| Artifact Registry Reader (`roles/artifactregistry.reader`) | the Artifact Registry repository of the job's images |

### Limits and facts

| Item | Value |
| --- | --- |
| Tasks per job | up to 10,000 |
| Default task timeout | 10 minutes (max 168 hours; GPU max 12 hours) |
| Default max retries | 3 (range 0 to 10) |
| Execution environment | second generation |
| Containers per instance (sidecars) | up to 10, including the main job container |
| Image layer size from Docker Hub / remote repository | not supported above 9.9 GB |

## Notes

- Your code decides which task handles which subset of data, using `CLOUD_RUN_TASK_INDEX` and `CLOUD_RUN_TASK_COUNT`. Any task exceeding its retries is marked failed; if any task failed, the execution is failed after all tasks were tried. There is no explicit timeout on the job execution itself.
- Source inconsistency: the source's flag table says that once any task fails beyond `--max-retries` "the entire job is marked as failed"; the same page's overview says that if any tasks failed, "the job execution is marked as failed after Cloud Run has tried all of the tasks" (https://docs.cloud.google.com/run/docs/create-jobs). The resource model page also says a task exceeding its retries marks "the job as failed" (https://docs.cloud.google.com/run/docs/resource-model).
- Images: Artifact Registry is recommended; public Docker Hub and GitHub Container Registry images are cached up to one hour. Other registries need an Artifact Registry remote repository.
- The job name cannot be edited after creation. Changing any setting requires an update; unchanged settings keep their previous values.
- With `--container`, all non-container-level flags must precede container-level flags or the command fails.
- Sidecars share the network namespace and can share an in-memory volume; use startup healthchecks when containers depend on each other's startup order.
- Cloud Run is regional; the source lists Tier 1 and Tier 2 pricing regions (for example `us-central1`, `europe-west1`, `asia-northeast1`), omitted here.
- The source also shows Console, Terraform and client library forms (Go, Java, Node.js, Python, Ruby, PHP, .NET), omitted here. Known issue for built-in Cloud SQL connections: https://docs.cloud.google.com/run/docs/known-issues#built-in-cloud-sql-connections
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- Corrected from the official docs: the REST create and update bodies were `'{template: {template: {containers: [{image: "IMAGE_URL"}]}}}'` (unquoted keys, not valid JSON), and the create URL `https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs?jobId=JOB` was unquoted.
- Corrected from the official docs: the sidecar YAML had `spec.template.spec.containers`; a v1 `ExecutionSpec` has only `delayExecution`, `parallelism`, `taskCount` and `template`, so the containers belong under `spec.template.spec.template.spec.containers` (same nesting as the single-container YAML above).
- Source: https://docs.cloud.google.com/run/docs/create-jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [execute-jobs.md](./execute-jobs.md)
- [parallelism.md](./parallelism.md)
- [max-retries.md](./max-retries.md)
- [task-timeout.md](./task-timeout.md)
- [managing-jobs.md](./managing-jobs.md)
