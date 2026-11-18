---
source: https://docs.cloud.google.com/trace/docs/setup
---

# Instrument for Cloud Trace

Overview of instrumentation approaches, required APIs, IAM roles and authentication for sending trace data to Cloud Trace. Some configurations and Google Cloud services capture trace data automatically, so you might not need to instrument.

## Signature / Usage

### Access scope for custom scopes (GKE)

Verify the Cloud Trace API access scope; with a custom `--scopes` the scope must include `trace.append`.

```text
gcloud container clusters create example-cluster-name --scopes=https://www.googleapis.com/auth/trace.append
```

### ADC outside Google Cloud

```bash
gcloud auth application-default login
```

```bash
export GOOGLE_APPLICATION_CREDENTIALS=path-to-your-service-accounts-private-key
```

## Options / Props

### Instrumentation approaches

| Approach | Note |
|---|---|
| OpenTelemetry + OTLP exporter to a collector, collector to the Telemetry (OTLP) API | Recommended |
| OpenTelemetry + OTLP exporter directly to the Telemetry API | |
| Ops Agent with the OTLP receiver (Compute Engine) | Collects traces and metrics; logs are not collected by OTLP |
| Call the Telemetry API or Cloud Trace API directly | |
| Spring Boot forwarding via Spring Cloud for Google Cloud | |
| Cloud Trace client libraries or Cloud Trace exporter for OpenTelemetry | |

### APIs and roles

| Item | Value |
|---|---|
| APIs | Telemetry API (`telemetry.googleapis.com`) and Cloud Trace API (`cloudtrace.googleapis.com`); enabled by default in projects, but organization constraints may disable them |
| Enable APIs permission | `serviceusage.services.enable` (Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`) |
| View trace data in the console | Cloud Trace User `roles/cloudtrace.user` |
| Write via the Cloud Trace API | Cloud Trace Agent `roles/cloudtrace.agent` |
| Write via the Telemetry API | Cloud Telemetry Writer `roles/telemetry.writer` |

### Default paths of the ADC file

| OS | Path |
|---|---|
| Windows | `%APPDATA%/gcloud/application_default_credentials.json` |
| Linux | `$HOME/.config/gcloud/application_default_credentials.json` |

## Notes

- You cannot force spans to be sampled: each component decides independently. Setting the `sampled` flag in the trace header to `true` is only a hint to children; in OpenTelemetry use the `ParentBased` sampler to respect the parent's flag.
- Exemplars link metric measurements to traces; system-generated exemplars can appear on dashboard charts that show SQL results for trace data.
- On Google Cloud, Compute Engine, GKE, App Engine (flexible and standard) and Cloud Run default access scopes include the Cloud Trace API scope. With GKE Autopilot or Workload Identity Federation for GKE, configure the application to use Workload Identity Federation for GKE.
- Outside Google Cloud the service account must hold `roles/cloudtrace.agent`. A service account key file is a long-lived secret: keep it out of source control and restrict file permissions; prefer `gcloud auth application-default login` for local use. The source also shows Windows and PowerShell forms of the environment variable.
- Libraries create spans at RPC boundaries automatically; multi-threaded applications must propagate context across threads.
- Source: https://docs.cloud.google.com/trace/docs/setup (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [trace-sampling.md](./trace-sampling.md)
- [overview.md](./overview.md)
