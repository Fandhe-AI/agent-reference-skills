---
source: https://developers.cloudflare.com/ai-gateway/features/dlp/, https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/
---

# Data Loss Prevention (DLP)

Scan AI Gateway prompts and responses for sensitive data using Cloudflare DLP detection profiles, with Flag or Block actions. Configured per gateway.

## Signature / Usage

Update a gateway via `PUT` (token needs `AI Gateway Write`). Retrieve the current gateway first and preserve its existing settings in the body; omitting `dlp` removes the DLP configuration.

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
		"dlp": {
				"enabled": true,
				"policies": [
						{
								"id": "block-financial-prompts",
								"enabled": true,
								"action": "BLOCK",
								"profiles": [
										"DLP_PROFILE_ID"
								],
								"check": [
										"REQUEST"
								]
						}
				]
		}
	}'
```

Handling blocks in a Worker:

```ts
try {
  const res = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: userInput
  }, {
    gateway: {id: 'your-gateway-id'}
  })
  return Response.json(res)
} catch (e) {
  if ((e as Error).message.includes('2029')) {
    return new Response('Request contains sensitive data and cannot be processed.')
  }
  if ((e as Error).message.includes('2030')) {
    return new Response('AI response was blocked due to sensitive content.')
  }
  return new Response('AI request failed')
}
```

## Options / Props

### Policy fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Unique policy name, e.g. `block-financial-prompts` |
| enabled | boolean | — | Enable or disable the policy |
| action | `FLAG` or `BLOCK` | — | Record only, or block the request/response |
| profiles | string[] | — | DLP profile IDs; matched against each selected profile |
| check | `REQUEST`, `RESPONSE` array | — | What to scan (dashboard: Request, Response, Both) |

### `cf-aig-dlp` response header

| Field | Description |
|-------|-------------|
| action | `BLOCK` or `FLAG` |
| findings[].profile.profile_id / entry_ids / context | Matched profile, detection entries, and context |
| findings[].policy_ids | Policies that matched |
| findings[].check | `REQUEST` or `RESPONSE` |

### Error codes

| Code | Message |
|------|---------|
| 2029 | Request content blocked due to DLP policy violations |
| 2030 | Response content blocked due to DLP policy violations |

### Caching interaction

| DLP outcome | Cached | Behavior |
|-------------|--------|----------|
| Pass | Yes | Cached normally |
| Flag | Yes | Cached; findings in `cf-aig-dlp` header and logs; original response returned |
| Block | No | Provider response discarded, replaced by a `400` DLP error |

## Notes

- Enable: gateway > **Firewall** tab > Data Loss Prevention On > **Add Policy**. Predefined profile families: Financial Information, PII, Government Identifiers, Healthcare Information, and custom profiles (managed in the Zero Trust DLP dashboard). Profiles are shared account-level objects with Cloudflare One DLP; policies and logs are separate (AI Gateway dashboard and logs). No Gateway proxy or TLS decryption is required.
- Inspection scope: text of request and response bodies (including tool call arguments/results in JSON). Base64 content, external URLs, and binary multipart parts are not inspected.
- Streaming: with response scanning on, the full streamed response is buffered before scanning, so time-to-first-token latency rises. Request-only scanning (Check = Request) does not buffer. Use separate gateways for latency-sensitive traffic.
- Cache hits skip DLP, and cached responses are not re-evaluated after a policy change until the TTL expires; use `cf-aig-skip-cache` to force a fresh scan.
- Policies are gateway-wide; there is no per-request header to select profiles or bypass DLP. Use separate gateways for different policies (e.g. per-tenant).
- Start with Flag before Block. Filter logs with **DLP Action** (FLAG/BLOCK). Log fields: DLP Action, Policies Matched, Profiles Matched, Entries Matched, Check.
- Troubleshooting: if DLP is not triggering, verify the toggle and that profiles fit your test data; for unexpected blocking, review the logs for the triggered profiles.

## Related

- [features-guardrails.md](./features-guardrails.md)
- [features-caching.md](./features-caching.md)
- [observability-logging.md](./observability-logging.md)
- [header-glossary.md](./header-glossary.md)
