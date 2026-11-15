---
source: https://docs.cloud.google.com/run/docs/logging
---

# Logging and viewing logs

Cloud Run sends workload logs to Cloud Logging. Three log types exist: request logs (services), container logs (output written to supported locations), and system logs (platform events, log name `varlog/system`).

## Signature / Usage

### View logs

- Cloud Run console page: **Logs** tab for services, jobs, and worker pools (instances: use Logs Explorer and audit logging).
- Logs Explorer: select **Cloud Run Revision** (service), **Cloud Run Job**, **Cloud Run Worker Pool**, or **Cloud Run Instances**.
- gcloud (services only), tail (Preview, needs the `log-streaming` component):

```bash
gcloud beta run services logs tail SERVICE --project PROJECT-ID
```

```bash
gcloud run services logs read SERVICE --limit=10 --project PROJECT-ID
```

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE" --project PROJECT-ID --limit 10
```

Replace `PROJECT-ID` with your project ID (`gcloud config get-value project`).

### Write structured logs (Node.js)

```javascript

// Uncomment and populate this variable in your code:
// const project = 'The project ID of your function or Cloud Run service';

// Build structured log messages as an object.
const globalLogFields = {};

// Add log correlation to nest all log messages beneath request log in Log Viewer.
// (This only works for HTTP-based invocations where `req` is defined.)
if (typeof req !== 'undefined') {
  const traceHeader = req.header('X-Cloud-Trace-Context');
  if (traceHeader && project) {
    const [trace] = traceHeader.split('/');
    globalLogFields['logging.googleapis.com/trace'] =
      `projects/${project}/traces/${trace}`;
  }
}

// Complete a structured log entry.
const entry = Object.assign(
  {
    severity: 'NOTICE',
    message: 'This is the default display field.',
    // Log viewer accesses 'component' as 'jsonPayload.component'.
    component: 'arbitrary-property',
  },
  globalLogFields
);

// Serialize to a JSON string and output.
console.log(JSON.stringify(entry));
```

### Write structured logs (Python)

Adapted (not in the official docs): added `import json`, which the source snippet uses but never imports.

```python
import json

# Uncomment and populate this variable in your code:
# PROJECT = 'The project ID of your Cloud Run service';

# Build structured log messages as an object.
global_log_fields = {}

# Add log correlation to nest all log messages.
# This is only relevant in HTTP-based contexts, and is ignored elsewhere.
# (In particular, non-HTTP-based Cloud Functions.)
request_is_defined = "request" in globals() or "request" in locals()
if request_is_defined and request:
    trace_header = request.headers.get("X-Cloud-Trace-Context")

    if trace_header and PROJECT:
        trace = trace_header.split("/")
        global_log_fields[
            "logging.googleapis.com/trace"
        ] = f"projects/{PROJECT}/traces/{trace[0]}"

# Complete a structured log entry.
entry = dict(
    severity="NOTICE",
    message="This is the default display field.",
    # Log viewer accesses 'component' as jsonPayload.component'.
    component="arbitrary-property",
    **global_log_fields,
)

print(json.dumps(entry))
```

## Options / Props

### Where container logs are collected

| Location | Notes |
|----------|-------|
| `stdout` / `stderr` | Expected path for most developers |
| Files under `/var/log` | Collected |
| syslog (`/dev/log`) | Collected |
| Cloud Logging client libraries | Collected |

Plain text goes to `textPayload`; a single line of serialized JSON goes to `jsonPayload`. Special JSON fields (for example `severity`, `message`) are lifted to the matching `LogEntry` fields. Container logs are not auto-correlated with request logs unless you use a client library or add `logging.googleapis.com/trace` (`projects/PROJECT/traces/TRACE`, from `X-Cloud-Trace-Context`).

### Instance scaling log (`varlog/system`): `Starting new instance. Reason: REASON - DESCRIPTION`

| Reason | Description |
|--------|-------------|
| `MANUAL_OR_CUSTOMER_MIN_INSTANCE` | Customer-configured minimum instances or manual scaling |
| `AUTOSCALING` | Scaling factors (CPU utilization, request throughput) or not enough capacity |
| `DEPLOYMENT_ROLLOUT` | Traffic shifting between revisions (deployment, traffic split, deployment health check) |

### Resource types and key fields

| Resource | `resource.type` | Notable fields |
|----------|-----------------|----------------|
| Service | `cloud_run_revision` | `resource.labels.service_name`, `revision_name`, `location`, `project_id`; `labels.instanceId`; labels `run.googleapis.com/base_image_versions`, `run.googleapis.com/cloud_event_id`, `run.googleapis.com/cloud_event_source` |
| Job | `cloud_run_job` | `resource.labels.job_name`; `labels.execution_name`, `labels.task_index`, `labels.task_attempt` |
| Worker pool | `cloud_run_workerpool` | `resource.labels.workerpool_name` |
| Instance | `cloud_run_instance` | `labels.instance_name` (`instanceId` changes at each restart) |

## Notes

- Source inconsistency: this page names the worker pool logging resource `cloud_run_workerpool`, while the monitoring page names the worker pool monitored resource `cloud_run_worker_pool` (https://docs.cloud.google.com/run/docs/monitoring).
- Integrated logging does not consume the Cloud Logging API `entries.write` requests-per-minute quota. For higher volume or reliability use the Cloud Logging API directly (library or sidecar container).
- You cannot control request log volume from Cloud Run; use Cloud Logging log exclusions. Cloud Run does not use logging agents. Exceptions in logs are reported to Error Reporting.
- To read logs programmatically: log sink to Pub/Sub, Logging API client libraries, or Logging API REST endpoints.
- Adapted from the official docs: the Python sample uses `json.dumps` without an import; `import json` was added.
- The source also shows Go and Java samples (including Logback `redirectToStdout`) and Cloud Code log viewing.
- Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).
- Source: https://docs.cloud.google.com/run/docs/logging (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitoring-overview.md](./monitoring-overview.md)
- [monitoring.md](./monitoring.md)
- [troubleshooting.md](./troubleshooting.md)
