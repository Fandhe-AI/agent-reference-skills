---
source: https://docs.cloud.google.com/scheduler/docs/troubleshooting
---

# Troubleshoot Cloud Scheduler

Cloud Scheduler logs the start and end of each job execution. By default a job that gets no acknowledgment from its target is considered failed and retried with the configured exponential backoff.

## Signature / Usage

### Find VPC Service Controls violations (Logs Explorer query)

```text
severity="ERROR" AND protoPayload.status.details.violations.type="VPC_SERVICE_CONTROLS"
```

### Find when the API was disabled (audit logs)

```text
resource.type="audited_resource" AND
protoPayload.serviceName="cloudscheduler.googleapis.com" AND
operation.producer="serviceusage.googleapis.com" AND
protoPayload.authorizationInfo.permission="serviceusage.services.disable"
```

## Options / Props

### Error codes in execution logs

| Code | Meaning and action |
|---|---|
| `URL_ERROR-ERROR_AUTHENTICATION` | HTTP `401` or `407`: request lacks a valid token. Check the job's auth settings; API key header must be `x-api-key` or `X-Goog-Api-Key`, not `api_key`. |
| `URL_ERROR-ERROR_DNS` | Hostname could not be resolved (may show `Original HTTP response code number = 0`). Check the hostname; for private endpoints check support and ingress settings. |
| `URL_ERROR-ERROR_NOT_FOUND` | HTTP `404`. Check the target URL and resource. |
| `URL_ERROR-ERROR_OTHER` | Generic HTTP `4xx`; check the log's original code. For `403` see permission errors below. |
| `URL_UNREACHABLE-UNREACHABLE_5xx` | Target returned `5xx` or `429`, possibly transient; check target logs. |
| `URL_UNREACHABLE-UNREACHABLE_CONNECTION_RESET` | Connection reset by the peer; check the external server. |
| `URL_UNREACHABLE-UNREACHABLE_ERROR` | Network error; check the URL and firewall rules. |
| `TARGET_TYPE_NOT_PERMITTED_FOR_VPC` | Creating or updating a job with an unsupported target while Cloud Scheduler is a restricted service in a VPC Service Controls perimeter. |
| `DEADLINE_EXCEEDED` | Attempt exceeded `attemptDeadline`; retried per retry policy. |

### Permission error (`"debugInfo":"URL_ERROR-ERROR_OTHER. Original HTTP response code number = 403"`) checks

- Service agent has `roles/cloudscheduler.serviceAgent` (manual grant only if the API was enabled before March 19, 2019 or the role was removed).
- The job's service account can invoke the target (for example `roles/run.invoker` for Cloud Run and Cloud Run functions); non-Google targets must verify the token manually.
- VPC Service Controls violations (messages like `Request is prohibited by organization's policy` or `Request violates VPC Service Controls`).
- Private endpoints: only supported private endpoints (Cloud Run, Cloud Run functions, Google Cloud APIs within a VPC Service Controls perimeter) can be invoked; check target ingress settings.

### Execution issues

| Symptom | Cause and fix |
|---|---|
| Job fails but permissions and reachability are fine | Downstream issue: invoke the service directly, read its logs; for HTTP `504` on operations over 30 minutes check whether the target succeeded, and deduplicate retries. |
| Job that worked stops executing | Cloud Scheduler API disabled; re-enable it. |
| Subsequent executions not starting | A previous run is still running or waiting for a response; compare `AttemptStarted` and `AttemptFinished` log entries and check the target's timeout. |
| Irregular execution with a non-UTC zone | Expected with daylight saving time; use UTC or a zone without DST. |

## Notes

- Handlers must be idempotent; only one instance of a job should run at a time but duplicates are possible in rare cases.
- Snippets are Logs Explorer filter expressions (shown in a `bash` fence in the source, `text` here), not shell commands.
- Source: https://docs.cloud.google.com/scheduler/docs/troubleshooting (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [http-target-auth.md](./http-target-auth.md)
- [retry-jobs.md](./retry-jobs.md)
- [cron-job-schedules.md](./cron-job-schedules.md)
