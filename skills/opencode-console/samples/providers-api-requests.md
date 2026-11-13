---
source: https://opencode.ai/docs/console/api/providers/
---

# Providers API Requests

Call a provider connected to your workspace through its Console API URL with a service account key.

```text
https://opencode.ai/inference/custom/<connection_id>
```

```bash
curl -X POST "https://opencode.ai/inference/custom/conn_.../chat/completions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4.1-flash",
    "messages": [{ "role": "user", "content": "Say hi" }]
  }'
```

```bash
curl -X POST "https://opencode.ai/inference/custom/conn_.../responses" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "input": "Say hi"
  }'
```

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

```bash
curl -X POST "https://opencode.ai/inference/custom/conn_.../models/gemini-4-argon:generateContent" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{ "parts": [{ "text": "Say hi" }] }]
  }'
```

## Notes

- Copy the **Console API URL** from the provider's page under **Providers**; append the provider's API path (`/chat/completions`, `/responses`, `/messages`, `/models/<model>:generateContent`).
- `<token>` is a service account key. Console also reads it from `x-api-key`, `api-key`, or `x-goog-api-key`, so provider SDKs work when pointed at the Console API URL.
- Console adds the provider credential before forwarding, so the provider secret never leaves the workspace. Models not enabled on the connection are rejected.
- Anthropic-compatible requests require `max_tokens`. Requests count toward budgets using each model's configured pricing; the provider bills the tokens.
