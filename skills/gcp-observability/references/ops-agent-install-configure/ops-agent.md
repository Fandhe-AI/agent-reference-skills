---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent
---

# Ops Agent overview

The Ops Agent is the primary agent for collecting telemetry from Compute Engine instances. It combines logs, metrics and traces in one process, using Fluent Bit for logs and the OpenTelemetry Collector for metrics and traces. It sends logs to Cloud Logging and metrics to Cloud Monitoring.

## Signature / Usage

### Default (built-in) configuration on Linux

By default the agent collects file-based `syslog` logs and host metrics with no configuration.

```yaml
logging:
  receivers:
    syslog:
      type: files
      include_paths:
      - /var/log/messages
      - /var/log/syslog
  service:
    pipelines:
      default_pipeline:
        receivers: [syslog]
metrics:
  receivers:
    hostmetrics:
      type: hostmetrics
      collection_interval: 60s
  processors:
    metrics_filter:
      type: exclude_metrics
      metrics_pattern: []
  service:
    pipelines:
      default_pipeline:
        receivers: [hostmetrics]
        processors: [metrics_filter]
```

## Options / Props

### Features

| Area | Features |
|---|---|
| General | Single download and installation / upgrade process; simple, unified, YAML-based configuration; support for standard Linux and Windows distros; proxy support |
| Logging | High throughput using multi-core architecture; efficient memory / CPU management; sources: standard system logs (`/var/log/syslog` and `/var/log/messages` on Linux, Windows Event Log) with no configuration, file-based logs with customizable paths and refresh interval, journald / systemd logs, logs over TCP, logs over Forward protocol (Fluent Bit and Fluentd); processing: `parse_json`, `parse_regex`, modify fields (remove / rename / set), exclude logs by labels and regular expressions, concatenate multiline language exceptions from Java, Python and Golang; curated third-party application log integrations |
| Monitoring | System metrics with no configuration: `cpu`, `disk`, `iis` (Windows only), `interface` (Linux only), `gpu` (Linux only), `memory`, `mssql` (Windows only), `pagefile` (Windows only), `swap`, `network`, `processes`, agent self metrics; curated third-party application metric integrations with sample dashboards and alert policies; Prometheus metrics from applications on Compute Engine; OTLP metrics and traces from OpenTelemetry SDK-instrumented applications; NVIDIA Data Center GPU Manager (DCGM) metrics |
| Trace | OTLP traces from applications instrumented with OpenTelemetry SDKs |

### Linux operating systems

| Family | Images |
|---|---|
| Rocky Linux | 8, 9, 10 |
| RHEL 8 | rhel-8, rhel-8-6-sap-ha, rhel-8-8-sap-ha, rhel-8-10-sap-ha |
| RHEL 9 / 10 | rhel-9 / rhel-10 |
| CentOS Stream | 10 |
| Debian | 12 (Bookworm), 13 (Trixie) |
| Ubuntu 22.04 LTS (Jammy Jellyfish) | ubuntu-2204-lts, ubuntu-minimal-2204-lts |
| Ubuntu 24.04 LTS (Noble Numbat) | ubuntu-2404-lts-amd64, ubuntu-minimal-2404-lts-amd64 |
| Ubuntu 26.04 LTS (Resolute Raccoon) | ubuntu-2604-lts-amd64, ubuntu-minimal-2604-lts-amd64 |
| SLES 12 | sles-12, sles-12-sp5-sap |
| SLES 15 | sles-15, sles-15-sp3-sap, sles-15-sp4-sap, sles-15-sp5-sap, sles-15-sp6-sap |

### Compute Engine Arm VMs (C4A and Tau T2A)

| OS image | Ops Agent version |
|---|---|
| Debian 12 (Bookworm) | 2.44.0 |
| Debian 13 (Trixie) | 2.61.0 |
| Ubuntu 22.04 LTS (Jammy Jellyfish) | 2.42.0 |
| Ubuntu 24.04 LTS (Noble Numbat) | 2.47.0 |
| Ubuntu 26.04 LTS (Resolute Raccoon) | 2.70.0 |
| RHEL 9 | 2.40.0 |
| RHEL 10 | 2.64.0 |
| Rocky Linux 8 | 2.51.0 |
| Rocky Linux 9 | 2.40.0 |
| Rocky Linux 10 | 2.64.0 |
| CentOS Stream 10 | 2.64.0 |
| SLES 15 | 2.43.0 |

### Windows operating systems

| Family | Images |
|---|---|
| Windows Server | windows-2016, windows-2019, windows-2022, windows-2025 |
| Windows Server Core | windows-2016-core, windows-2019-core, windows-20h2-core, windows-2022-core, windows-2025-core |

### Network access and ports

| Purpose | Required |
|---|---|
| Installing the agent | `packages.cloud.google.com` (Google Cloud package repository), `dl.google.com` (Google downloads subdomain) |
| Running the agent | `oauth2.googleapis.com` (OAuth2 token server), `monitoring.googleapis.com`, `logging.googleapis.com` |
| Ports inside the VM (need not be open externally) | 20201, 20202 |

## Notes

- Supported VMs are Compute Engine instances. The Ops Agent is not supported on Amazon EC2 instances or on-premises machines. For Bare Metal Solution servers see "Set up Ops Agent for Bare Metal Solution" at https://docs.cloud.google.com/bare-metal/docs/set-up-ops-agent-for-bms.
- To use Cloud Logging on VMs with Container-Optimized OS, follow "Using Cloud Logging with Container-Optimized OS" (https://docs.cloud.google.com/container-optimized-os/docs/how-to/logging) instead.
- `n1-standard-1` VMs are too small to run Windows and the Ops Agent; use a larger VM.
- Earlier agent versions may require access to `www.googleapis.com` (`https://www.googleapis.com/oauth2/v3/token`); upgrade to the latest version.
- Some metrics are only available on Linux VMs; see https://docs.cloud.google.com/monitoring/api/metrics_opsagent. The Metrics Management page (https://docs.cloud.google.com/monitoring/docs/metrics-management) reports ingestion volumes, label cardinality, reads, use in alerting policies and dashboards, and write errors, and can exclude unneeded metrics to avoid their ingestion cost.
- Unsupported managed environments (do not install or configure the Ops Agent manually): App Engine standard (built-in monitoring), App Engine flexible environment (pre-installed agents), Dataflow (pre-installed legacy monitoring agents), Managed Service for Apache Spark instances before image version 2.2 (pre-installed legacy monitoring agents; the Ops Agent can be installed on image version 2.2 and later to collect syslog logs and host metrics), GKE node instances (GKE collects logs and metrics by default; see `gcp-gke`), and Google Distributed Cloud instances (integrated logging and monitoring).
- The agent is supported according to the support time horizons policy (https://docs.cloud.google.com/stackdriver/docs/support-info/telemetry-agents). Collected metrics, logs and traces may be billed; see https://cloud.google.com/products/observability/pricing. Tracing via OTLP requires configuring the agent to collect traces (https://docs.cloud.google.com/trace/docs/otlp).
- Compute Engine VMs the agent runs on are covered by `gcp-compute`.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration (built-in Linux configuration).
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: this page lists `interface` metrics without an OS restriction, while the Ops Agent configuration page (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration) marks the `interface` group of `hostmetrics` as Linux only; the feature table follows the configuration page.

## Related

- [installation.md](./installation.md)
- [configuration.md](./configuration.md)
- [transition.md](./transition.md)
- [legacy-agents.md](./legacy-agents.md)
