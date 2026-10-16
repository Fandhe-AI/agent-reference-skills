<!-- source: https://platform.claude.com/docs/en/api/models/list.md / last verified: 2026-10-17 -->

# List Models

List available models. More recently released models are listed first.

## Signature / Usage

```
GET /v1/models
```

```bash
curl https://api.anthropic.com/v1/models \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Query parameters

| Name | Type | Description |
|------|------|-------------|
| `after_id` | optional string | Cursor: page after this object ID |
| `before_id` | optional string | Cursor: page before this object ID |
| `limit` | optional number | Items per page. Default `20`, range `1`–`1000` |

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-beta` | optional array of `AnthropicBeta` | Beta feature flags (string also accepted). Listed values: `"message-batches-2024-09-24"`, `"prompt-caching-2024-07-31"`, `"computer-use-2024-10-22"`, `"computer-use-2025-01-24"`, `"pdfs-2024-09-25"`, `"token-counting-2024-11-01"`, `"token-efficient-tools-2025-02-19"`, `"output-128k-2025-02-19"`, `"files-api-2025-04-14"`, `"mcp-client-2025-04-04"`, `"mcp-client-2025-11-20"`, `"dev-full-thinking-2025-05-14"`, `"interleaved-thinking-2025-05-14"`, `"code-execution-2025-05-22"`, `"extended-cache-ttl-2025-04-11"`, `"context-1m-2025-08-07"`, `"context-management-2025-06-27"`, `"model-context-window-exceeded-2025-08-26"`, `"skills-2025-10-02"`, `"fast-mode-2026-02-01"`, `"output-300k-2026-03-24"`, `"user-profiles-2026-03-24"`, `"user-profiles-2026-08-18"`, `"user-profiles-2026-09-04"`, `"advisor-tool-2026-03-01"`, `"managed-agents-2026-04-01"`, `"cache-diagnosis-2026-04-07"`, `"dreaming-2026-04-21"`, `"thinking-token-count-2026-05-13"`, `"server-side-fallback-2026-06-01"`, `"server-side-fallback-2026-07-01"`, `"fallback-credit-2026-06-01"`, `"fallback-credit-2026-07-01"`, `"agent-memory-2026-07-22"`, `"mid-conversation-tool-changes-2026-07-01"`, `"compact-2026-01-12"`, `"computer-use-2025-11-24"`, `"mcp-tunnels-2026-06-22"`, `"structured-outputs-2025-11-13"`, `"task-budgets-2026-03-13"`, `"thinking-display-updates-2026-08-18"`, `"ce-user-management-2026-07-13"`, `"mid-conversation-output-config-2026-07-01"`, `"thinking-binding-controls-2026-08-01"`, `"mid-conversation-system-clear-at-2026-08-21"`, `"compact-2026-09-04"`, `"inline-tools-2026-09-15"`, `"mcp-client-2026-09-15"`, `"ce-plugins-2026-09-01"`, `"spend-limit-reads-2026-09-26"`, `"telemetry-destinations-2026-08-11"` (51 listed) |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of `ModelInfo` | `id`, `display_name`, `created_at`, `max_input_tokens`, `max_tokens`, `type: "model"`, `capabilities`, `lifecycle` (`"active"` \| `"deprecated"` \| `"retired"`), `deprecated_at` (RFC 3339 or null), `retires_at` (RFC 3339 or null; scheduled retirement, `lifecycle` is the retirement signal), `line` (`"haiku"` \| `"sonnet"` \| `"opus"` \| `"fable"` \| `"mythos"` or null; don't infer from `id`) |
| `data[].capabilities` | `ModelCapabilities` | Each entry has `supported: boolean` plus sub-fields where relevant: `batch`, `citations`, `code_execution`, `image_input`, `pdf_input`, `structured_outputs` (all `{ supported }`); `context_management` (`{ supported, clear_thinking_20251015, clear_tool_uses_20250919, compact_20260112 }`); `effort` (`{ supported, low, medium, high, xhigh, max }`); `thinking` (`{ supported, types: { adaptive, enabled } }`) |
| `first_id` | string | First ID in `data` |
| `has_more` | boolean | More results in requested direction |
| `last_id` | string | Last ID in `data` |

## Related

- [models-retrieve.md](./models-retrieve.md)
- [messages-create.md](./messages-create.md)
