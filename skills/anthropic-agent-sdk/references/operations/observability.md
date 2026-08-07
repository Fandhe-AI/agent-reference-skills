<!-- source: https://code.claude.com/docs/en/agent-sdk/observability / last verified: 2026-08-07 -->

# Observability with OpenTelemetry

Export traces, metrics, and events from the Agent SDK to your observability backend using OpenTelemetry.

Production visibility needs: which tools were called, how long each model request took, how many tokens were spent, and where failures occurred. The Agent SDK can export this as OpenTelemetry traces, metrics, and log events to any OTLP-compatible backend (Honeycomb, Datadog, Grafana, Langfuse, or a self-hosted collector). To read token usage/cost directly from the SDK response stream instead, see `./cost-tracking.md`.

## How telemetry flows from the SDK

The Agent SDK runs the Claude Code CLI as a child process over a local pipe. The CLI has OpenTelemetry instrumentation built in: it records spans around each model request and tool execution, emits metrics for token/cost counters, and emits structured log events for prompts and tool results. The SDK itself produces no telemetry — it passes configuration through as environment variables, and the CLI exports directly to your collector.

Configure telemetry in either place:

- **Process environment**: set variables in your shell, container, or orchestrator before your application starts. Every `query()` call picks them up automatically. Recommended for production.
- **Per-call options**: set variables in `ClaudeAgentOptions.env` (Python) or `options.env` (TypeScript) when different agents in the same process need different settings. In Python, `env` merges on top of the inherited environment; in TypeScript, `env` replaces it entirely, so include `...process.env`.

Three independent signals, each with its own enable switch and exporter:

| Signal | What it contains | Enable with |
|---|---|---|
| Metrics | Counters for tokens, cost, sessions, lines of code, tool decisions | `OTEL_METRICS_EXPORTER` |
| Log events | Structured records for each prompt, API request, API error, tool result | `OTEL_LOGS_EXPORTER` |
| Traces | Spans for each interaction, model request, tool call, and hook (beta) | `OTEL_TRACES_EXPORTER` plus `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` |

The complete metric/event/attribute list lives in the Claude Code Monitoring reference (https://code.claude.com/docs/en/monitoring-usage), outside this skill's scope. The Agent SDK emits the same data because it runs the same CLI.

## Enable telemetry export

Telemetry is off until `CLAUDE_CODE_ENABLE_TELEMETRY=1` is set and at least one exporter is chosen.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

OTEL_ENV = {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "CLAUDE_CODE_ENHANCED_TELEMETRY_BETA": "1",  # required for traces only
    "OTEL_TRACES_EXPORTER": "otlp",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.example.com:4318",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer your-token",
}

async def main():
    options = ClaudeAgentOptions(env=OTEL_ENV)
    async for message in query(prompt="List the files in this directory", options=options):
        print(message)

asyncio.run(main())
```

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const otelEnv = {
  CLAUDE_CODE_ENABLE_TELEMETRY: "1",
  CLAUDE_CODE_ENHANCED_TELEMETRY_BETA: "1",
  OTEL_TRACES_EXPORTER: "otlp",
  OTEL_METRICS_EXPORTER: "otlp",
  OTEL_LOGS_EXPORTER: "otlp",
  OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_ENDPOINT: "http://collector.example.com:4318",
  OTEL_EXPORTER_OTLP_HEADERS: "Authorization=Bearer your-token",
};

for await (const message of query({
  prompt: "List the files in this directory",
  options: { env: { ...process.env, ...otelEnv } },
})) {
  console.log(message);
}
```

Because the child process inherits the application environment by default, exporting these variables in a Dockerfile, Kubernetes manifest, or shell profile achieves the same result without `options.env`.

The CLI fails silently on export errors by default: if the endpoint is unreachable or rejects data, the agent still runs and the CLI drops the telemetry without surfacing an error. Set `CLAUDE_CODE_OTEL_DIAG_STDERR=1` alongside exporter variables and read diagnostics through the SDK's `stderr` callback (Python) / `stderr` option (TypeScript) to surface exporter errors. Requires Claude Code v2.1.179+.

Do not set `console` as an exporter value when running through the SDK — the SDK uses stdout as its message channel. Point `OTEL_EXPORTER_OTLP_ENDPOINT` at a local collector or an all-in-one Jaeger container to inspect telemetry locally instead.

### Flush telemetry from short-lived calls

The CLI batches telemetry and exports on an interval (metrics every 60s, traces/logs every 5s by default). On clean process exit it attempts to flush, bounded by a short timeout; a killed process loses anything still in the batch buffer. Lower the export intervals to reduce the loss window:

```python
OTEL_ENV = {
    # ... exporter configuration ...
    "OTEL_METRIC_EXPORT_INTERVAL": "1000",
    "OTEL_LOGS_EXPORT_INTERVAL": "1000",
    "OTEL_TRACES_EXPORT_INTERVAL": "1000",
}
```

## Read agent traces

With `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1`, each step of the agent loop becomes a span:

- `claude_code.interaction`: wraps a single turn of the agent loop.
- `claude_code.llm_request`: wraps each Claude API call, with model name, latency, and token counts as attributes.
- `claude_code.tool`: wraps each tool invocation, with child spans `claude_code.tool.blocked_on_user` (permission wait) and `claude_code.tool.execution`.
- `claude_code.hook`: wraps each hook execution. Requires `ENABLE_BETA_TRACING_DETAILED=1` and `BETA_TRACING_ENDPOINT` in addition to the variables above.

`llm_request`, `tool`, and `hook` spans are children of the enclosing `claude_code.interaction` span. When the agent spawns a subagent via the Task tool, the subagent's `llm_request`/`tool` spans nest under the parent agent's `claude_code.tool` span, so the full delegation chain appears as one trace.

Spans carry a `session.id` attribute by default (filter on it to see multiple `query()` calls against the same session as one timeline); set `OTEL_METRICS_INCLUDE_SESSION_ID` to a falsy value to omit it. Tracing is in beta; span names and attributes may change between releases.

## Link traces to your application

The SDK automatically propagates W3C trace context into the CLI subprocess. When you call `query()` while an OpenTelemetry span is active in your application, the SDK injects `TRACEPARENT`/`TRACESTATE` into the child process environment, and the CLI reads them so its `claude_code.interaction` span becomes a child of your span — the agent run appears inside your application's trace instead of as a disconnected root.

OTLP event log records carry the same trace context when `TRACEPARENT` is set, so `trace_id`/`span_id` match your application's trace (before v2.1.212, events emitted outside an active span didn't carry these). The CLI also forwards `TRACEPARENT` to every Bash/PowerShell command it runs; commands emitting their own OpenTelemetry spans nest those under `claude_code.tool.execution`.

