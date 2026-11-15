---
source: https://docs.cloud.google.com/run/docs/managing/job-executions
---

# Manage Cloud Run job executions

View status details for job executions, list them, and delete unneeded executions. To execute, cancel or override configuration, see execute-jobs.

## Signature / Usage

### List executions

```bash
gcloud run jobs executions list
```

```bash
gcloud run jobs executions list --job JOB
```

Get the name of the latest execution of a job:

```bash
gcloud run jobs describe JOB --format="value(status.latestCreatedExecution.name)"
```

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X GET \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB/executions
```

### View execution details

```bash
gcloud run jobs executions describe EXECUTION_NAME
```

```bash
gcloud run jobs executions describe EXECUTION_NAME --format yaml
```

```bash
gcloud run jobs executions describe-latest --job=JOB
```

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X GET \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB/executions/EXECUTION_NAME
```

### Delete an execution

```bash
gcloud run jobs executions delete EXECUTION_NAME
```

If prompted to confirm, respond `y`.

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X DELETE \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB/executions/EXECUTION_NAME
```

## Options / Props

| Item | Value |
| --- | --- |
| Required role | Cloud Run Developer (`roles/run.developer`) on the Cloud Run job |
| Execution details retention | most recent 1,000 executions of a job; older details are removed (logs and metrics stay per Cloud Logging / Monitoring retention) |
| Console execution tabs | Tasks, Containers, Volumes, Networking, Security, YAML |

## Notes

- You can delete an execution even while it runs; deleting stops it from continuing and removes it from the list, while cancel keeps it listed. Deleted executions keep their logs in Cloud Logging for the retention period. Delete is destructive; try it on a disposable execution first.
- The source also shows Console and client library forms, omitted here.
- Source inconsistency: this page keeps execution details for "the most recent 1,000 executions of a job"; https://docs.cloud.google.com/run/docs/execute/jobs adds "along with any executions that occurred within the last seven days".
- Source: https://docs.cloud.google.com/run/docs/managing/job-executions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [execute-jobs.md](./execute-jobs.md)
- [managing-jobs.md](./managing-jobs.md)
