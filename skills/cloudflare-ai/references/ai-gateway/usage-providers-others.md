---
source: https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/, https://developers.cloudflare.com/ai-gateway/usage/providers/cohere/, https://developers.cloudflare.com/ai-gateway/usage/providers/huggingface/, https://developers.cloudflare.com/ai-gateway/usage/providers/replicate/, https://developers.cloudflare.com/ai-gateway/usage/providers/fal/, https://developers.cloudflare.com/ai-gateway/usage/providers/ideogram/, https://developers.cloudflare.com/ai-gateway/usage/providers/cartesia/, https://developers.cloudflare.com/ai-gateway/usage/providers/elevenlabs/, https://developers.cloudflare.com/ai-gateway/usage/providers/deepgram/, https://developers.cloudflare.com/ai-gateway/usage/providers/parallel/
---

# Workers AI, Cohere, HuggingFace, Replicate, media, and search providers

Gateway endpoints for Workers AI and providers with non-OpenAI schemas: Cohere, HuggingFace, Replicate, Fal AI, Ideogram, Cartesia, ElevenLabs, Deepgram, and Parallel.

## Signature / Usage

Workers AI through a binding with gateway options:

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const response = await env.AI.run(
			"@cf/meta/llama-3.1-8b-instruct",
			{
				prompt: "Why should you use Cloudflare for your AI inference?",
			},
			{
				gateway: {
					id: "{gateway_id}",
					skipCache: false,
					cacheTtl: 3360,
				},
			},
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

Replicate:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions \
  --header 'Authorization: Bearer {replicate_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "version": "anthropic/claude-4.5-haiku",
    "input":
      {
        "prompt": "Write a haiku about Cloudflare"
      }
    }'
```

Cartesia text-to-speech:

Adapted (not in the official docs): the official request body is missing the closing single quote; it is added here so the command runs.

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cartesia/tts/bytes \
  --header 'Content-Type: application/json' \
  --header 'Cartesia-Version: 2024-06-10' \
  --header 'X-API-Key: {cartesia_api_token}' \
  --data '{
    "transcript": "Welcome to Cloudflare - AI Gateway!",
    "model_id": "sonic-english",
    "voice": {
        "mode": "id",
        "id": "694f9389-aac1-45b6-b726-9d9369183238"
    },
    "output_format": {
        "container": "wav",
        "encoding": "pcm_f32le",
        "sample_rate": 44100
    }
}'
```

Parallel Tasks API:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel/v1/tasks/runs \
  --header 'x-api-key: {parallel_api_key}' \
  --header 'Content-Type: application/json' \
  --data '{
    "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
    "processor": "ultra"
  }'
```

## Options / Props

| Provider | Gateway base | Example request path | Provider header | Notes |
|----------|-------------|----------------------|-----------------|-------|
| Workers AI | REST API (`@cf/` models + `cf-aig-gateway-id`) or `env.AI.run()` | `/ai/v1/chat/completions`, `/ai/run` | Cloudflare token | Binding `gateway` options: `id`, `skipCache` (default false), `cacheTtl`; prepaid credits via gateway Workers AI billing = Unified billing |
| Cohere | `/cohere` | `/v1/chat` | `Authorization: Token {cohere_api_token}` | Replaces `https://api.cohere.ai/v1`; Python SDK supported |
| HuggingFace | `/huggingface` | `/bigcode/starcoder` (model follows the base) | `Authorization: Bearer {hf_api_token}` | `HfInferenceEndpoint` base URL includes the model |
| Replicate | `/replicate` | `/predictions` | `Authorization: Bearer {replicate_api_token}` | Replaces `https://api.replicate.com/v1` |
| Fal AI | `/fal` | `/fal-ai/fast-sdxl` | `Authorization: Key {fal_ai_token}` | Replaces `https://fal.run`; `x-fal-target-url` header supplies a full Fal target URL (e.g. `https://queue.fal.run/...`) |
| Ideogram | `/ideogram` | `/v1/ideogram-v3/generate` | `Api-Key` | Body `prompt`, `model` (`V_3`) |
| Cartesia | `/cartesia` | `/tts/bytes` | `X-API-Key`, `Cartesia-Version: 2024-06-10` | Replaces `https://api.cartesia.ai/v1` |
| ElevenLabs | `/elevenlabs` | `/v1/text-to-speech/{voice_id}?output_format=mp3_44100_128` | `xi-api-key` | Body `text`, `model_id` |
| Deepgram | `/deepgram` | WebSocket `wss://.../deepgram/` | Deepgram key; `cf-aig-authorization` via `_nodeOnlyHeaders` | `@deepgram/sdk` `listen.live`; also available through Workers AI |
| Parallel | `/parallel` | `/v1/tasks/runs`, `/v1beta/search` | `x-api-key` | Any Parallel path can be appended |

## Notes

- Provider tokens in examples are placeholders; read them from environment variables or secrets and omit them entirely when BYOK or Unified Billing supplies the key.
- Corrected from the official docs: closing quote added to the Cartesia body.
- Fal: only use `x-fal-target-url` with URLs you control or trust; do not let end users choose the target through your own front end, since it makes the gateway forward requests to arbitrary Fal hosts.
- Workers AI model names, rate limits, and local-dev charges are covered in [integrations-workers-ai-binding.md](./integrations-workers-ai-binding.md) and the Workers AI category ([overview.md](../workers-ai/overview.md)).
- Parallel Search API example is in [usage-web-search.md](./usage-web-search.md).

## Related

- [usage-providers-overview.md](./usage-providers-overview.md)
- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [usage-rest-api.md](./usage-rest-api.md)
- [usage-websockets-api.md](./usage-websockets-api.md)
