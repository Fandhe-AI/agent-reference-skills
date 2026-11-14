<!-- source: https://code.claude.com/docs/en/agent-sdk/observability / last verified: 2026-11-14 -->

# Observability with OpenTelemetry

Export traces, metrics, and events from the Agent SDK to your observability backend using OpenTelemetry.

Production visibility needs: which tools were called, how long each model request took, how many tokens were spent, and where failures occurred. The Agent SDK can export this as OpenTelemetry traces, metrics, and log events to any backend that accepts the OpenTelemetry Protocol (OTLP), whether a hosted observability platform or a self-hosted collector. To read token usage/cost directly from the SDK response stream instead, see `./cost-tracking.md`. For the Claude API or Managed Agents, see "OpenTelemetry for the Claude API" in the Claude API docs (a separate page).

## Signature / Usage

### How telemetry flows from the SDK

The Agent SDK runs the Claude Code CLI as a child process and communicates with it over a local pipe. The CLI has OpenTelemetry instrumentation built in: it records spans around each model request and tool execution, emits metrics for token and cost counters, and emits structured log events for prompts and tool results. The SDK does not produce telemetry of its own; it passes configuration through as environment variables, and the CLI exports directly to your collector.

By default, the child process inherits your application's environment, so you can configure telemetry in either of two places:

- **Process environment**: set the variables in your shell, container, or orchestrator before your application starts. Every `query()` call picks them up automatically with no code change. Recommended for production.
- **Per-call options**: set the variables in `ClaudeAgentOptions.env` (Python) or `options.env` (TypeScript). Use this when different agents in the same process need different telemetry settings. In Python, `env` is merged on top of the inherited environment; in TypeScript, `env` replaces it entirely, so include `...process.env`.

The CLI exports three independent signals, each with its own enable switch and exporter:

| Signal | What it contains | Enable with |
|---|---|---|
| Metrics | Counters for tokens, cost, sessions, lines of code, and tool decisions | `OTEL_METRICS_EXPORTER` |
| Log events | Structured records for each prompt, API request, API error, and tool result | `OTEL_LOGS_EXPORTER` |
| Traces | Spans for each interaction, model request, tool call, and hook (beta) | `OTEL_TRACES_EXPORTER` plus `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` |

