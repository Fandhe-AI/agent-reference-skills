---
source: https://developers.cloudflare.com/ai-gateway/usage/universal/
---

# Universal Endpoint (Deprecated)

Single endpoint that accepts an array of provider requests, with fallbacks, timeouts, and retries. Deprecated: use the OpenAI-compatible endpoint for new integrations and Dynamic Routing for fallbacks, retries, and conditional routing. It continues to work for existing integrations.

## Signature / Usage

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}
```

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

### Array entry fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| provider | string | — | Provider name (OpenAI, workers-ai, or any supported provider) |
| endpoint | string | — | Pathname of the provider API, e.g. `chat/completions` or `@cf/meta/llama-3.1-8b-instruct` |
| authorization | string | — | Content of the Authorization HTTP header for this provider (usually starts with `Token` or `Bearer`) |
| query | object | — | Payload as the provider's official API expects it |
| config | object | — | Per-provider retry / timeout settings (below) |

### `config` properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| requestTimeout | number | — | Timeout in milliseconds; triggers fallback if the first part of the response is not received in time |
| maxAttempts | number | — | Maximum retry attempts (up to 5) |
| retryDelay | number | — | Delay before retrying, in ms (maximum 60 seconds) |
| backoff | "constant" \| "linear" \| "exponential" | — | Backoff method |

## Notes

- Fallback: the array defines the sequence; if an entry fails (error, or timeout when configured), the next entry is tried. Response header `cf-aig-step` is `0` for the primary, `1` for the first fallback, and so on.
- Retries (max five) happen before fallbacks. On the final retry attempt the gateway waits for the request to complete regardless of duration. Streaming responses satisfy the timeout once the first part arrives.
- Header precedence: provider-level headers override request-level headers, which override gateway settings. E.g. a request-level `cf-aig-cache-ttl: 3600` with a provider-level `"cf-aig-cache-ttl": "0"` on the OpenAI entry disables caching for OpenAI responses.
- The WebSockets API exposes the same endpoint over a persistent connection; see [usage-websockets-api.md](./usage-websockets-api.md).
- Corrected from the official docs: the timeout example had a trailing comma after the last `config` object (invalid JSON); the example below removes it and shortens the messages.
- Provider payload formats belong to the provider APIs themselves (openai-api-core, anthropic-api-core, google-gemini-api skills). Pass provider keys only in headers, never in URLs.

Adapted (not in the official docs): trailing comma removed so the JSON body is valid; see Notes.

```bash
curl 'https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}' \
  --header 'Content-Type: application/json' \
  --data '[
    {
        "provider": "workers-ai",
        "endpoint": "@cf/meta/llama-3.1-8b-instruct",
        "headers": {
            "Authorization": "Bearer {cloudflare_token}",
            "Content-Type": "application/json"
        },
        "config": {
            "requestTimeout": 1000
        },
        "query": {
            "messages": [
                {
                    "role": "user",
                    "content": "What is Cloudflare?"
                }
            ]
        }
    },
    {
        "provider": "workers-ai",
        "endpoint": "@cf/meta/llama-3.1-8b-instruct-fast",
        "headers": {
            "Authorization": "Bearer {cloudflare_token}",
            "Content-Type": "application/json"
        },
        "config": {
            "maxAttempts": 4,
            "retryDelay": 1000,
            "backoff": "exponential"
        },
        "query": {
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

## Related

- [usage-chat-completion.md](./usage-chat-completion.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [configuration-fallbacks.md](./configuration-fallbacks.md)
- [configuration-request-handling.md](./configuration-request-handling.md)
- [usage-websockets-api.md](./usage-websockets-api.md)
- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
