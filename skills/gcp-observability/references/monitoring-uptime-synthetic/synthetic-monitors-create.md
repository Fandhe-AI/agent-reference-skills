---
source: https://docs.cloud.google.com/monitoring/synthetic-monitors/create
---

# Synthetic monitors: concepts, function requirements and prerequisites

A synthetic monitor periodically executes a single-purpose 2nd gen Cloud Run function (built on Cloud Run) that you write in Node.js, for example with Puppeteer for web pages or Axios for APIs, or with Mocha test suites. It records execution status and latency, and an alerting policy can notify you of failures. This page covers behavior, restrictions, data collected and the setup you need before creating one.

## Signature / Usage

### Alert condition filter for a synthetic monitor (API / gcloud)

When you create the monitor by API or gcloud you must create the alerting policy yourself, monitoring `uptime_check/check_passed` for the Cloud Run resource. Replace `CHECK_ID` with the monitor's identifier from the create response.

```text
"filter": "resource.type = \"cloud_run_revision\" AND
            metric.type = \"monitoring.googleapis.com/uptime_check/check_passed\" AND
            metric.labels.check_id = \"CHECK_ID\"",
```

### Enabling and checking the setup

```bash
gcloud config set project PROJECT_ID
```

## Options / Props

### Roles and APIs

| Item | Value |
|---|---|
| Roles to view / modify monitors in the console (on the project; for App Hub use the host or management project) | Monitoring Editor (`roles/monitoring.editor`), Cloud Functions Developer (`roles/cloudfunctions.developer`) |
| APIs to enable | Cloud Monitoring, Artifact Registry, Cloud Build, Cloud Functions, Cloud Logging, Pub/Sub, Cloud Run Admin |
| Permission to enable APIs | `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`) |
| Service account | Default Compute Engine service account (name like `12345-compute@developer.gserviceaccount.com`) or one you created, granted Editor (`roles/editor`); if it lacks Cloud Trace Agent (`roles/cloudtrace.agent`) permissions, grant that role |

### Cloud Run function restrictions

| Restriction | Detail |
|---|---|
| Name | Must not contain an underscore |
| Type | Only HTTP functions |
| Generation | API deployments must specify 2nd generation; the console handles it |
| Runtime | Node.js only (see Runtime support for versions) |
| Trace and log data for outbound HTTP requests | Only with the generic template |
| Memory | Default may not suffice; set at least 2 GiB |
| Ingress | Default allows all traffic; Cloud Monitoring is granted permission to execute the function by default |

### Data collected

| Data | Detail |
|---|---|
| Success / failure time series | Over time |
| Execution duration | `uptime_check/request_latency` time series for the Cloud Run resource; function execution time is not recorded |
| Logs | Depend on the function; the Mocha template logs pass / fail and test duration, plus stack trace lines and error types |
| Outbound HTTP request traces and logs | Optional, generic template; latency stored by Cloud Trace |
| Cloud Run function metrics and logs | Executions per second, execution time, memory utilization |

## Notes

- Execution frequency: the default execution interval for uptime checks is one minute. Monitoring opens an alert and notifies after the second consecutive failure, so a 5 minute frequency can take 10 minutes before notification. Console-created monitors get a default alerting policy for two or more consecutive failures; you supply notification channels.
- The generic template collects trace and log data using the OpenTelemetry `auto-instrumentations-node` module and the `winston` logger. Because of this open source dependency the structure of the data may change, so use it only for debugging. Gemini-generated code ("Help me code") is in Public Preview.
- Console creation deploys a new function and cannot monitor an existing one; gcloud and API creation only monitor an existing function. The service account Editor role is broad (it is what the source requires); prefer the narrower Cloud Trace Agent role where only tracing is needed, and use a dedicated service account where possible.
- Do not configure a monitor to test `https://www.google.com`; modify the `url` field of the example code before deploying.
- Synthetic monitors are limited to 100 per metrics scope and cannot be created inside a VPC Service Controls perimeter; do not use them under Assured Workloads data-residency or IL4 requirements (see introduction.md).
- Google Cloud synthetic monitors run Mocha / Puppeteer scripts as Cloud Run functions; browser end-to-end testing is in the `playwright` skill. The twin contains no script bodies; templates and samples are on the "Samples for synthetic monitors" page and in the `synthetics-sdk-nodejs` repository.
- Snippet taken from https://docs.cloud.google.com/monitoring/synthetic-monitors/create (alert filter and `gcloud config set`).
- The source also shows Console steps and Terraform.
- Source: https://docs.cloud.google.com/monitoring/synthetic-monitors/create (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [synthetic-monitors-deploy.md](./synthetic-monitors-deploy.md)
- [synthetic-monitors-troubleshooting.md](./synthetic-monitors-troubleshooting.md)
- [introduction.md](./introduction.md)
