---
source: https://docs.cloud.google.com/run/docs/configuring/parallelism
---

# Set parallelism for jobs

`parallelism` is the maximum number of tasks in a job execution that can run in parallel. By default tasks start as quickly as possible, up to a maximum that depends on how many CPUs you use. Lowering it protects backing resources (for example a database) that cannot scale to many parallel requests.

## Signature / Usage

### Set at create or update

```bash
gcloud run jobs create JOB --image IMAGE_URL --parallelism PARALLELISM
```

```bash
gcloud run jobs update JOB --parallelism PARALLELISM
```

### YAML

```bash
gcloud run jobs describe JOB --format export > job.yaml
```

```yaml
apiVersion: run.googleapis.com/v1
kind: Job
metadata:
  name: JOB
spec:
  template:
    spec:
      parallelism: PARALLELISM
      template:
        spec:
          containers:
          - image: IMAGE_URL
```

```bash
gcloud run jobs replace job.yaml
```

### View the setting

```bash
gcloud run jobs describe JOB
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--parallelism` / `spec.template.spec.parallelism` | integer | Integer between 0 and the maximum number of tasks running in parallel allowed by quota (https://docs.cloud.google.com/run/quotas), not exceeding the number of tasks. `0` unsets the value (gcloud help: "Set to 0 to unset"), so the default applies: tasks start as quickly as possible, up to the quota maximum. |

| Role | Scope |
| --- | --- |
| Cloud Run Developer (`roles/run.developer`) | the Cloud Run job |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |

## Notes

- Source inconsistency: this page says the default maximum "varies depending on how many CPUs you are using" and the quotas page says it depends on region, CPU and memory (https://docs.cloud.google.com/run/quotas), while the resource model page says tasks run in parallel "up to a maximum of 100" by default (https://docs.cloud.google.com/run/docs/resource-model).
- In the console choose "Run as many tasks concurrently as possible" or limit the number of concurrent tasks.
- The source also shows Console and Terraform (`task_count` / `parallelism` in `google_cloud_run_v2_job`) forms, omitted here.
- Source: https://docs.cloud.google.com/run/docs/configuring/parallelism (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-jobs.md](./create-jobs.md)
- [max-retries.md](./max-retries.md)
- [task-timeout.md](./task-timeout.md)
