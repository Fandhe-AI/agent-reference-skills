<!-- source: https://code.claude.com/docs/en/monitoring-usage.md / last verified: 2026-08-07 -->

# Monitoring

Learn how to enable and configure OpenTelemetry for Claude Code.

## Signature / Usage

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp       # otlp, prometheus, console, none
export OTEL_LOGS_EXPORTER=otlp          # otlp, console, none
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"
claude
```

Managed settings equivalent:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.example.com:4317",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer example-token"
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | env var | Enables telemetry collection (required) |
| `OTEL_METRICS_EXPORTER` / `OTEL_LOGS_EXPORTER` | env var | Exporter type(s), comma-separated |
| `OTEL_EXPORTER_OTLP_PROTOCOL` / `_ENDPOINT` / `_HEADERS` | env var | OTLP transport config, generic or per-signal (`_METRICS_`, `_LOGS_`, `_TRACES_`) |
| `OTEL_LOG_USER_PROMPTS` / `OTEL_LOG_ASSISTANT_RESPONSES` | env var | Include prompt/response text (default: disabled) |
| `OTEL_LOG_TOOL_DETAILS` / `OTEL_LOG_TOOL_CONTENT` | env var | Include tool params/input-output content |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | env var | Enable distributed tracing (beta), requires `OTEL_TRACES_EXPORTER` |
| `otelHeadersHelper` | setting | Script generating dynamic auth headers, refreshed every 29 min by default |
| `OTEL_RESOURCE_ATTRIBUTES` | env var | Custom key=value attributes for multi-team org support (strict ASCII, no spaces) |

Metrics exported: `claude_code.session.count`, `claude_code.lines_of_code.count`, `claude_code.pull_request.count`, `claude_code.commit.count`, `claude_code.cost.usage` (USD), `claude_code.token.usage`, `claude_code.code_edit_tool.decision`, `claude_code.active_time.total`.

Events exported (via `OTEL_LOGS_EXPORTER`): `claude_code.user_prompt`, `claude_code.assistant_response`, `claude_code.tool_result`, `claude_code.tool_decision`, `claude_code.api_request`, `claude_code.api_error`, `claude_code.skill_activated`, and others, correlated by the `prompt.id` attribute.

## Notes

- Administrators configure this centrally via the managed settings file; managed `OTEL_EXPORTER_OTLP_*` variables remove conflicting developer-set variables at startup (endpoint/protocol/credential locking).
- Claude Code doesn't pass `OTEL_*` variables to spawned subprocesses (Bash tool, hooks, MCP servers, language servers).
- Traces (beta) require both `CLAUDE_CODE_ENABLE_TELEMETRY=1` and `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1`; span hierarchy is `claude_code.interaction` → `claude_code.llm_request` / `claude_code.tool` (with `blocked_on_user` and `execution` children) / `claude_code.hook` (detailed beta only).
- Standard attributes on all metrics/events include `session.id`, `organization.id`, `user.id`, `user.email`, `terminal.type`; `prompt.id` is event-only (excluded from metrics to avoid unbounded cardinality).
- For per-session OpenTelemetry wiring from the Agent SDK (not the CLI), see `anthropic-agent-sdk`, which covers SDK-side observability configuration distinct from this CLI/organization-level telemetry reference.

## Related

- [analytics](./analytics.md)
- [costs](./costs.md)
