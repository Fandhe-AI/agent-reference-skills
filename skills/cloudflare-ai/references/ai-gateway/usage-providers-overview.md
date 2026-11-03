---
source: https://developers.cloudflare.com/ai-gateway/usage/providers/, https://developers.cloudflare.com/ai-gateway/usage/providers/openai/, https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/
---

# Provider-native endpoints overview

Provider-native endpoints keep each provider's original API schema and add AI Gateway features. Replace the provider's base URL with the gateway URL for that provider slug.

## Signature / Usage

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}
```

With a key stored in the gateway (BYOK) or Unified Billing credits, only the Cloudflare token is needed:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \
 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
 --header 'anthropic-version: 2023-06-01' \
 --header 'Content-Type: application/json' \
 --data  '{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "What is Cloudflare?"}
    ]
  }'
```

With a provider key in the request (and the Cloudflare token when the gateway is authenticated):

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/responses \
  --header 'Authorization: Bearer {OPENAI_API_KEY}' \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
  	"model": "gpt-5.1",
  	"input": [
    	{
      	"role": "user",
      	"content": "Write a one-sentence bedtime story about a unicorn."
    	}
  ]
  }'
```

## Options / Props

### Provider slugs, URL patterns, and auth headers

| Provider | Slug and base path | Example path | Provider credential header | Group page |
|----------|-------------------|--------------|----------------------------|-----------|
| OpenAI | `/openai` | `/chat/completions`, `/responses` | `Authorization: Bearer` | [usage-providers-openai-compatible.md](./usage-providers-openai-compatible.md) |
| Azure OpenAI | `/azure-openai/{resource_name}/{deployment_name}` | `/chat/completions?api-version=...` | `api-key` | openai-compatible |
| Groq | `/groq` | `/chat/completions` | `Authorization: Bearer` | openai-compatible |
| Mistral | `/mistral` | `/v1/chat/completions` | `Authorization: Bearer` | openai-compatible |
| DeepSeek | `/deepseek` | `/chat/completions` | `Authorization: Bearer` | openai-compatible |
| Cerebras | `/cerebras` | `/chat/completions` | `Authorization: Bearer` | openai-compatible |
| xAI (Grok) | `/grok` | `/v1/chat/completions` | `Authorization: Bearer` | openai-compatible |
| Perplexity | `/perplexity-ai` | `/chat/completions` | `Authorization: Bearer` | openai-compatible |
| OpenRouter | `/openrouter` | `/v1/chat/completions` | `Authorization: Bearer` | openai-compatible |
| Baseten | `/baseten` | `/v1/chat/completions` | `Authorization: Bearer` | openai-compatible |
| Anthropic | `/anthropic` | `/v1/messages` | `x-api-key` | [usage-providers-anthropic-bedrock-vertex-gemini.md](./usage-providers-anthropic-bedrock-vertex-gemini.md) |
| Amazon Bedrock | `/aws-bedrock/bedrock-runtime/{region}` | `/model/{model}/invoke` | AWS SigV4 (BYOK signs for you) | anthropic-bedrock-vertex-gemini |
| Google Vertex AI | `/google-vertex-ai/v1/projects/{project}/locations/{region}` | `/publishers/google/models/{model}:generateContent` | BYOK, service account JSON (base64) in `Authorization`, or `Authorization: Bearer <access token>` | anthropic-bedrock-vertex-gemini |
| Google AI Studio | `/google-ai-studio` | `/v1/models/{model}:generateContent` | `x-goog-api-key` | anthropic-bedrock-vertex-gemini |
| Workers AI | REST API `/ai/...` with `cf-aig-gateway-id`, or binding | `@cf/...` models | Cloudflare token | [usage-providers-others.md](./usage-providers-others.md) |
| Cohere | `/cohere` | `/v1/chat` | `Authorization: Token` | others |
| HuggingFace | `/huggingface` | `/{model}` e.g. `/bigcode/starcoder` | `Authorization: Bearer` | others |
| Replicate | `/replicate` | `/predictions` | `Authorization: Bearer` | others |
| Fal AI | `/fal` | `/fal-ai/fast-sdxl` | `Authorization: Key` | others |
| Ideogram | `/ideogram` | `/v1/ideogram-v3/generate` | `Api-Key` | others |
| Cartesia | `/cartesia` | `/tts/bytes` | `X-API-Key` (+ `Cartesia-Version`) | others |
| ElevenLabs | `/elevenlabs` | `/v1/text-to-speech/{voice_id}` | `xi-api-key` | others |
| Deepgram | `/deepgram` | WebSocket and REST | Deepgram key | others |
| Parallel | `/parallel` | `/v1/tasks/runs`, `/v1beta/search` | `x-api-key` | others |

### Authenticating to AI Gateway vs the provider

| Header | Purpose |
|--------|---------|
| `cf-aig-authorization: Bearer {CF_AIG_TOKEN}` | Authenticates to AI Gateway (required if the gateway is authenticated) |
| Provider header (table above) | Provider credential; omit it when using BYOK or Unified Billing |

## Notes

- When a stored key or Unified Billing is used, remove provider authorization headers; sending one forwards its value to the provider. Credential precedence is documented in [features-unified-billing.md](./features-unified-billing.md).
- Anthropic Messages: provider key must be in `x-api-key`; `Authorization: Bearer` is not recognized as provider credentials there.
- Provider-native endpoints work for these providers; for the OpenAI-compatible unified endpoint see [usage-chat-completion.md](./usage-chat-completion.md), for providers not listed see [configuration-custom-providers.md](./configuration-custom-providers.md).
- The request and response bodies are the provider's own; consult openai-api-core, anthropic-api-core, and google-gemini-api for API semantics. Placeholder tokens (`{...}`) in examples must be replaced from environment variables or secret bindings, never committed.

## Related

- [usage-providers-openai-compatible.md](./usage-providers-openai-compatible.md)
- [usage-providers-anthropic-bedrock-vertex-gemini.md](./usage-providers-anthropic-bedrock-vertex-gemini.md)
- [usage-providers-others.md](./usage-providers-others.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [configuration-authentication.md](./configuration-authentication.md)
