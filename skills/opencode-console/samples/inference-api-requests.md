---
source: https://opencode.ai/docs/console/api/inference/
---

# Inference API Requests

Call a model through Console inference with the endpoint that matches its API family, then read the cost from the response.

```bash
curl -X POST "https://opencode.ai/inference/openai/v1/chat/completions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-5.3",
    "messages": [{ "role": "user", "content": "Say hi" }]
  }'
```

```bash
curl -X POST "https://opencode.ai/inference/openai/v1/responses" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "input": "Say hi"
  }'
```

```bash
curl -X POST "https://opencode.ai/inference/anthropic/v1/messages" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-5-5",
    "max_tokens": 1024,
    "messages": [{ "role": "user", "content": "Say hi" }]
  }'
```

```bash
curl -X POST "https://opencode.ai/inference/google/v1beta/models/gemini-4-argon:generateContent" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{ "parts": [{ "text": "Say hi" }] }]
  }'
```

List models, and the cost fields reported in `usage`:

```bash
curl https://opencode.ai/inference/v1/models
```

```json
"usage": {
  "prompt_tokens": 1200,
  "completion_tokens": 300,
  "cost": 0.00412,
  "opencode": {
    "billing_source": "balance",
    "list_cost": 0.00412,
    "tokens": { "input": 1200, "output": 300, "reasoning": 120, "cache_read": 8000, "cache_write_5m": 0, "cache_write_1h": 0 }
  }
}
```

## Notes

- Replace `<token>` with a personal API key or service account key; paid models require the `Authorization: Bearer <token>` header.
- Each model is served by one API family. Anthropic Messages requires `max_tokens`. Replace `:generateContent` with `:streamGenerateContent` to stream with Gemini.
- Free-tier chat models return HTTP `403` outside OpenCode, even with an API key.
- Cost is reported in `usage` (OpenAI, Anthropic) or `usageMetadata` (Gemini). `opencode.billing_source` is `free`, `balance`, `go`, `go-plus`, or `byok`.
- These are OpenCode Console endpoints, not the vendors' own APIs; use openai-api-core / anthropic-api-core for the vendor APIs.