Auto-injection is skipped when you set `TRACEPARENT` explicitly in `options.env`. Interactive CLI sessions ignore inbound `TRACEPARENT` entirely; only Agent SDK and `claude -p` runs honor it.

## Tag telemetry from your agent

By default the CLI reports `service.name` as `claude-code`. Override the service name and add resource attributes to filter by agent when running several agents against the same collector:

```python
options = ClaudeAgentOptions(
    env={
        # ... exporter configuration ...
        "OTEL_SERVICE_NAME": "support-triage-agent",
        "OTEL_RESOURCE_ATTRIBUTES": "service.version=1.4.0,deployment.environment=production",
    },
)
```

```typescript
const options = {
  env: {
    ...process.env,
    OTEL_SERVICE_NAME: "support-triage-agent",
    OTEL_RESOURCE_ATTRIBUTES: "service.version=1.4.0,deployment.environment=production",
  },
};
```

## Attribute actions to your end users

The CLI attaches identity attributes to every event based on the credential it uses to call Anthropic — for a multi-user deployment these identify your service's credential, not the end user. Inject end-user identity as resource attributes per `query()` call (percent-encode values, since `OTEL_RESOURCE_ATTRIBUTES` reserves commas, spaces, and equals signs):

```python
from urllib.parse import quote

options = ClaudeAgentOptions(
    env={
        # ... exporter configuration ...
        "OTEL_RESOURCE_ATTRIBUTES": f"enduser.id={quote(request.user_id)},tenant.id={quote(request.tenant_id)}",
    },
)
```

```typescript
const options = {
  env: {
    ...process.env,
    OTEL_RESOURCE_ATTRIBUTES: `enduser.id=${encodeURIComponent(request.userId)},tenant.id=${encodeURIComponent(request.tenantId)}`,
  },
};
```

With end-user identity attached, the `tool_decision`, `tool_result`, `mcp_server_connection`, and `permission_mode_changed` log events (exported with a `claude_code.` prefix) become a per-user audit trail forwardable to a SIEM.

## Control sensitive data in exports

Telemetry is structural by default — durations, model names, tool names on every span; token counts when the underlying API request returns usage data (omitted for failed/aborted requests). Content the agent reads and writes is not recorded by default. Opt-in variables:

| Variable | Adds |
|---|---|
| `OTEL_LOG_USER_PROMPTS=1` | Prompt text on `claude_code.user_prompt` events and on the `claude_code.interaction` span |
| `OTEL_LOG_TOOL_DETAILS=1` | Tool input arguments (file paths, shell commands, search patterns) on `claude_code.tool_result` events |
| `OTEL_LOG_TOOL_CONTENT=1` | Full tool input/output bodies as span events on `claude_code.tool`, truncated at 60 KB by default (configurable via `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH`, requires v2.1.214+). Requires tracing enabled |
| `OTEL_LOG_RAW_API_BODIES` | Full Anthropic Messages API request/response JSON as `claude_code.api_request_body`/`claude_code.api_response_body` log events. `1` for inline bodies truncated at 60 KB; `file:<dir>` for untruncated bodies on disk with a `body_ref` path. Bodies include entire conversation history with extended-thinking content redacted. Enabling this implies consent to everything the three variables above reveal |

Leave these unset unless your observability pipeline is approved to store the data your agent handles.

## Notes

- Detailed metric/event/attribute names and the `Monitoring` reference page (https://code.claude.com/docs/en/monitoring-usage) are outside this skill's scope; only the observability-specific content documented on this page is included here.

## Related

- [Cost Tracking](./cost-tracking.md)
- [Hosting the Agent SDK](./hosting.md)