The complete list of metric names, event names, and attributes lives in the Claude Code Monitoring reference (https://code.claude.com/docs/en/monitoring-usage.md), outside this skill's scope. The Agent SDK emits the same data because it runs the same CLI. Span names are listed under "Read agent traces" below.

### Enable telemetry export

Telemetry is off until `CLAUDE_CODE_ENABLE_TELEMETRY=1` is set and at least one exporter is chosen. The most common configuration sends all three signals over OTLP HTTP to a collector.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

OTEL_ENV = {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    # Required for traces, which are in beta. Metrics and log events do not need this.
    "CLAUDE_CODE_ENHANCED_TELEMETRY_BETA": "1",
    # Choose an exporter per signal. Use otlp for the SDK; see the Note below.
    "OTEL_TRACES_EXPORTER": "otlp",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    # Standard OTLP transport configuration.
    "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.example.com:4318",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer your-token",
}


async def main():
    options = ClaudeAgentOptions(env=OTEL_ENV)
    async for message in query(
        prompt="List the files in this directory", options=options
    ):
        print(message)


asyncio.run(main())
```

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const otelEnv = {
  CLAUDE_CODE_ENABLE_TELEMETRY: "1",
  // Required for traces, which are in beta. Metrics and log events do not need this.
  CLAUDE_CODE_ENHANCED_TELEMETRY_BETA: "1",
  // Choose an exporter per signal. Use otlp for the SDK; see the Note below.
  OTEL_TRACES_EXPORTER: "otlp",
  OTEL_METRICS_EXPORTER: "otlp",
  OTEL_LOGS_EXPORTER: "otlp",
  // Standard OTLP transport configuration.
  OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_ENDPOINT: "http://collector.example.com:4318",
  OTEL_EXPORTER_OTLP_HEADERS: "Authorization=Bearer your-token",
};

for await (const message of query({
  prompt: "List the files in this directory",
  // env replaces the inherited environment in TypeScript, so spread
  // process.env first to keep PATH, ANTHROPIC_API_KEY, and other variables.
  options: { env: { ...process.env, ...otelEnv } },
})) {
  console.log(message);
}
```

Because the child process inherits your application's environment by default, you can export these variables in a Dockerfile, Kubernetes manifest, or shell profile and omit `options.env` entirely.

To confirm export is working, check your collector's logs for incoming spans, metrics, and log events after the task completes. The CLI fails silently on export errors by default: if the endpoint is unreachable or rejects the data, the agent still runs normally and the CLI drops the telemetry without surfacing an error in your application. To surface exporter errors, set `CLAUDE_CODE_OTEL_DIAG_STDERR=1` alongside the exporter variables and read the diagnostics through the SDK's `stderr` callback (Python) or `stderr` option (TypeScript). Requires Claude Code v2.1.179 or later.

The `console` exporter writes telemetry to standard output, which the SDK uses as its message channel. Do not set `console` as an exporter value when running through the SDK. To inspect telemetry locally, point `OTEL_EXPORTER_OTLP_ENDPOINT` at a local OpenTelemetry Collector instead.

#### Flush telemetry from short-lived calls

The CLI batches telemetry and exports on an interval. On a clean process exit it attempts to flush pending data, but the flush is bounded by a short timeout, so spans can still be dropped if the collector is slow to respond. If your process is killed before the CLI shuts down, anything still in the batch buffer is lost. Lowering the export intervals reduces both windows. By default, metrics export every 60 seconds and traces and logs export every 5 seconds. The following example shortens all three intervals:

```python
OTEL_ENV = {
    # ... exporter configuration from the previous example ...
    "OTEL_METRIC_EXPORT_INTERVAL": "1000",
    "OTEL_LOGS_EXPORT_INTERVAL": "1000",
    "OTEL_TRACES_EXPORT_INTERVAL": "1000",
}
```

```typescript
const otelEnv = {
  // ... exporter configuration from the previous example ...
  OTEL_METRIC_EXPORT_INTERVAL: "1000",
  OTEL_LOGS_EXPORT_INTERVAL: "1000",
  OTEL_TRACES_EXPORT_INTERVAL: "1000",
};
```

### Read agent traces

Traces give you the most detailed view of an agent run. With `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` set, each step of the agent loop becomes a span:

- `claude_code.interaction`: wraps a single turn of the agent loop, from receiving a prompt to producing a response.
- `claude_code.llm_request`: wraps each call to the Claude API, with model name, latency, and token counts as attributes.
- `claude_code.tool`: wraps each tool invocation, with child spans for the permission wait (`claude_code.tool.blocked_on_user`) and the execution itself (`claude_code.tool.execution`).
- `claude_code.hook`: wraps each hook execution. Requires detailed beta tracing (`ENABLE_BETA_TRACING_DETAILED=1` and `BETA_TRACING_ENDPOINT`), a pair that also changes where your logs and traces go.

The `llm_request`, `tool`, and `hook` spans are children of the enclosing `claude_code.interaction` span. When the agent spawns a subagent through the Agent tool, the subagent's `llm_request` and `tool` spans nest under the parent agent's `claude_code.tool` span, so the full delegation chain appears as one trace.

Spans carry a `session.id` attribute by default. When you make several `query()` calls against the same session, filter on `session.id` in your backend to see them as one timeline. Claude Code omits the attribute if you set `OTEL_METRICS_INCLUDE_SESSION_ID` to a falsy value. Tracing is in beta: span names and attributes may change between releases; the trace exporter configuration variables are in "Traces (beta)" of the Monitoring reference.

### Link traces to your application

The SDK automatically propagates W3C trace context into the CLI subprocess. When you call `query()` while an OpenTelemetry span is active in your application, the SDK injects `TRACEPARENT` and `TRACESTATE` into the child process environment, and the CLI reads them so its `claude_code.interaction` span becomes a child of your span. The agent run then appears inside your application's trace instead of as a disconnected root.

OTLP event log records emitted during the run carry the same trace context: with `TRACEPARENT` set, each record's `trace_id` and `span_id` match your application's trace, so you can join events to spans in your backend. Before v2.1.212, event records emitted outside an active span didn't carry `trace_id` or `span_id`.

When trace-context propagation is enabled, the CLI also forwards `TRACEPARENT` to every Bash and PowerShell command it runs. If a command launched through the Bash tool emits its own OpenTelemetry spans, those spans nest under the `claude_code.tool.execution` span that wraps the command.

Auto-injection is skipped when you set `TRACEPARENT` explicitly in `options.env`, so you can pin a specific parent context if needed. Interactive CLI sessions ignore inbound `TRACEPARENT` entirely; only Agent SDK and `claude -p` runs honor it.

### Tag telemetry from your agent

By default the CLI reports `service.name` as `claude-code`. If you run several agents, or run the SDK alongside other services that export to the same collector, override the service name and add resource attributes so you can filter by agent in your backend. These values are applied as OpenTelemetry resource attributes on every span, metric, and event the agent emits:

```python
options = ClaudeAgentOptions(
    env={
        # ... exporter configuration from the Enable telemetry export example ...
        "OTEL_SERVICE_NAME": "support-triage-agent",
        "OTEL_RESOURCE_ATTRIBUTES": "service.version=1.4.0,deployment.environment=production",
    },
)
```

```typescript
const options = {
  env: {
    ...process.env,
    // ... exporter configuration from the Enable telemetry export example ...
    OTEL_SERVICE_NAME: "support-triage-agent",
    OTEL_RESOURCE_ATTRIBUTES:
      "service.version=1.4.0,deployment.environment=production",
  },
};
```

### Attribute actions to your end users

The CLI attaches identity attributes to every event based on the credential it uses to call Anthropic. When one deployment serves many end users, these attributes identify your service's credential, not the end user on whose behalf the agent acted.

To make tool calls and MCP activity attributable to your application's end users, inject end-user identity as resource attributes on each `query()` call. Percent-encode values before interpolating them, since `OTEL_RESOURCE_ATTRIBUTES` reserves commas, spaces, and equals signs. The following example attaches the requesting user and tenant to every span and event from one request. It assumes a `request` object from your web framework carrying the user and tenant IDs:

```python
from urllib.parse import quote

options = ClaudeAgentOptions(
    env={
        # ... exporter configuration from the Enable telemetry export example ...
        # request is the incoming request object from your web framework.
        "OTEL_RESOURCE_ATTRIBUTES": f"enduser.id={quote(request.user_id)},tenant.id={quote(request.tenant_id)}",
    },
)
```

```typescript
const options = {
  env: {
    ...process.env,
    // ... exporter configuration from the Enable telemetry export example ...
    // request is the incoming request object from your web framework.
    OTEL_RESOURCE_ATTRIBUTES: `enduser.id=${encodeURIComponent(request.userId)},tenant.id=${encodeURIComponent(request.tenantId)}`,
  },
};
```

After you attach end-user identity, these events become a per-user audit trail you can forward to a Security Information and Event Management (SIEM) platform:

- `tool_decision` and `tool_result`: each tool call, whether it was allowed or denied, and its result
- `mcp_server_connection`: MCP server connections and connection failures
- `permission_mode_changed`: permission mode changes

These events export as log records named with a `claude_code.` prefix, such as `claude_code.tool_decision`.

## Options / Props

### Control sensitive data in exports

Telemetry is structural by default. Durations, model names, and tool names are recorded on every span; token counts are recorded when the underlying API request returns usage data, so spans for failed or aborted requests may omit them. The content your agent reads and writes is not recorded by default. These opt-in variables add content to the exported data:

| Variable | Adds |
|---|---|
| `OTEL_LOG_USER_PROMPTS=1` | Prompt text on `claude_code.user_prompt` events and on the `claude_code.interaction` span |
| `OTEL_LOG_TOOL_DETAILS=1` | Tool input arguments such as file paths, shell commands, and search patterns on `claude_code.tool_result` events, and real agent, skill, plugin, and MCP server names on the cost and token metrics. The built-in rule the auto mode classifier named when it blocked a call, as `classifier_category` on `claude_code.tool_decision` events |
| `OTEL_LOG_TOOL_CONTENT=1` | A `tool.output` span event on `claude_code.tool` with file contents, Bash output, and what MCP tools, WebFetch, and WebSearch return, truncated at 60 KB by default, configurable via `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH`, which requires Claude Code v2.1.214 or later. Results from MCP tools, WebFetch, and WebSearch require Claude Code v2.1.283 or later. Requires tracing to be enabled. Span attributes carry tool content under their own gates |
| `OTEL_LOG_RAW_API_BODIES` | Full Anthropic Messages API request and response JSON as `claude_code.api_request_body` and `claude_code.api_response_body` log events. Set to `1` for inline bodies truncated at 60 KB by default, or `file:<dir>` for untruncated bodies on disk with a `body_ref` path in the event. `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` configures the inline truncation limit, and requires Claude Code v2.1.214 or later. Bodies include the entire conversation history and have extended-thinking content redacted. Enabling this implies consent to everything the three variables above would reveal |

Leave these unset unless your observability pipeline is approved to store the data your agent handles.

## Notes

- Source: https://code.claude.com/docs/en/agent-sdk/observability (fetched 2026-11-14)
- Detailed metric/event/attribute names and the Monitoring reference page (https://code.claude.com/docs/en/monitoring-usage.md) are outside this skill's scope; only the observability-specific content documented on this page is included here.

## Related

- [Cost Tracking](./cost-tracking.md)
- [Hosting the Agent SDK](./hosting.md)
