# logging-concepts

| Name | Description | Path |
| --- | --- | --- |
| Cloud Logging overview | Collection, query, alerting, storage, routing, and categories of log data | [overview.md](./overview.md) |
| Log entry data model | LogEntry payloads, log names, and which bucket stores which entries | [log-entry-data-model.md](./log-entry-data-model.md) |
| Structured logging | jsonPayload, how structured logs are written, special JSON keys | [structured-logging.md](./structured-logging.md) |
| Choose an agent or client libraries | Decision guide for Ops Agent, stdout/stderr, and client libraries | [agent-or-library.md](./agent-or-library.md) |
| Setup: write and read logs | Ways to write and read logs, timestamp limits | [setup.md](./setup.md) |
| gcloud write and query quickstart | gcloud logging write / read, entries.list, Logs Explorer queries | [write-query-log-entries-gcloud.md](./write-query-log-entries-gcloud.md) |
| Store log entries | Log buckets: `_Required`, `_Default`, user-defined, retention, access | [store-log-entries.md](./store-log-entries.md) |
| Default resource settings | Org/folder defaults for bucket location, CMEK, and the `_Default` sink | [default-settings.md](./default-settings.md) |
| Regionality and supported regions | Log bucket locations, limitations, region list | [region-support.md](./region-support.md) |
| Access control with IAM | Logging roles, permissions, access scopes | [access-control.md](./access-control.md) |
| Correlate logs by trace | Logs Explorer parent-child correlation via the trace field | [correlate-logs.md](./correlate-logs.md) |
