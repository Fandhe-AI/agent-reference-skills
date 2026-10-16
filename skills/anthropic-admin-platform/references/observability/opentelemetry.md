<!-- source: https://platform.claude.com/docs/en/manage-claude/opentelemetry / last verified: 2026-10-17 -->

# OpenTelemetry for the Claude API (beta)

The Claude API and the SDK can trace Messages API requests, tool uses, and Managed Agents sessions with OpenTelemetry. Spans go to the observability platform you already use, for debugging, token and latency tracking, and evals from real traffic.

## Signature / Usage

Set up SDK tracing, API tracing, or both. Both together give one trace with SDK and API spans. Content mode on the SDK side (Python):

```python
# Use a specific tracer provider and record content.
# Setting open_telemetry overrides all ANTHROPIC_OPEN_TELEMETRY* environment variables.
client = Anthropic(
    open_telemetry={"tracer_provider": provider, "traces": {"content_mode": "content"}}
)
```

## Options / Props

| What you get | SDK tracing | API tracing | Both |
|--------------|-------------|-------------|------|
| Messages API requests / Sessions API requests / token usage | yes | yes | yes |
| Each model run within a request | no | yes | yes |
| Managed Agents turns | no | yes | yes |
| Server tools (run by the API) | no | yes | yes |
| Client tools run by the tool runner | yes | no | yes |
| Tools in a self-hosted sandbox | yes | no | yes |
| Other API requests, such as uploading files | yes | no | yes |
| Setup | Code | Console | Both |
| Required permission | None | Admin | Admin |
| Coverage | Clients using the SDK | Any client | Any client |
| Cloud platform support | Any | Claude Platform, Claude Platform on AWS | Claude Platform, Claude Platform on AWS |

| Content mode | SDK value | Spans include |
|--------------|-----------|---------------|
| Metadata only (default) | `metadata_only` | Identifiers, timing, status, token counts, and text you choose such as agent / tool names and MCP server names |
| Full content | `content` | Also model prompts and responses |

## Notes

- Beta: provided under the agreement with Anthropic, including the Beta Services section of the Service Specific Terms.
- Spans use the OpenTelemetry GenAI semantic conventions (`gen_ai.*`), so supporting platforms recognize them. Send traces to any OTLP-accepting platform; documented partners: Arize AI, Braintrust, Databricks, Datadog, Grafana Cloud, Honeycomb, Langfuse, LangSmith, New Relic, PostHog, Sentry, Splunk.
- Distinct from Claude Code monitoring (code.claude.com), Agent SDK observability, and Cowork activity monitoring, which are documented elsewhere.
- Content limits: with Full content each span holds up to 0.75 MB by default (fits a 200k-token English context; below the 1 MB limit of many platforms). Over the limit, content is shortened and `anthropic.content.truncated` is set to `true`. Request spans drop the system prompt and earliest messages first; tool spans drop blocks from the end of the result; images and documents appear only as their type. A full 1M-token context needs about 4 MB. SDK: `traces.max_content_bytes`; Console: **Maximum content size in MB** under **Advanced settings**.
- Destinations export only metadata regardless of content mode if the organization has a HIPAA, FERPA, or K-12 data-handling restriction with Anthropic; SDK spans are not affected.
- Zero data retention: Full content is usable; for Messages API requests the API holds exported content only in memory until delivered. Claude Managed Agents is not ZDR eligible and its retention is unchanged.
- Your observability platform stores content under its own access and retention settings.
- Counting tokens: sum spans of only one source per request. SDK spans: sum `anthropic.messages.create` (CLIENT kind), plus `anthropic.usage.compaction.input_tokens` / `output_tokens` when compactions occurred. API spans for Messages API: sum either `anthropic.messages.create` (SERVER kind) or `anthropic.model_request`, not both, plus `anthropic.compaction` spans (do not also add `anthropic.usage.compaction.*`). API spans for Managed Agents: sum `anthropic.model_request` and `anthropic.session.outcome_evaluation`. `gen_ai.usage.input_tokens` already includes cache reads and writes. Deduplicate spans by trace ID + span ID.
- Exported spans are not a guaranteed complete usage record (best-effort delivery; callers can turn off the sampled flag in `traceparent`). Use the Usage API for per-key usage tracking.
- Group Managed Agents spans by `gen_ai.conversation.id` (one thread) or `anthropic.session.id` (whole session, across traces).

## Related

- [opentelemetry-api.md](./opentelemetry-api.md)
- [opentelemetry-sdk.md](./opentelemetry-sdk.md)
- [spans.md](./spans.md)
- [usage-cost-api](../usage-cost/usage-cost-api.md)
