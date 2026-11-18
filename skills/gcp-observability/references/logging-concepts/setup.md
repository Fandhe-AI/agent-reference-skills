---
source: https://docs.cloud.google.com/logging/docs/setup
---

# Write and read logs: setup options

Many programming languages have standard log-writing interfaces that you can reconfigure to use Logging. The source recommends instrumenting applications with an open-source, vendor-neutral framework such as OpenTelemetry instead of vendor- and product-specific APIs or client libraries.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/logging/docs/write-query-log-entries-gcloud

```bash
gcloud logging write my-test-log "A simple entry."
```

### Ways to write logs

- Write logs to existing files such as `syslog` on a Compute Engine VM and use the Ops Agent to send them.
- Configure a standard logging package: any language via fluentd; C# (ASP.NET or the API); Java (Logback and `java.util.logging`); Go (standard logging); Node.js (Winston and Bunyan); PHP (PSR-3 logger); Python (standard logging facility); Ruby (Google Cloud Observability gem).
- Call the Logging API with the client libraries, or call the REST endpoint directly.
- Use the gcloud CLI (`gcloud logging`).

### Ways to read logs

- Logs Explorer page of the Google Cloud console.
- The Logging API through the client libraries, or the REST endpoints directly.
- The gcloud CLI (`gcloud logging`).

## Notes

- Incoming log entries with timestamps that are more than the logs retention period in the past, or more than 24 hours in the future, are discarded.
- To correlate logs and traces, include trace data in log entries (see "Integrate with Cloud Logging" in the Cloud Trace docs).
- For agentic applications, some open-source frameworks can collect prompts and responses or pass context for tracing calls to remote Google Cloud MCP servers.
- Source: https://docs.cloud.google.com/logging/docs/setup (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [agent-or-library.md](./agent-or-library.md)
- [structured-logging.md](./structured-logging.md)
- [correlate-logs.md](./correlate-logs.md)
