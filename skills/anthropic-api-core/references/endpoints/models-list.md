<!-- source: https://platform.claude.com/docs/en/api/models/list.md / last verified: 2026-08-07 -->

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
| `anthropic-beta` | optional array of `AnthropicBeta` | Beta feature flags, e.g. `"message-batches-2024-09-24"`, `"files-api-2025-04-14"`, `"skills-2025-10-02"`, `"context-1m-2025-08-07"`, `"fast-mode-2026-02-01"`, `"managed-agents-2026-04-01"` (32 total; string also accepted) |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of `ModelInfo` | `id`, `display_name`, `created_at`, `max_input_tokens`, `max_tokens`, `type: "model"`, `capabilities` |
| `data[].capabilities` | `ModelCapabilities` | Each entry has `supported: boolean` plus sub-fields where relevant: `batch`, `citations`, `code_execution`, `image_input`, `pdf_input`, `structured_outputs` (all `{ supported }`); `context_management` (`{ supported, clear_thinking_20251015, clear_tool_uses_20250919, compact_20260112 }`); `effort` (`{ supported, low, medium, high, xhigh, max }`); `thinking` (`{ supported, types: { adaptive, enabled } }`) |
| `first_id` | string | First ID in `data` |
| `has_more` | boolean | More results in requested direction |
| `last_id` | string | Last ID in `data` |

## Related

- [models-retrieve.md](./models-retrieve.md)
- [messages-create.md](./messages-create.md)
