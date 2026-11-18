---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration
---

# Ops Agent configuration model

The Ops Agent has a built-in default configuration that cannot be modified directly. You create a user configuration file of overrides that is merged with the built-in configuration when the agent restarts. The building blocks are `receivers`, `processors` and `service` (pipelines).

## Signature / Usage

### Built-in configuration: Linux

By default the agent collects file-based `syslog` logs and host metrics.

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

### Built-in configuration: Windows

By default the agent collects Windows event logs from the `System`, `Application` and `Security` channels, plus host metrics, IIS metrics and SQL Server metrics.

```yaml
logging:
  receivers:
    windows_event_log:
      type: windows_event_log
      channels: [System, Application, Security]
  service:
    pipelines:
      default_pipeline:
        receivers: [windows_event_log]
metrics:
  receivers:
    hostmetrics:
      type: hostmetrics
      collection_interval: 60s
    iis:
      type: iis
      collection_interval: 60s
    mssql:
      type: mssql
      collection_interval: 60s
  processors:
    metrics_filter:
      type: exclude_metrics
      metrics_pattern: []
  service:
    pipelines:
      default_pipeline:
        receivers: [hostmetrics, iis, mssql]
        processors: [metrics_filter]
```

### Override a built-in receiver

Redefine a receiver, processor or pipeline with the same identifier in the user configuration file. This changes the host-metrics collection interval to 30 seconds:

```yaml
metrics:
  receivers:
    hostmetrics:
      type: hostmetrics
      collection_interval: 30s
```

### Disable collection of Fluent Bit self logs

Starting with Ops Agent version 2.44.0, add a `global` section and set `default_self_log_file_collection` to `false`.

```text
logging:  ...
metrics:  ...
global:
  default_self_log_file_collection: false
```

## Options / Props

### Configuration files

| OS | User configuration file |
|---|---|
| Linux | `/etc/google-cloud-ops-agent/config.yaml` |
| Windows | `C:\Program Files\Google\Cloud Operations\Ops Agent\config\config.yaml` |

### Building blocks

| Element | Description |
|---|---|
| `receivers` | What is collected by the agent |
| `processors` | How the agent can modify the collected information |
| `service` | Links receivers and processors into data flows called pipelines; contains `pipelines`, which can contain multiple pipelines |

### Common configuration tasks

| Goal | Where |
|---|---|
| Turn off built-in logging or host-metrics ingestion | Example `service` configurations (see configuration-logging-service.md and configuration-metrics.md) |
| Customize collected log file paths | Logging receivers (configuration-logging-receivers.md) |
| Customize structured log format (JSON or regex parsing) | Logging processors (configuration-logging-processors.md) |
| Change the metrics sampling rate | Metrics receivers (configuration-metrics.md) |
| Choose which metric groups to enable | Metrics processors (configuration-metrics.md) |
| Customize log rotation (version 2.31.0 and later) | https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/rotate-logs#configure-log-rotation |
| Third-party application metrics and logs | https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party |
| Custom metrics from Prometheus | https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/prometheus |
| Custom metrics and traces over OTLP | https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/otlp |

## Notes

- Configuration changes require restarting the agent (see installation.md). User configuration is merged with the built-in configuration at restart.
- The Ops Agent sends logs to Cloud Logging and metrics to Cloud Monitoring only; it cannot be configured to export to other services. To export logs, configure Cloud Logging routing ("Route logs to supported destinations", https://docs.cloud.google.com/logging/docs/export/configure_export_v2).
- Disabling self-log collection (`default_self_log_file_collection: false`) stops the agent's Fluent Bit self logs from being sent to Cloud Logging; by default they are sent and the added volume can increase Cloud Logging costs. The `logging:  ...` fence above is a fragment from the source, not complete YAML.
- Ops Agent configuration files can hold receiver credentials (for example third-party integration passwords) in clear text; restrict file permissions on `config.yaml`.
- The source's log-rotation section only points to the "Configure log rotation in the Ops Agent" page.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration-logging-receivers.md](./configuration-logging-receivers.md)
- [configuration-logging-processors.md](./configuration-logging-processors.md)
- [configuration-logging-modify-fields.md](./configuration-logging-modify-fields.md)
- [configuration-logging-service.md](./configuration-logging-service.md)
- [configuration-metrics.md](./configuration-metrics.md)
- [installation.md](./installation.md)
