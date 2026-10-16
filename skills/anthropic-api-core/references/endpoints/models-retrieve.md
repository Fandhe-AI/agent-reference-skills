<!-- source: https://platform.claude.com/docs/en/api/models/retrieve.md / last verified: 2026-10-17 -->

# Get a Model

Get information about a specific model, or resolve a model alias to a model ID.

## Signature / Usage

```
GET /v1/models/{model_id}
```

```bash
curl https://api.anthropic.com/v1/models/$MODEL_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `model_id` | string | Model identifier or alias |

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-beta` | optional array of `AnthropicBeta` | Same beta flag list as [models-list.md](./models-list.md) |

### Returns

Returns a single `ModelInfo` object — same shape as [models-list.md](./models-list.md) `data[]` (`id`, `display_name`, `created_at`, `max_input_tokens`, `max_tokens`, `type: "model"`, `capabilities`, plus `lifecycle`, `deprecated_at`, `retires_at`, `line`).

## Notes

- The `anthropic-beta` flag list is the same 51-value list as in models-list.md, including `compact-2026-09-04`, `inline-tools-2026-09-15`, `mcp-client-2026-09-15`, `thinking-binding-controls-2026-08-01`, `thinking-display-updates-2026-08-18`, `mid-conversation-system-clear-at-2026-08-21`, `cache-diagnosis-2026-04-07`, and `spend-limit-reads-2026-09-26`.
- Example model in the source response: `claude-opus-5-5`.

## Related

- [models-list.md](./models-list.md)
