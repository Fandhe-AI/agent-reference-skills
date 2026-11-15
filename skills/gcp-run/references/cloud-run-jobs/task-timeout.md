---
source: https://docs.cloud.google.com/run/docs/configuring/task-timeout
---

# Set task timeout for jobs

By default each task runs for a maximum of 10 minutes; you can shorten it or raise it up to 168 hours (7 days). For tasks using GPUs the maximum is 12 hours (preview). There is no explicit timeout on a job execution: when all tasks are done, the execution is done.

## Signature / Usage

### Set at create or update

```bash
gcloud run jobs create JOB_NAME --image IMAGE_URL --task-timeout TIMEOUT
```

```bash
gcloud run jobs update JOB_NAME --task-timeout TIMEOUT
```

`TIMEOUT` specifies amount and unit, for example `10m5s`.

### YAML

```bash
gcloud run jobs describe JOB --format export > job.yaml
```

Adapted (not in the official docs): renamed the placeholder to `TIMEOUT_SECONDS`; `timeoutSeconds` takes an integer number of seconds, not the gcloud `10m5s` form used for `TIMEOUT` above.

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
          - image: IMAGE
          timeoutSeconds: TIMEOUT_SECONDS
```

`TIMEOUT_SECONDS` is an integer number of seconds, for example `605` for 10 minutes 5 seconds.

```bash
gcloud run jobs replace job.yaml
```

### Handle maintenance signals (Go sample from the source)

```go
func testSignals() {
    sigs := make(chan os.Signal, 1)
    signal.Notify(sigs, syscall.SIGTSTP, syscall.SIGCONT)
    go func() {
        for  {
            sig := <-sigs
            log.Printf("Got Signal: %v", sig)
        }
    }()
 }
 
```

## Options / Props

| Name | Value |
| --- | --- |
| Default timeout | 10 minutes |
| Maximum | 168 hours (7 days) |
| Maximum with GPUs | 12 hours (preview) |
| Units | integer seconds, minutes or hours; 10 min 5 s = `605` seconds |
| `SIGTSTP` | sent 10 seconds before a (non-GPU) task is live migrated; `SIGCONT` after restart |
| `SIGTERM` | sent about 10 seconds before termination (GPU preemption) |

| Role | Scope |
| --- | --- |
| Cloud Run Developer (`roles/run.developer`) | the Cloud Run job |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |

## Notes

- The timeout is the maximum time of one task attempt, not a guarantee of uninterrupted execution. With retries enabled it applies to each attempt. Google recommends enabling retries for all jobs, especially long-running ones.
- Non-GPU tasks are live migrated during maintenance; outbound VPC connections break during maintenance, so use client libraries that handle connection resets. GPU tasks are not live migrated and are terminated; expect a multi-hour GPU task to be interrupted at least once.
- About 10 seconds after `SIGTERM` is not enough for a large checkpoint: treat the handler as a best-effort flush of small state and rely on periodic checkpointing. See https://docs.cloud.google.com/run/docs/tutorials/long-running-gpu-jobs.
- Source inconsistency: the YAML example uses `image: IMAGE` while the replacement list names `IMAGE_URL`, and the placeholders `JOB_NAME` / `JOB` differ; kept verbatim.
- Corrected from the official docs: the YAML used `timeoutSeconds: TIMEOUT`, the same placeholder the gcloud step defines with the example `10m5s`; `timeoutSeconds: 10m5s` fails to parse (integer field), so the YAML placeholder is `TIMEOUT_SECONDS` (for example `605`).
- The 12-hour GPU timeout is Preview ("Pre-GA Offerings Terms").
- The source also shows Console and Terraform (`timeout`) forms, omitted here.
- Source: https://docs.cloud.google.com/run/docs/configuring/task-timeout (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-jobs.md](./create-jobs.md)
- [max-retries.md](./max-retries.md)
- [parallelism.md](./parallelism.md)
