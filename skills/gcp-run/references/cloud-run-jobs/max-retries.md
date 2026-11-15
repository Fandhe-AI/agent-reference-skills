---
source: https://docs.cloud.google.com/run/docs/configuring/max-retries
---

# Set maximum retries for jobs

The maximum retries setting is the number of times a task may restart after failure before being failed permanently. It applies per task, not per job. With 0, tasks run once and are not retried.

## Signature / Usage

### Set at create or update

```bash
gcloud run jobs create JOB --image IMAGE_URL --max-retries RETRY
```

```bash
gcloud run jobs update JOB --max-retries RETRY
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
      template:
        spec:
          containers:
          - image: IMAGE_URL
          maxRetries: RETRY
```

```bash
gcloud run jobs replace job.yaml
```

### View the setting

```bash
gcloud run jobs describe JOB
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--max-retries` / `maxRetries` | integer 0 to 10 | 3 | Retries per failed task. |

| Role | Scope |
| --- | --- |
| Cloud Run Developer (`roles/run.developer`) | the Cloud Run job |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |

## Notes

- The source also shows Console and Terraform (`max_retries`) forms, omitted here.
- Source: https://docs.cloud.google.com/run/docs/configuring/max-retries (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-jobs.md](./create-jobs.md)
- [parallelism.md](./parallelism.md)
- [task-timeout.md](./task-timeout.md)
