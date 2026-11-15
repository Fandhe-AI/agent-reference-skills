---
source: https://docs.cloud.google.com/run/docs/managing/jobs
---

# Manage Cloud Run jobs

List jobs, view job details, and delete jobs across their lifecycle.

## Signature / Usage

### List jobs

```bash
gcloud run jobs list
```

```bash
gcloud run jobs list --region REGION
```

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X GET \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs
```

### View job details

```bash
gcloud run jobs describe  JOB
```

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X GET \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB
```

### Delete a job

```bash
gcloud run jobs delete JOB
```

If prompted to confirm, respond `y`.

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X DELETE \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB
```

## Options / Props

| Item | Value |
| --- | --- |
| Required role | Cloud Run Developer (`roles/run.developer`) on the Cloud Run job |
| Console detail tabs | History (tasks of the execution), Logs, Metrics, YAML |
| `ACCESS_TOKEN` | token for an account with the IAM permissions (`gcloud auth print-access-token`, or the metadata server inside Cloud Run) |

## Notes

- Deleting a job terminates all job executions in progress and all running container instances. It is destructive; try it on a disposable job first. Logs stay in Cloud Logging for the retention period and monitoring data stays in Cloud Monitoring.
- The source also shows Console and client library forms, omitted here. More filters: https://docs.cloud.google.com/sdk/gcloud/reference/beta/run/jobs/list
- Source: https://docs.cloud.google.com/run/docs/managing/jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-jobs.md](./create-jobs.md)
- [managing-job-executions.md](./managing-job-executions.md)
- [execute-jobs.md](./execute-jobs.md)
