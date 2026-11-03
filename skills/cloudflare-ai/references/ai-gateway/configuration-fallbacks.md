---
source: https://developers.cloudflare.com/ai-gateway/configuration/fallbacks/
---

# Fallbacks

Specify model or provider fallbacks on the (deprecated) Universal endpoint to handle request failures. A fallback is triggered by a request error or a configured request timeout.

## Signature / Usage

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id} \
  --header 'Content-Type: application/json' \
  --data '[
  {
    "provider": "workers-ai",
    "endpoint": "@cf/meta/llama-3.1-8b-instruct",
    "headers": {
      "Authorization": "Bearer {cloudflare_token}",
      "Content-Type": "application/json"
    },
    "query": {
      "messages": [
        {
          "role": "system",
          "content": "You are a friendly assistant"
        },
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }
  },
  {
    "provider": "openai",
    "endpoint": "chat/completions",
    "headers": {
      "Authorization": "Bearer {open_ai_token}",
      "Content-Type": "application/json"
    },
    "query": {
      "model": "gpt-4o-mini",
      "stream": true,
      "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }
  }
]'
```

## Options / Props

### Response header `cf-aig-step`

| Value | Meaning |
|-------|---------|
| `0` | Primary (first) model succeeded |
| `1` | Fell back to the second model |
| `2` | Fell back to the third model |
| n | Each further fallback increments by 1 |

## Notes

- By default a fallback fires when a model request returns an error. Add more fallbacks by appending objects to the array. Timeouts can also trigger fallback; see [configuration-request-handling.md](./configuration-request-handling.md).
- The Universal endpoint is deprecated; for new work use Dynamic Routing for fallbacks.
- Flow: AI Gateway tries Workers AI; on failure it proceeds to the OpenAI request.

## Related

- [usage-universal-endpoint.md](./usage-universal-endpoint.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [configuration-request-handling.md](./configuration-request-handling.md)
