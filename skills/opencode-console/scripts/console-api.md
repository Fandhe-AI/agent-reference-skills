---
source: https://opencode.ai/docs/console/api/inference/
---

# Console API Requests

Copy-paste curl commands for the OpenCode Console Inference API, Providers API, and model list endpoints.

## Signature / Usage

### Authenticate with a key

Snippet taken from https://opencode.ai/docs/console/api/

```bash
curl --fail-with-body "https://opencode.ai/inference/v1/models" \
  --header "Authorization: Bearer oc_sk_..."
```

### Store a service account key

Snippet taken from https://opencode.ai/docs/console/api/

```bash
export SERVICE_API_KEY="oc_sk_..."
```

### List available models

```bash
curl https://opencode.ai/inference/v1/models
```

Go models:

```bash
curl https://opencode.ai/inference/go/v1/models
```

### OpenAI Chat Completions

```bash
curl -X POST "https://opencode.ai/inference/openai/v1/chat/completions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-5.3",
    "messages": [{ "role": "user", "content": "Say hi" }]
  }'
```

### OpenAI Responses

```bash
curl -X POST "https://opencode.ai/inference/openai/v1/responses" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "input": "Say hi"
  }'
```

### Anthropic Messages

`max_tokens` is required.

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

### Gemini

Replace `:generateContent` with `:streamGenerateContent` to stream the response.

```bash
curl -X POST "https://opencode.ai/inference/google/v1beta/models/gemini-4-argon:generateContent" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{ "parts": [{ "text": "Say hi" }] }]
  }'
```

### Providers API: Chat Completions

Source: https://opencode.ai/docs/console/api/providers/ (`conn_...` is the connection ID from the provider's **Console API URL**).

```bash
curl -X POST "https://opencode.ai/inference/custom/conn_.../chat/completions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4.1-flash",
    "messages": [{ "role": "user", "content": "Say hi" }]
  }'
```

### Providers API: Responses

```bash
curl -X POST "https://opencode.ai/inference/custom/conn_.../responses" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "input": "Say hi"
  }'
```

### Providers API: Anthropic Compatible

`max_tokens` is required.

```bash
curl -X POST "https://opencode.ai/inference/custom/conn_.../messages" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-5-5",
    "max_tokens": 1024,
    "messages": [{ "role": "user", "content": "Say hi" }]
  }'
```

### Providers API: Google Generative AI

```bash
curl -X POST "https://opencode.ai/inference/custom/conn_.../models/gemini-4-argon:generateContent" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{ "parts": [{ "text": "Say hi" }] }]
  }'
```

### System One (Jev) request

Source: https://opencode.ai/docs/console/models/

```bash
curl https://opencode.ai/inference/systemone/v1/systemone \
  -H "Authorization: Bearer $OPENCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "jev-1.13",
    "state": "My payments have failed for three days and I am losing sales. Please help now.",
    "questions": {
      "is_urgent": {
        "type": "noul",
        "instructions": "Does this request require urgent attention?"
      }
    }
  }'
```

## Notes

- Replace `<token>` and `oc_sk_...` with your own key. The full key is shown only once at creation; do not commit it.
- Free-tier chat models are only available from within OpenCode; other clients receive HTTP `403`, even with an API key.
- Requests outside a key's permissions return HTTP `403`; revoked and expired keys return HTTP `401`.
- Sources: https://opencode.ai/docs/console/api/, https://opencode.ai/docs/console/api/providers/, https://opencode.ai/docs/console/models/, https://opencode.ai/docs/console/go/.
- The Console API calls OpenCode's hosted gateway; the Claude / OpenAI / Gemini API specs themselves belong to anthropic-api-core / openai-api-core / google-gemini-api.

## Related

- [Harness setup commands](./harnesses.md)
