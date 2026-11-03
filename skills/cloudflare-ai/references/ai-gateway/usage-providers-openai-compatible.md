---
source: https://developers.cloudflare.com/ai-gateway/usage/providers/openai/, https://developers.cloudflare.com/ai-gateway/usage/providers/azureopenai/, https://developers.cloudflare.com/ai-gateway/usage/providers/groq/, https://developers.cloudflare.com/ai-gateway/usage/providers/mistral/, https://developers.cloudflare.com/ai-gateway/usage/providers/deepseek/, https://developers.cloudflare.com/ai-gateway/usage/providers/cerebras/, https://developers.cloudflare.com/ai-gateway/usage/providers/grok/, https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/, https://developers.cloudflare.com/ai-gateway/usage/providers/openrouter/, https://developers.cloudflare.com/ai-gateway/usage/providers/baseten/
---

# OpenAI-compatible providers

Provider-native gateway endpoints for OpenAI, Azure OpenAI, Groq, Mistral, DeepSeek, Cerebras, xAI, Perplexity, OpenRouter, and Baseten. Most accept the OpenAI SDK with a changed `baseURL`.

## Signature / Usage

OpenAI SDK with a provider key in the request (use the Cloudflare token header when the gateway is authenticated):

```js
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "YOUR_OPENAI_API_KEY",
	defaultHeaders: {
		"cf-aig-authorization": `Bearer {cf_api_token}`,
	},
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
});

const response = await client.chat.completions.create({
	model: "gpt-4o-mini",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

With stored keys (BYOK) or Unified Billing, the Cloudflare token is the API key:

```js
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
});

// Ensure your OpenAI API key is stored with BYOK
// or Unified Billing has credits
const response = await client.chat.completions.create({
	model: "gpt-4o-mini",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

Other providers (curl):

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq/chat/completions \
  --header 'Authorization: Bearer {groq_api_key}' \
  --header 'Content-Type: application/json' \
  --data '{
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ],
    "model": "llama3-8b-8192"
}'
```

```bash
curl 'https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway}/azure-openai/{resource_name}/{deployment_name}/chat/completions?api-version=2023-05-15' \
  --header 'Content-Type: application/json' \
  --header 'api-key: {azure_api_key}' \
  --data '{
  "messages": [
    {
      "role": "user",
      "content": "What is Cloudflare?"
    }
  ]
}'
```

DeepSeek with a stored key (omit `Authorization` so the gateway substitutes it):

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek/chat/completions \
 --header 'content-type: application/json' \
 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
 --data '{
    "model": "deepseek-chat",
    "messages": [
        {
            "role": "user",
            "content": "What is Cloudflare?"
        }
    ]
}'
```

## Options / Props

| Provider | Gateway base | Request path used in the docs | Model example | Notes |
|----------|-------------|-------------------------------|---------------|-------|
| OpenAI | `/openai` | `/chat/completions`, `/responses` | `gpt-4o-mini`, `gpt-5.1` | Replaces `https://api.openai.com/v1` |
| Azure OpenAI | `/azure-openai/{resource_name}/{deployment_name}` | `/chat/completions?api-version=2023-05-15` | deployment name | Header `api-key`; `AzureOpenAI` SDK `baseURL` is `.../azure-openai/{resource_name}/` with `apiVersion` |
| Groq | `/groq` | `/chat/completions` | `llama3-8b-8192` | Replaces `https://api.groq.com/openai/v1`; `groq-sdk` `baseURL` |
| Mistral | `/mistral` | `/v1/chat/completions` | `mistral-large-latest` | `@mistralai/mistralai` `serverURL` |
| DeepSeek | `/deepseek` | `/chat/completions` | `deepseek-chat` | BYOK supported |
| Cerebras | `/cerebras` | `/chat/completions` | `gpt-oss-120b` | Also via REST API with model `cerebras/{model}` |
| xAI | `/grok` | `/v1/chat/completions` | `grok-4` | Replaces `https://api.x.ai/v1`; OpenAI SDK JS and Python |
| Perplexity | `/perplexity-ai` | `/chat/completions` | `mistral-7b-instruct` (docs example) | Uses OpenAI SDK |
| OpenRouter | `/openrouter` | `/v1/chat/completions` | `openai/gpt-5-mini` | Token can be OpenRouter's or the original provider's |
| Baseten | `/baseten` | `/v1/chat/completions` | `openai/gpt-oss-120b` | OpenAI SDK `baseURL` is `.../baseten` |

## Notes

- Provider key goes in `Authorization: Bearer ...` for these (Azure uses `api-key`). Remove it when BYOK or Unified Billing is used, otherwise the supplied header is forwarded.
- Official examples inline provider tokens as literals (e.g. `Bearer MISTRAL_TOKEN`, `apiKey: "{baseten_api_token}"`); read them from environment variables or secret bindings (e.g. `env.GROQ_API_KEY`) instead.
- OpenRouter: the official page's URL-structure text maps to `/openrouter/chat/completions` while its curl example uses `/openrouter/v1/chat/completions`; follow the curl example form, and verify against OpenRouter's own base path if a request returns 404.
- Model names and parameters are the provider's; see openai-api-core for the OpenAI API itself.
- Apply gateway features (cache, rate limits, DLP, guardrails) to these endpoints as usual.

## Related

- [usage-providers-overview.md](./usage-providers-overview.md)
- [usage-chat-completion.md](./usage-chat-completion.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [features-unified-billing.md](./features-unified-billing.md)
