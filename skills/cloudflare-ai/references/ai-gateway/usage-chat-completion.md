---
source: https://developers.cloudflare.com/ai-gateway/usage/chat-completion/
---

# Unified API (OpenAI compat)

OpenAI-compatible `/compat/chat/completions` endpoint on `gateway.ai.cloudflare.com` for many providers behind one URL, with `{provider}/{model}` model names. Deprecated for single-model calls: use the REST API for new integrations; existing integrations and `dynamic/{route}` calls continue to work.

## Signature / Usage

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/default/compat/chat/completions
```

Provider key sent with the request on an authenticated gateway:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{openai_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`, 
  },
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "openai/gpt-6-luna",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

With a stored key (BYOK), the Cloudflare token is the API key:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "anthropic/claude-opus-5-5",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

curl:

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {google_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "google/gemini-4-argon",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

## Options / Props

### Model naming examples

| Model string | Provider |
|--------------|----------|
| `openai/gpt-5-mini` | OpenAI |
| `google-ai-studio/gemini-2.5-flash` | Google AI Studio |
| `anthropic/claude-sonnet-4-5` | Anthropic |
| `grok/grok-4.7` | xAI |
| `workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast` | Workers AI |
| `dynamic/customer-support` | A Dynamic Routing route |
| `custom-{slug}/{model-name}` | A custom provider |

### Supported providers

Anthropic, OpenAI, Groq, Mistral, Cohere, Perplexity, Workers AI, Google AI Studio, Google Vertex AI, xAI, DeepSeek, Cerebras, Baseten, Parallel.

## Notes

- Default gateway: `default` in the URL is created automatically on the first request; replace it with a specific gateway ID if you have one.
- Switch providers by changing `model` and `apiKey`. With BYOK or Unified Billing, the Cloudflare token goes in `apiKey` and no provider key is needed; otherwise send the provider key as `apiKey`/`Authorization` and the Cloudflare token in `cf-aig-authorization` (needed if the gateway is authenticated).
- The official page also shows `createAI` from `agents/models/ai-sdk` with `generateText` from `ai`, for the Cloudflare Agents SDK and Vercel AI SDK; see the vercel-ai-sdk skill for the AI SDK side.
- Keep tokens in environment variables or secret bindings, never literal values in source (placeholders above are from the source).
- Provider semantics for `chat.completions` belong to openai-api-core.

## Related

- [usage-rest-api.md](./usage-rest-api.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [configuration-custom-providers.md](./configuration-custom-providers.md)
- [usage-providers-overview.md](./usage-providers-overview.md)
- [configuration-authentication.md](./configuration-authentication.md)
