---
source: https://developers.cloudflare.com/ai-gateway/usage/rest-api/
---

# REST API

Call third-party and Workers AI models through the Cloudflare API (`api.cloudflare.com`) with AI Gateway features (logging, caching, rate limiting) applied. No provider keys needed; billing through your Cloudflare account.

## Signature / Usage

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "cf-aig-gateway-id: default" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "anthropic/claude-sonnet-4",
    "messages": [
      {
        "role": "user",
        "content": "Hello"
      }
    ]
  }'
```

Universal `/ai/run` with a Workers AI model:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "cf-aig-gateway-id: default" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/moonshotai/kimi-k2.6",
    "input": {
      "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }
  }'
```

OpenAI SDK pointed at the Cloudflare API (read the token from an environment variable):

```javascript
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: CLOUDFLARE_API_TOKEN,
	baseURL: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`,
});

const response = await openai.chat.completions.create({
	model: "openai/gpt-4.1",
	messages: [{ role: "user", content: "What is Cloudflare?" }],
});
```

Background run with webhook:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "google/nano-banana",
    "input": {
      "prompt": "A cozy coffee shop interior with warm lighting, plants hanging from the ceiling, and a cat sleeping on a velvet armchair by the window",
      "aspect_ratio": "16:9"
    },
    "options": {
      "background": true,
      "webhookUrl": "https://example.com/my-webhook"
    }
  }'
```

## Options / Props

### Endpoints

| Endpoint | Format | Third-party models | Workers AI (`@cf/`) |
|----------|--------|--------------------|---------------------|
| `POST /ai/run` | Envelope with `model`, `input`; all modalities | Yes | Yes |
| `POST /ai/v1/chat/completions` | OpenAI chat completions | Yes | Yes |
| `POST /ai/v1/responses` | OpenAI Responses API | Yes | Model dependent (e.g. GPT-OSS) |
| `POST /ai/v1/messages` | Anthropic Messages API | Yes | No |

### Per-request headers

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-gateway-id | string | default gateway | Gateway to route through; required for Workers AI requests |
| cf-aig-skip-cache | boolean | — | Skip cache |
| cf-aig-cache-ttl | number (seconds) | — | Cache TTL |
| cf-aig-cache-key | string | — | Custom cache key |
| cf-aig-collect-log | boolean | — | Turn logging on/off for the request |
| cf-aig-request-timeout | number (ms) | — | Request timeout |
| cf-aig-max-attempts | number | — | Retry attempts (max 5) |
| cf-aig-retry-delay | number (ms) | — | Retry delay (max 60000) |
| cf-aig-backoff | string | — | `constant`, `linear`, or `exponential` |
| cf-aig-metadata | JSON string | — | Custom metadata for the log entry |

### `/ai/run` background `options`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| background | boolean | false | Run asynchronously (long-running image/video/audio generation) |
| webhookUrl | string | — | HTTPS URL notified when the run completes; requires `background: true` (else `400`) |
| webhookFormat | `raw` or `chat` | `raw` | `chat` wraps payload as `{ "text": "<prettified JSON>" }` (Google Chat / Slack incoming webhooks); requires `webhookUrl` (else `400`) |

Webhook payload: `id`, `state`, `result`, `error`, `provider`, `model`, `usage`.

## Notes

- Model naming: third-party `author/model` (e.g. `openai/gpt-4.1`, `anthropic/claude-sonnet-4`, `xai/grok-3`); Workers AI `@cf/author/model` (e.g. `@cf/moonshotai/kimi-k2.6`). Catalog: https://developers.cloudflare.com/ai/models/.
- Authentication: token with **Account > Workers AI > Read**, passed as `Authorization`. All `/accounts/{account_id}/ai/*` endpoints need it; a token with only AI Gateway permissions gets `401` (code `10000`). AI Gateway permissions apply to `/accounts/{account_id}/ai-gateway/*` management endpoints.
- Third-party models bill via Unified Billing (load credits first); Workers AI can use prepaid credits (gateway set to Unified billing, model-in-path endpoint `/ai/run/@cf/author/model`, with `cf-aig-gateway-id`) or Workers AI billing.
- `/ai/v1/messages` is strictly the Anthropic schema. Claude Code uses the Anthropic Messages API and cannot use `/ai/v1/chat/completions` or `/ai/run`; see [integrations-coding-agents.md](./integrations-coding-agents.md).
- Webhook delivery is best-effort with no retries; the destination must be an HTTPS URL that does not resolve to a private network address. Treat incoming webhook bodies as untrusted and authenticate them in your receiver.
- Provider SDK semantics: openai-api-core / anthropic-api-core skills. Native provider tools and web search: [usage-web-search.md](./usage-web-search.md).
- Keep `CLOUDFLARE_API_TOKEN` in an environment variable or secret binding.

## Related

- [usage-chat-completion.md](./usage-chat-completion.md)
- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [usage-web-search.md](./usage-web-search.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [configuration-request-handling.md](./configuration-request-handling.md)
