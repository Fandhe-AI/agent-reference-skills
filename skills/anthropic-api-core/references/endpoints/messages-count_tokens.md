<!-- source: https://platform.claude.com/docs/en/api/messages/count_tokens.md / last verified: 2026-08-07 -->

# Count Tokens in a Message

Count the number of tokens a Message request would use (including tools, images, documents) without creating it.

## Signature / Usage

```
POST /v1/messages/count_tokens
```

```bash
curl https://api.anthropic.com/v1/messages/count_tokens \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "model": "claude-opus-5-5",
          "messages": [{"role": "user", "content": "Hello, world"}]
        }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anthropic-user-profile-id` (header) | optional string | Same semantics as in Create a Message |
| `messages` | array of `MessageParam` | Same shape as [messages-create.md](./messages-create.md) `messages` |
| `model` | `Model` | Same model IDs as [messages-create.md](./messages-create.md), including `claude-haiku-5-5`, `claude-sonnet-5-5`, `claude-fable-5-1`, `claude-opus-5-5`, `claude-mythos-5-1` |
| `speed` | optional `"standard"` \| `"fast"` \| null | Inference speed mode for this request. Some models require the `fast-mode-2026-02-01` beta header for any `speed` value (see fast mode) |
| `system`, `tools`, `tool_choice`, `thinking` | optional | Same shape as `messages-create.md`; included only to influence the token count |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `input_tokens` | number | Total number of tokens across the provided messages, system prompt, and tools |

## Notes

- Accepts the same request body shape as `POST /v1/messages` (see [messages-create.md](./messages-create.md)) minus `max_tokens`/sampling params, but does not create a Message or consume generation quota.

## Related

- [messages-create.md](./messages-create.md)
