<!-- source: https://platform.claude.com/docs/en/api/completions/create.md / last verified: 2026-08-07 -->

# Create a Text Completion

[Legacy] Create a Text Completion. Superseded by the Messages API.

## Signature / Usage

```
POST /v1/complete
```

```bash
curl https://api.anthropic.com/v1/complete \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    --max-time 600 \
    -d '{
          "max_tokens_to_sample": 256,
          "model": "claude-2.1",
          "prompt": "\n\nHuman: Hello, world!\n\nAssistant:",
          "temperature": 1,
          "top_k": 5,
          "top_p": 0.7
        }'
```

## Options / Props

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-beta` | optional array of `AnthropicBeta` | Same beta flag list as [models-list.md](./models-list.md) |

### Body parameters

| Name | Type | Description |
|------|------|-------------|
| `max_tokens_to_sample` | number | Max tokens to generate before stopping |
| `model` | `Model` | Model ID, e.g. `"claude-2.1"`; same model ID set as [messages-create.md](./messages-create.md) `model` |
| `prompt` | string | Prompt formatted with alternating `\n\nHuman:` / `\n\nAssistant:` turns |
| `metadata` | optional object | `{ user_id: optional string }` — same as [messages-create.md](./messages-create.md) `metadata` |
| `stop_sequences` | optional array of string | Additional sequences that stop generation (models stop on `"\n\nHuman:"` built-in) |
| `stream` | optional boolean | Server-sent events streaming |
| `temperature` | optional number | 0.0–1.0, default 1.0 |
| `top_k` | optional number | Advanced sampling |
| `top_p` | optional number | Advanced nucleus sampling |

### Returns — `Completion` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique object identifier |
| `completion` | string | Resulting completion, up to and excluding stop sequences |
| `model` | `Model` | Model that generated the completion |
| `stop_reason` | string | `"stop_sequence"` or `"max_tokens"` |
| `type` | `"completion"` | Always `"completion"` |

## Notes

- **Deprecated / legacy surface.** Anthropic recommends the Messages API (`POST /v1/messages`, see [messages-create.md](./messages-create.md)) for all new development; future models and features will not be compatible with Text Completions.

## Related

- [messages-create.md](./messages-create.md)
