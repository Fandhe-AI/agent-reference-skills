---
source: https://docs.cloud.google.com/run/docs/monitoring-overview
---

# Observability overview

Google Cloud Observability provides logging and monitoring tools for Cloud Run resources: Cloud Logging, Error Reporting, Cloud Monitoring, distributed tracing, and audit logging.

## Signature / Usage

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE" --project PROJECT-ID --limit 10
```

Snippet taken from https://docs.cloud.google.com/run/docs/logging (the source page itself has no code).

## Options / Props

| Capability | Tool | Details page |
|------------|------|--------------|
| Writing and viewing logs | Cloud Logging captures, stores, and analyzes logs | `logging.md` |
| Reporting errors | Error Reporting captures specially formatted error logs and shows them in its dashboard | `https://docs.cloud.google.com/run/docs/error-reporting` |
| Viewing metrics | Cloud Monitoring records execution metrics | `monitoring.md` |
| Distributed tracing | Identify latency sources | `https://docs.cloud.google.com/run/docs/trace` |
| Audit logging | Administrative and access activity logs | `https://docs.cloud.google.com/run/docs/audit-logging` |

## Notes

- Cloud Run functions created with the Cloud Functions v2 API: see Functions audit logging at `https://docs.cloud.google.com/functions/docs/monitoring/audit-logging`.
- Source: https://docs.cloud.google.com/run/docs/monitoring-overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [logging.md](./logging.md)
- [monitoring.md](./monitoring.md)
- [troubleshooting.md](./troubleshooting.md)
