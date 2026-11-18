---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration
---

# Ops Agent metrics configuration

The `metrics` configuration has receivers (sources such as `cpu` or `memory`), processors (`exclude_metrics`) and a `service` with pipelines. Metrics are sent to Cloud Monitoring; the agent cannot export them elsewhere.

## Signature / Usage

### Change the collection interval

Changes the `hostmetrics` collection interval from the default 60 seconds to 10 seconds. This overrides the built-in receiver because the receiver ID matches; any pipeline that uses `hostmetrics` now uses this configuration. The `iis` and `mssql` receivers (Windows) can be overridden the same way.

```yaml
metrics:
  receivers:
    hostmetrics:
      type: hostmetrics
      collection_interval: 10s
```

### Default `exclude_metrics` processor

Built-in; the empty `metrics_pattern` excludes nothing.

```yaml
processors:
  metrics_filter:
    type: exclude_metrics
    metrics_pattern: []
```

### Disable process metrics

```yaml
metrics:
  processors:
    metrics_filter:
      type: exclude_metrics
      metrics_pattern:
      - agent.googleapis.com/processes/*
```

### Turn off built-in host-metrics ingestion

Redefine the default pipeline with an empty `receivers` list and no processors.

```yaml
metrics:
  service:
    pipelines:
      default_pipeline:
        receivers: []
```

### Built-in Windows `service` configuration

```yaml
metrics:
  service:
    pipelines:
      default_pipeline:
        receivers:
        - hostmetrics
        - iis
        - mssql
        processors:
        - metrics_filter
```

### Service structure

```text
service:
  log_level: CUSTOM_LOG_LEVEL
  pipelines:
    PIPELINE_ID:
      receivers:  [...]
      processors: [...]
    PIPELINE_ID_2:
      receivers:  [...]
      processors: [...]
```

### Stop the Ops Agent before an NVIDIA driver installation (GPU VMs)

```bash
sudo systemctl stop google-cloud-ops-agent
```

## Options / Props

### Receivers

| Option | Description |
|---|---|
| `type` | Required. `hostmetrics`, `iis` (Windows only), `mssql` (Windows only) |
| `collection_interval` | Optional. Duration such as `30s` or `2m`; default `60s` |

### Processor and service options

| Field | Description |
|---|---|
| processor `type: exclude_metrics` | The only supported processor type |
| `metrics_pattern` | List of globs matching Ops Agent metric types to exclude, for example `agent.googleapis.com/cpu/*` (all agent CPU metrics), `agent.googleapis.com/cpu/utilization`, `workloads.googleapis.com/cassandra.client.request.count`, `workloads.googleapis.com/cassandra.client.*` |
| `service.log_level` | Verbosity of the metrics submodule's own logs; Ops Agent 2.6.0 and later. Default `info`; options `error`, `warn`, `info`, `debug` |
| `pipelines.PIPELINE_ID.receivers` | Required for new pipelines; order does not matter |
| `pipelines.PIPELINE_ID.processors` | Optional; order matters, each metric point runs through them in order |

### Metrics ingested by `hostmetrics`

| Group | Metrics |
|---|---|
| `cpu` | CPU load at 1, 5 and 15 minute intervals; CPU usage with labels for CPU number and CPU state; CPU usage percent with labels for CPU number and CPU state |
| `disk` | Bytes read / written, I/O time, weighted I/O time, pending operations (label for device); merged operations, operations, operation time (labels for device and direction); usage and utilization (labels for device and state) |
| `gpu` (Linux only) | GPU memory bytes used by state; maximum GPU memory bytes allocated by the process; percentage of process lifetime that one or more kernels has been running on the GPU; percentage of time since last sample the GPU has been active |
| `interface` (Linux only) | Total count of network errors; total packets sent; total bytes sent |
| `memory` | Memory usage and usage percent, with label for state (buffered, cached, free, slab, used) |
| `network` | TCP connection count, with labels for port and TCP state |
| `swap` | Swap I/O operations (label for direction); swap bytes used and percent used (labels for device and state) |
| `pagefile` (Windows only) | Current percentage of pagefile used by state |
| `processes` | Processes count (label for state); processes forked count; per-process disk read I/O, write I/O, RSS usage and VM usage (labels for process name and others) |

### Metrics ingested by Windows receivers

| Receiver | Group | Metrics |
|---|---|---|
| `iis` | `iis` | Currently open connections to IIS; network bytes transferred by IIS; connections opened to IIS; requests made to IIS |
| `mssql` | `mssql` | Currently open connections to SQL server; SQL server total transactions per second; SQL server write transactions per second |

## Notes

- Metrics ingested by `hostmetrics`: Identifiers begin with `agent.googleapis.com/GROUP`.
- GPU metrics: `hostmetrics` collects NVIDIA Management Library (NVML) metrics as `agent.googleapis.com/gpu`, only on VMs with attached GPUs and an installed GPU driver. Only Ops Agent version 2.38.0 or versions 2.41.0 or higher are compatible with GPU monitoring; do not install Ops Agent versions 2.39.0 and 2.40.0 on VMs with attached GPUs. When installing or upgrading the NVIDIA driver with local installation scripts, stop the Ops Agent service first; reboot the VM after installing or upgrading the driver.
- `exclude_metrics` and `default_pipeline` `receivers: []` stop metrics from being ingested; excluded metrics are not stored in Cloud Monitoring. Try on a disposable project first. Exclusion avoids ingestion cost; see the Metrics Management page.
- Reducing `collection_interval` allows more sensitive alerts (see "Behavior of metric-based alerting policies", https://docs.cloud.google.com/monitoring/alerts/concepts-indepth) but increases the volume of data ingested.
- The Windows built-in pipeline lists `hostmetrics`, `iis` and `mssql`; the Linux built-in pipeline lists only `hostmetrics` (see configuration.md). The `log_level: debug` example for the metrics submodule is not reproduced.
- The structure template fence uses `...` and is a fragment from the source, tagged `text`.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration.md](./configuration.md)
- [configuration-logging-service.md](./configuration-logging-service.md)
- [ops-agent.md](./ops-agent.md)
