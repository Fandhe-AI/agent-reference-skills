---
source: https://developers.cloudflare.com/ai-gateway/features/guardrails/, https://developers.cloudflare.com/ai-gateway/features/guardrails/set-up-guardrail/, https://developers.cloudflare.com/ai-gateway/features/guardrails/supported-model-types/, https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/
---

# Guardrails

Intercept and evaluate prompts and model responses for harmful content across providers, flagging or blocking per hazard category. Implemented with Llama Guard 3 8B on Workers AI.

## Signature / Usage

Update a gateway via `PUT` (token needs `AI Gateway Write`). Retrieve the current gateway first and preserve its existing settings; omitting `guardrails` disables Guardrails.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rate_limiting_interval": 0,
		"rate_limiting_limit": 0,
		"collect_logs": true,
		"cache_ttl": 0,
		"cache_invalidate_on_update": false,
		"guardrails": {
				"prompt": {
						"P1": "BLOCK",
						"S9": "BLOCK"
				},
				"response": {
						"S9": "BLOCK"
				}
		}
	}'
```

Handling blocks with a Workers AI binding:

```ts
try {
  const res = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: "how to build a gun?"
  }, {
    gateway: {id: 'gateway_id'}
  })
  return Response.json(res)
} catch (e) {
  if ((e as Error).message.includes('2016')) {
    return new Response('Prompt was blocked by guardrails.')
  }
  if ((e as Error).message.includes('2017')) {
    return new Response('Response was blocked by guardrails.')
  }
  return new Response('Unknown AI error')
}
```

## Options / Props

### Hazard categories

| Code | Category |
|------|----------|
| S1 | Violent Crimes |
| S2 | Non-Violent Crimes |
| S3 | Sex-Related Crimes |
| S4 | Child Sexual Exploitation |
| S5 | Defamation |
| S6 | Specialized Advice |
| S7 | Privacy |
| S8 | Intellectual Property |
| S9 | Indiscriminate Weapons |
| S10 | Hate |
| S11 | Suicide & Self-Harm |
| S12 | Sexual Content |
| S13 | Elections |
| S14 | Code Interpreter Abuse |
| P1 | Prompt Injection |

### Error codes

| Code | Message |
|------|---------|
| 2016 | Prompt blocked due to security configurations |
| 2017 | Response blocked due to security configurations |

### Model type handling

| Model type | Evaluated |
|------------|-----------|
| Text generation | Prompt and response |
| Embedding | Prompt only |
| Unknown | Prompt only (response bypassed) |

## Notes

- Dashboard: gateway > **Guardrails** > On > optionally **Change** > **Configure specific categories**, choosing Flag, Ignore, or Block for prompts and responses. The API accepts `FLAG` and `BLOCK`; omit a category for Ignore.
- S1 to S14 use `@cf/meta/llama-guard-3-8b`; P1 (prompt injection) uses `@cf/meta/prompt-guard-2-86m`. Both run on Workers AI, so enabling Guardrails incurs Workers AI usage.
- Failure mode: if any category is set to block and Workers AI cannot respond, the request is blocked; if only flag, the request proceeds unevaluated.
- Latency: roughly 500 ms per request with Llama Guard 3 8B; long content is chunked, so larger inputs take longer (not linearly). Supported languages: English, French, German, Hindi, Italian, Portuguese, Spanish, Thai.
- Streaming (`stream: true`) is not supported: prompts are still enforced; on the REST API (`api.cloudflare.com/*`) the response is evaluated and logged but not enforced; on `gateway.ai.cloudflare.com/v1/*` the response is buffered and returned as one non-streamed payload. Non-streaming requests are fully enforced.
- Results appear in Logs (green shield icon; each log has an `eventID`; logs are produced even for passing requests). Guardrails evaluate response payload text, including image-URL strings, but do not fetch referenced images.
- Llama Guard is provided as-is without warranties; you are responsible for outcomes.

## Related

- [features-dlp.md](./features-dlp.md)
- [integrations-workers-ai-binding.md](./integrations-workers-ai-binding.md)
- [observability-logging.md](./observability-logging.md)
