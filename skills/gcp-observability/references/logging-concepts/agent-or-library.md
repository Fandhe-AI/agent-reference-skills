---
source: https://docs.cloud.google.com/logging/docs/agent-or-library
---

# Choose a logging agent or client libraries

You can send application logs to Cloud Logging with a logging agent or by calling client libraries from your code. Agents collect data written to `stdout`, `stderr`, known file locations, or system logging services such as `Windows Event Log`, `journald`, or `syslogd`. GKE, App Engine flexible environment, and Cloud Run functions include an integrated logging agent; on Compute Engine you can install the Ops Agent.

## Signature / Usage

When you can't use a client library or an agent, or only want to experiment, write logs with `gcloud logging write` or by sending HTTP requests to the `entries.write` endpoint of the Logging API (HTTP and gRPC; the Ops Agent and most client libraries call the gRPC API, some languages call the REST API).

Snippet taken from https://docs.cloud.google.com/logging/docs/write-query-log-entries-gcloud

```bash
gcloud logging write my-test-log "A simple entry."
```

## Options / Props

### Decision questions

| Question | Guidance |
|---|---|
| Running outside Google Cloud? | Use Bindplane (deploys and manages OpenTelemetry collectors) to route on-premises logs, or client libraries directly. Ephemeral environments such as serverless must use client libraries for direct Logging API calls. |
| Does the service write `stdout` / `stderr` to your project? | Fully managed services need no agent; use any logging framework (Go, Node.js, Python, ...). Relying on `stdout` / `stderr` means application crashes don't break log delivery. Client libraries add a Logging dependency for local testing, may need explicit buffering and retry handling, and each use creates a new connection stream to the API. |
| Logs needed in the local environment? | Use logging modules that output to `stdout` / `stderr`; some client libraries can route there. Where the service doesn't forward `stdout` / `stderr`, write them to on-disk files and configure the agent to scrape them (Ops Agent configuration). |
| Agent installation manual or automatic? | If the service doesn't allow installing agents, you must use the client libraries. |
| Already running Fluentd? | Use the Google Cloud Logging plugin for fluentd. |
| Collecting application metrics too? | On Compute Engine VMs the Ops Agent collects logs and most metrics; otherwise use the Monitoring client libraries. |
| Can you change the log format? | Logging recognizes structured logs sent to the API in the structured-logging format. Agents detect JSON by default; if your format is fixed, write JSON to `stdout` / `stderr` or configure the agent to understand your format. |

### Summary of each option

| Option | Advantages | Disadvantages |
|---|---|---|
| Cloud Logging client libraries | Route logs directly to the Cloud Logging API; some languages can output to `stdout` / `stderr` via the library. | Application crashes break sending logs to your project. |
| Ops Agent | Sends logs and metrics using Fluent Bit (logs) and the OpenTelemetry Collector (metrics); collects logs and metrics from many common third-party applications; can retain logs locally; might recover logs after crashes; under active development. | Fluent Bit supports only UTF-8 encoding; no encoding conversion. |
| `stdout` / `stderr` sent automatically | Common way to emit logs locally; any logging library; might recover logs after crashes. | Not all environments route logs to Logging automatically. |

## Notes

- Two ways to write structured logs: set specific fields in the `LogEntry` envelope (schema determined by Cloud Logging), or set `jsonPayload` (schema determined by you).
- The container runtime itself is in `docker`; the Ops Agent is covered in the Ops Agent pages of this skill.
- Source: https://docs.cloud.google.com/logging/docs/agent-or-library (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [structured-logging.md](./structured-logging.md)
- [setup.md](./setup.md)
- [overview.md](./overview.md)
