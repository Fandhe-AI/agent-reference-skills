---
source: https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/
---

# OpenAI compatible API endpoints

Call Workers AI through the standard OpenAI SDK by swapping `baseURL`: Chat Completions (`/v1/chat/completions`), Embeddings (`/v1/embeddings`), and Responses (`/v1/responses`, GPT-OSS only).

## Signature / Usage

```js
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: env.CLOUDFLARE_API_KEY,
	baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
});

const chatCompletion = await openai.chat.completions.create({
	messages: [{ role: "user", content: "Make some robot noises" }],
	model: "@cf/meta/llama-3.1-8b-instruct",
});

const embeddings = await openai.embeddings.create({
	model: "@cf/baai/bge-large-en-v1.5",
	input: "I love matcha",
});
```

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions \
  --header "Authorization: Bearer {api_token}" \
  --header "Content-Type: application/json" \
  --data '
    {
      "model": "@cf/meta/llama-3.1-8b-instruct",
      "messages": [
        {
          "role": "user",
          "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
        }
      ]
    }
'
```

GPT-OSS Responses API:

```js
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: env.CLOUDFLARE_API_KEY,
	baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
});

const response = await openai.responses.create({
	model: "@cf/openai/gpt-oss-120b",
	input: "Talk to me about open source",
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| baseURL | string | — | `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`. |
| apiKey | string | — | Workers AI API token. |
| model | string | — | Workers AI model ID, for example `@cf/meta/llama-3.1-8b-instruct`. |
| options.rejectIfBusy | boolean | — | Top-level request-body field for synchronous Chat Completions; fails fast when capacity is unavailable. |
| stream | boolean | — | Responses requests must use `stream: false`; only `false` is supported. |

## Notes

- Most Workers AI text generation models support Chat Completions; embedding models support the Embeddings API.
- The Responses API works only with `@cf/openai/gpt-oss-120b` and `@cf/openai/gpt-oss-20b`, non-streaming.
- OpenAI clients that remove unknown fields do not send `options.rejectIfBusy`, so requests proceed normally.
- These endpoints are also compatible with AI Gateway (see the AI Gateway category of this skill; see integrations-workers-ai-binding.md (https://developers.cloudflare.com/ai-gateway/integrations/aig-workers-ai-binding/)).
- The `openai` SDK itself (client API, models, Responses semantics on OpenAI) is covered by openai-api-core; this page covers only the Workers AI base URL and supported endpoints. Anthropic and Gemini SDKs: anthropic-api-core, google-gemini-api.
- Keep the token in a Worker secret (`env.CLOUDFLARE_API_KEY` here), never in client-side code.

## Related

- [REST API](./rest-api.md)
- [Reject busy requests](./reject-if-busy.md)
- [Limits](./limits.md)
- [Errors](./errors.md)
