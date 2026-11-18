---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration
---

# Ops Agent logging service and pipelines

The logging `service` section sets the verbosity of the Ops Agent's own logs and links logging receivers and processors into pipelines.

## Signature / Usage

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

### Turn off built-in log ingestion

Redefine the default pipeline with an empty `receivers` list and no processors. This does not stop the agent's logging subcomponent, because it must be able to collect logs for the monitoring subcomponent.

```yaml
logging:
  service:
    pipelines:
      default_pipeline:
        receivers: []
```

### Define a pipeline

```yaml
logging:
  service:
    pipelines:
      custom_pipeline:
        receivers:
        - RECEIVER_ID
        processors:
        - PROCESSOR_ID
```

## Options / Props

| Field | Required | Description |
|---|---|---|
| `log_level` | Optional | Verbosity of the logging submodule's own logs; Ops Agent 2.6.0 and later. Default `info`; options `error`, `warn`, `info`, `debug`, `trace` |
| `pipelines` | | Map of pipeline IDs to definitions |
| `pipelines.PIPELINE_ID.receivers` | Required for new pipelines | List of receiver IDs; order does not matter; the pipeline collects from all of them |
| `pipelines.PIPELINE_ID.processors` | Optional | List of processor IDs; order matters, each record runs through the processors in the listed order |

## Notes

- Setting `default_pipeline` `receivers: []` stops the agent from collecting `/var/log/messages` and `/var/log/syslog` entries; those logs are no longer stored in Cloud Logging. Try it on a disposable project first.
- Warning from the source: setting `log_level` to `debug` (or `trace`) triggers a feedback loop in the logging sub-agent that produces a continuous stream of logs (known issue); do not set `log_level` above `info`. For that reason the source's `log_level: debug` example is not reproduced.
- Each receiver and processor can be used in multiple pipelines.
- The `...` and `[...]` fence is a structure template from the source, tagged `text`.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration.md](./configuration.md)
- [configuration-logging-receivers.md](./configuration-logging-receivers.md)
- [configuration-logging-processors.md](./configuration-logging-processors.md)
- [configuration-metrics.md](./configuration-metrics.md)
