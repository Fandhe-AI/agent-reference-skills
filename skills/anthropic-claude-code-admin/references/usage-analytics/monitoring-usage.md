<!-- source: https://code.claude.com/docs/en/monitoring-usage.md / last verified: 2026-10-16 -->

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

Events exported (via `OTEL_LOGS_EXPORTER`), each named `claude_code.<name>` and correlated by the `prompt.id` attribute:

| Event | Trigger |
| --- | --- |
| `user_prompt` | A prompt is submitted, including turns Claude Code starts on its own |
| `assistant_response` | After each API request that returns model text (text blocks only) |
| `tool_result` | A tool completes execution (not emitted for rejected calls) |
| `api_request` | Each API request to Claude |
| `api_error` | An API request fails |
| `api_refusal` | An API request returns `stop_reason: "refusal"` (refusals arrive on a successful stream, so `api_error` doesn't fire) |
| `api_request_body` | Each API request attempt when `OTEL_LOG_RAW_API_BODIES` is set |
| `api_response_body` | Each successful API response when `OTEL_LOG_RAW_API_BODIES` is set (file mode also appends to `<dir>/index.jsonl`, v2.1.274+) |
| `tool_decision` | A tool permission decision is made (accept/reject) |
| `permission_mode_changed` | The permission mode changes (`trigger`: `shift_tab`, `exit_plan_mode`, `auto_gate_denied`, `auto_opt_in`) |
| `auth` | `/login` or `/logout` completes |
| `mcp_server_connection` | An MCP server connects, disconnects, or fails to connect |
| `internal_error` | Claude Code catches an unexpected internal error (class name and errno-style code only; not emitted on Bedrock / Agent Platform / Foundry or when `DISABLE_ERROR_REPORTING` is set) |
| `plugin_installed` | A plugin finishes installing (CLI or `/plugin` UI) |
| `plugin_loaded` | Once per enabled plugin at session start |
| `skill_activated` | A skill is invoked (Skill tool or `/` command) |
| `at_mention` | An `@`-mention in a prompt is resolved (at most 100 `agent` and 100 `mcp_resource` events per prompt) |
| `api_retries_exhausted` | An API request fails after more than one attempt (alongside the final `api_error`) |
| `hook_registered` | Once per configured hook at session start |
| `hook_execution_start` / `hook_execution_complete` | Hooks begin / all hooks for a hook event finish (once per hook event) |
| `hook_plugin_metrics` | An official-marketplace plugin hook emits per-invocation metrics |
| `compaction` | Conversation compaction completes |
| `subagent_completed` | A subagent finishes and returns its result |
| `feedback_survey` | A session quality survey is shown or answered |
| `retention_sweep` | Once per run of the `cleanupPeriodDays` retention cleanup sweep (v2.1.227+; `result` `complete` / `skipped` with `skip_reason`) |
| `managed_settings_resolved` | The session resolves managed settings (start, on change, and when Claude Code refuses to start); v2.1.274+, add redacted settings and a SHA-256 digest with `OTEL_LOG_MANAGED_SETTINGS=1` |

`tool_decision` attributes: `tool_name`, `tool_use_id`, `decision` (`accept` / `reject`), `tool_source` (always present, v2.1.214+: `builtin`, `mcp`, `sdk_host_builtin_mcp`), and `source`: `config` (decided automatically by settings/rules/flags/permission mode/session grant/inherently safe, or the prompt request itself failed), `hook`, `user_permanent` ("Yes, and don't ask again"), `user_temporary` (one-time or session grant), `user_abort` (dismissed; a reject), `user_reject` ("No"). `tool_parameters` appears with `OTEL_LOG_TOOL_DETAILS=1`.

Repository attributes (v2.1.269+): `OTEL_METRICS_INCLUDE_REPOSITORY=true` tags metrics and events with `vcs.repository.url.full`, `vcs.owner.name`, `vcs.repository.name`, and `vcs.provider.name` (`github` / `gitlab` / `bitbucket` / `gitea`), derived from the `origin` remote and lowercased. A `vcs.*` key declared in `OTEL_RESOURCE_ATTRIBUTES` replaces the derived value. Anthropic's own telemetry drops every `vcs.*` key.

## Notes

- Administrators configure this centrally via the managed settings file; managed `OTEL_EXPORTER_OTLP_*` variables remove conflicting developer-set variables at startup (endpoint/protocol/credential locking): setting `OTEL_EXPORTER_OTLP_ENDPOINT` removes every developer-set per-signal endpoint; `OTEL_EXPORTER_OTLP_PROTOCOL` removes per-signal protocols; `OTEL_EXPORTER_OTLP_HEADERS` / `_CLIENT_KEY` / `_CLIENT_CERTIFICATE` remove the per-signal versions plus every developer-set endpoint. Exporter selectors (`OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER`, `OTEL_TRACES_EXPORTER`) follow normal per-key precedence, so set them in managed settings to lock them (v2.1.223+: across admin sources `OTEL_LOGS_EXPORTER` follows the telemetry unit). Developer-set `BETA_TRACING_ENDPOINT` is removed when managed settings decide either signal's destination (a generic or logs/traces endpoint or credential, an `otelHeadersHelper`, a logs/traces selector of `none` / `console` / empty, or telemetry turned off); a metrics-only endpoint doesn't remove it (v2.1.251+; before that it redirected logs and traces). The desktop app or a self-hosted environment runner that names an OTLP endpoint in its environment pins the destination the same way (v2.1.251+). Before v2.1.217 every variable followed per-key precedence independently.
- Claude Code ignores the OTel exporter variables in a repository's `.claude/settings.json` and `.claude/settings.local.json`; a repository can still turn a signal off by setting its exporter selector to `none` unless managed settings, `--settings`, or the launch environment set it.
- Telemetry from cloud sessions and Claude Tag: set `CLAUDE_CODE_ENABLE_TELEMETRY` and the `OTEL_*` variables in the `env` block of server-managed settings (reaches users' machines and cloud sessions other than Claude Tag channel sessions) or in a cloud environment's environment variables (reaches Claude Tag sessions). Environment variables are readable by anyone who uses the environment and a network secret doesn't cover telemetry export, so don't put a collector credential there; configure the whole export through server-managed settings instead. Let sessions reach the collector by allowlisting its domain in the environment's network access. Cloud-session metrics carry `ccr.session.id` (the `CLAUDE_CODE_REMOTE_SESSION_ID`); `OTEL_METRICS_INCLUDE_ENTRYPOINT=true` adds `app.entrypoint`, which is `claude-in-slack` for Claude Tag sessions (don't rely on `user.*` there; Claude acts as the shared identity). Cowork sessions don't receive server-managed settings.
- Desktop SSH sessions: name the machine with `OTEL_RESOURCE_ATTRIBUTES` (e.g. `host.name=build-7`) in the managed settings file on each remote machine; the value isn't expanded (`$(hostname)` arrives literally), and a value set on the computer running Desktop doesn't reach the SSH session.
- Claude apps gateway sessions: exports carry `user.id` = IdP subject, `user.email`, `user.groups` (comma-separated), and `identity.source: gateway-oidc`; `user.*` / `identity.*` keys from `OTEL_RESOURCE_ATTRIBUTES` are ignored there. With a direct API key or Bedrock / Agent Platform / Foundry there is no account, so attach identity yourself with `OTEL_RESOURCE_ATTRIBUTES`.
- Audit / SIEM: events are the audit data source; point `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` at a SIEM's OTLP receiver or a Collector (managed settings with `OTEL_LOGS_EXPORTER=otlp`, `OTEL_LOG_TOOL_DETAILS=1`). Detection signals: tool allowed/denied → `tool_decision`; permission mode escalation → `permission_mode_changed`; policy hook blocked → `hook_execution_complete` (`num_blocking`); login/auth failure → `auth`; MCP connect/failure → `mcp_server_connection`; plugin source → `plugin_installed`; commands/files touched → `tool_result` / `tool_decision` with `OTEL_LOG_TOOL_DETAILS=1`; managed source / policy helper health → `managed_settings_resolved`; local retention → `retention_sweep`. Without `OTEL_LOG_TOOL_DETAILS` MCP names are redacted to `"mcp_tool"` for user-configured servers. Claude Code emits the raw event stream only; baselining and alerting are the SIEM's job.
- GenAI semantic conventions: `input_tokens` excludes cache reads/writes, and Claude Code doesn't set `gen_ai.usage.*`; to compute `gen_ai.usage.input_tokens` add `input_tokens`, `cache_read_tokens`, and `cache_creation_tokens` (or the `input`, `cacheRead`, `cacheCreation` types of `claude_code.token.usage`). `cache_read_tokens` maps to `gen_ai.usage.cache_read.input_tokens`; `cache_creation_tokens` to `gen_ai.usage.cache_write.input_tokens` (older conventions: `gen_ai.usage.cache_creation.input_tokens`).
- Other behaviors: `OTEL_LOG_RAW_API_BODIES` (`1` inline, truncated at the content limit, or `file:<dir>` untruncated with a `body_ref`) implies consent to everything `OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_TOOL_DETAILS`, and `OTEL_LOG_TOOL_CONTENT` reveal; `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` (default 61440 UTF-16 units, v2.1.214+) sets the content limit; with `prometheus` as the only metrics exporter the `USD` / `tokens` / `s` units are omitted (v2.1.216+); `http/protobuf` and `http/json` exports send `Content-Length` (before v2.1.212, v2.1.191+ used chunked encoding that Azure Monitor rejected with 411).
- Claude Code doesn't pass `OTEL_*` variables to spawned subprocesses (Bash tool, hooks, MCP servers, language servers).
- Traces (beta) require both `CLAUDE_CODE_ENABLE_TELEMETRY=1` and `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1`; span hierarchy is `claude_code.interaction` → `claude_code.llm_request` / `claude_code.tool` (with `blocked_on_user` and `execution` children) / `claude_code.hook` (detailed beta only).
- Standard attributes on all metrics/events include `session.id`, `organization.id`, `user.id`, `user.email`, `terminal.type`; `prompt.id` is event-only (excluded from metrics to avoid unbounded cardinality).
- For per-session OpenTelemetry wiring from the Agent SDK (not the CLI), see `anthropic-agent-sdk`, which covers SDK-side observability configuration distinct from this CLI/organization-level telemetry reference.

## Related

- [analytics](./analytics.md)
- [costs](./costs.md)
