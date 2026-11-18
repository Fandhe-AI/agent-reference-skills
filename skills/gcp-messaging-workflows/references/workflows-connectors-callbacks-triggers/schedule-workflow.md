---
source: https://docs.cloud.google.com/workflows/docs/schedule-workflow
---

# Schedule a workflow with Cloud Scheduler

Cloud Scheduler runs a workflow on a schedule (for example every Monday at 9 AM or every 15 minutes) by sending an authenticated HTTP request to the Workflow Executions API. The job authenticates with a service account that holds the Workflows Invoker role. Cloud Scheduler itself is covered by `gcp-run`.

## Signature / Usage

### Enable the API and create the service account

```bash
gcloud services enable cloudscheduler.googleapis.com
```

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

### Grant the invoker role

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
  --role roles/workflows.invoker
```

### Create the job

```bash
gcloud scheduler jobs create http JOB_NAME \
    --schedule="FREQUENCY" \
    --uri="https://workflowexecutions.googleapis.com/v1/projects/PROJECT_ID/locations/REGION_NAME/workflows/WORKFLOW_NAME/executions" \
    --message-body="{\"argument\": \"DOUBLE_ESCAPED_JSON_STRING\"}" \
    --time-zone="TIME_ZONE" \
    --oauth-service-account-email="SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com"
```

### List and delete jobs

```bash
gcloud scheduler jobs list
```

```bash
gcloud scheduler jobs delete JOB_NAME
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `SERVICE_ACCOUNT_NAME` | 6 to 30 characters; lowercase alphanumeric characters and dashes; cannot be changed after creation. |
| `JOB_NAME` | Name of the job; must be unique across the jobs in the same region. |
| `FREQUENCY` | unix-cron interval, for example `*/5 * * * *` for every 5 minutes. |
| `REGION_NAME` | Region of the workflow, such as `us-central1`. |
| `WORKFLOW_NAME` | Workflow to execute. |
| `DOUBLE_ESCAPED_JSON_STRING` | JSON encoding of the arguments; inner double quotes escaped with backslashes, for example `--message-body="{\"argument\": \"{\\\"foo\\\": \\\"bar\\\"}\"}"`. |
| `TIME_ZONE` | Time zone used to interpret the schedule, for example `America/New_York`. |

### Console call log levels

| Level | Behavior |
|-------|----------|
| Not specified | Default. An execution log level takes precedence over the workflow log level unless the execution level is not specified. |
| Errors only | Logs all caught exceptions, or calls stopped by an exception. |
| All calls | Logs all calls to subworkflows or library functions and their results. |
| No logs | No call logging. |

## Notes

- The principal that runs the Cloud Scheduler commands needs a role that lets it impersonate (act as) the service account.
- `gcloud projects add-iam-policy-binding` grants `roles/workflows.invoker` on the whole project, so the account can run every workflow in it; the source shows no resource-level grant. Use a dedicated service account for the job only.
- `gcloud scheduler jobs create http` in the 593.0.0 help takes `--location` (location of the job); set it, or the default location, when it is not configured. The source does not show it.
- Call logging must be configured from the Workflows page in the console. Arguments in the console field are JSON, default `{}`.
- Each execution incurs costs (https://cloud.google.com/workflows/pricing). To stop them delete the job. To avoid duplicate executions when Cloud Scheduler retries a job, see https://docs.cloud.google.com/scheduler/docs/configuring/deduplicate-job-requests#deduplicate-google-api-targets.
- Deleting a job is irreversible; try on a disposable project first. Console updates or deletes go through the workflow's **Edit** page.
- Source: https://docs.cloud.google.com/workflows/docs/schedule-workflow (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [trigger-workflow-eventarc.md](./trigger-workflow-eventarc.md)
- [authenticate-from-workflow.md](./authenticate-from-workflow.md)
