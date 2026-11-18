---
source: https://docs.cloud.google.com/stackdriver/docs/deprecations/legacy-agents
---

# Legacy Logging and Monitoring agents: end of support

As of September 28, 2026, the legacy Monitoring and Logging agents reached end of support: no new versions, and standard support and maintenance have ended. Existing installations are not shut down and continue streaming logs to Cloud Logging and metrics to Cloud Monitoring, but their use is no longer recommended. The deprecation applies only to environments where you installed the legacy agents, not to managed environments with built-in or pre-installed monitoring and logging agents.

## Signature / Usage

### Identify Compute Engine instances running a legacy agent

In Metrics explorer, select **PromQL**, select **Table** in the Results pane, enter a query and click **Run query**.

Table of each VM running an agent (instance ID and agent version):

```text
max by (instance_id, version, ${__groupby}) ({__name__="agent.googleapis.com/agent/uptime", monitored_resource="gce_instance"})
```

Total number of instances running each agent version:

```text
count by (version, ${__groupby}) ({__name__="agent.googleapis.com/agent/uptime", monitored_resource="gce_instance"})
```

In the `version` column, `stackdriver_agent` refers to the legacy Monitoring agent and `google-fluentd` to the legacy Logging agent.

## Options / Props

### Key dates

| Date | Event |
|---|---|
| September 28, 2026 | Standard maintenance and regular bug fixes for the legacy agents end; a 12-month migration grace period begins, during which Cloud Customer Care assists with migration through support tickets |
| September 28, 2027 | Cloud Customer Care migration assistance ends; you handle migration independently |

### Migration options

| Option | Description |
|---|---|
| Ops Agent | Primary and preferred agent for Compute Engine instances; combines logging and metrics, YAML configuration, high-throughput logging |
| Google-Built OpenTelemetry Collector | Google's production-ready build of the OpenTelemetry Collector; sends correlated OTLP traces, metrics and logs to Google Cloud Observability and other backends (https://docs.cloud.google.com/stackdriver/docs/instrumentation/google-built-otel) |
| Upstream Fluentd (logging only) | Open-source collector the legacy Logging agent was built upon; with the Google-platform plugins it keeps highly customized Fluentd configurations that cannot be translated to the Ops Agent working (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/logging/migrating-to-fluentd) |

## Notes

- Deprecated: the legacy Monitoring and Logging agents "have officially reached their end of support" as of September 28, 2026; the replacement is the Ops Agent (see transition.md).
- Continuing to use the legacy agents means no updates, bug fixes or support for new operating systems, leading to eventual incompatibility with Google Cloud Observability. The distributions remain available to download and install.
- The source's text says "legacy Logging agent deprecation" for the key dates; it applies to both legacy agents as stated in the intro.
- OpenTelemetry in Google Cloud here is the Google-built Collector, not the tracing of the OpenAI Agents SDK (`openai-agents`) or Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/stackdriver/docs/deprecations/legacy-agents (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [transition.md](./transition.md)
- [ops-agent.md](./ops-agent.md)
- [installation.md](./installation.md)
