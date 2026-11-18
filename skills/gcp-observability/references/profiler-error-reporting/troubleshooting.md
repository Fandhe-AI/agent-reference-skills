---
source: https://docs.cloud.google.com/error-reporting/docs/troubleshooting
---

# Troubleshoot Error Reporting

Diagnose why expected error events don't appear. Error Reporting captures errors through direct calls to the Error Reporting API and through automatic analysis of log entries ingested by Cloud Logging.

## Signature / Usage

### Verify you can send an error event through the API

Enable the Error Reporting API (`clouderrorreporting.googleapis.com`), then run in Cloud Shell:

```bash
gcloud beta error-reporting events report --service Manual --service-version test1 \
  --message "java.lang.TestError: msg
    at com.example.TestClass.test(TestClass.java:51)
    at com.example.AnotherClass(AnotherClass.java:25)"
```

The **Error Reporting** page should show an error titled `TestError: msg`, and the Logs Explorer should show a log entry containing `TestError`, created automatically in this log:

Adapted (not in the official docs): added the missing `/logs/` segment to the log name.

```text
projects/PROJECT_ID/logs/clouderrorreporting.googleapis.com%2Freported_errors
```

### List sinks to check where log entries are stored

```bash
gcloud logging sinks list
```

Example output (source project `my-team-project`):

```text
NAME               DESTINATION                                                                                                FILTER
_Default           logging.googleapis.com/projects/my-team-project/locations/global/buckets/_Default                          NOT LOG_ID("cloudaudit.googleapis.com/activity") AND NOT LOG_ID("externalaudit.googleapis.com/activity") AND NOT LOG_ID("cloudaudit.googleapis.com/system_event") AND NOT LOG_ID("externalaudit.googleapis.com/system_event") AND NOT LOG_ID("cloudaudit.googleapis.com/access_transparency") AND NOT LOG_ID("externalaudit.googleapis.com/access_transparency")
_Required          logging.googleapis.com/projects/my-team-project/locations/global/buckets/_Required                         LOG_ID("cloudaudit.googleapis.com/activity") OR LOG_ID("externalaudit.googleapis.com/activity") OR LOG_ID("cloudaudit.googleapis.com/system_event") OR LOG_ID("externalaudit.googleapis.com/system_event") OR LOG_ID("cloudaudit.googleapis.com/access_transparency") OR LOG_ID("externalaudit.googleapis.com/access_transparency")
logs-from-samples  logging.googleapis.com/projects/my-team-project/locations/global/buckets/sample-bucket                     (empty filter)
regional_logs      logging.googleapis.com/projects/my-team-project/locations/europe-west1/buckets/bucket_for_regional_logs    (empty filter)
test-logs          logging.googleapis.com/projects/team-b-project/locations/global/buckets/test-bucket                        (empty filter)
```

### Verify you can write a log entry that generates an error event

```bash
gcloud logging write --payload-type=json test-errors-log \
  '{"serviceContext":
    {"service": "manual-testing"},
    "message": "Test Error\n at /test.js:42:42",
    "context": {"httpRequest":
      {"url": "/test","method": "GET","responseStatusCode": 500}}}'
```

## Options / Props

### Symptoms and fixes

| Symptom | Cause / Fix |
|---|---|
| API error events aren't shown | Ensure the Error Reporting API is enabled; run the `report` test above; verify the app sends to the `report` endpoint with a `ReportedErrorEvent` body and that log entries are created |
| Error events are shown but the Error Reporting API is disabled | Expected: events are also inferred when Error Reporting can analyze your log data |
| Events aren't inferred from log data | Verify the analysis conditions (below); run the `gcloud logging write` test and search the Logs Explorer for `Test Error`; if the entry isn't linked to an error group, wait about a minute and refresh; verify your app's entries use the expected format |
| A log entry contains a stack trace but no error event is created | Ensure the `jsonPayload` has no `stack_trace` or `exception` field (when present, `message` isn't evaluated); ensure the stack trace is in a supported programming-language format |

### Conditions for analyzing log entries

| Condition |
|---|
| Assured Workloads are disabled |
| CMEK is disabled on all log buckets that store the log entry |
| The log bucket is in the project where the entries originated, or entries were routed to a project that stored them in a log bucket it owns |

## Notes

- Conditions for analyzing log entries: In the sink example, Error Reporting can analyze entries routed by `_Default`, `_Required` and `logs-from-samples` (buckets in the same project `my-team-project`), but not entries routed by the `test-logs` sink, whose destination is the bucket `test-bucket` in a different project (`team-b-project`). The source does not classify the `regional_logs` sink.
- Required to enable the API: `serviceusage.services.enable` (Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- The `report` call and the `gcloud logging write` test create real log entries (and possible Cloud Logging ingestion costs); use a test service name as shown. Do not put credentials or personal data in test messages.
- `gcloud beta error-reporting events report` requires `--service` and exactly one of `--message` or `--message-file`; `--service-version` is optional (gcloud 593.0.0 help). The `error-reporting` group is beta-only.
- Corrected from the official docs: the log name was written `projects/PROJECT_ID/clouderrorreporting.googleapis.com%2Freported_errors`, without the `/logs/` segment; the Logging API Discovery document defines `LogEntry.logName` as "projects/[PROJECT_ID]/logs/[LOG_ID]" with `[LOG_ID]` URL-encoded, so the name is `projects/PROJECT_ID/logs/clouderrorreporting.googleapis.com%2Freported_errors`.
- Corrected from the official docs: the source says Error Reporting can't analyze "the log entries stored in the log bucket named `test-logs`"; in the listed output `test-logs` is the sink name (column NAME) and its destination bucket is `projects/team-b-project/locations/global/buckets/test-bucket`.
- Source: https://docs.cloud.google.com/error-reporting/docs/troubleshooting (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [formatting-error-messages.md](./formatting-error-messages.md)
- [grouping-errors.md](./grouping-errors.md)
- [setup.md](./setup.md)
