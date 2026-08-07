<!-- source: https://platform.claude.com/docs/en/api/models/retrieve.md / last verified: 2026-08-07 -->

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

Returns a single `ModelInfo` object — same shape as [models-list.md](./models-list.md) `data[]` (`id`, `display_name`, `created_at`, `max_input_tokens`, `max_tokens`, `type: "model"`, `capabilities`).

## Related

- [models-list.md](./models-list.md)
