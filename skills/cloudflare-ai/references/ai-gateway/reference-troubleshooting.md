---
source: https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/
---

# Troubleshooting

Common AI Gateway issues and error codes: authentication errors, provider-credential errors, Unified Billing and credit errors, bad requests (7003), request failures, and caching surprises.

## Signature / Usage

Anthropic Messages needs the provider key in `x-api-key` while the Cloudflare token goes in `cf-aig-authorization`:

Snippet taken from https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/ (BYOK request; remove provider headers when the key is stored)

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  -H 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4", "messages": [...]}'
```

## Options / Props

### Error codes seen in this skill

| Code | Meaning | Where |
|------|---------|-------|
| 400 / 2044 | `Customer-provided provider credentials are required for this request` | Unified Billing fallback blocked and no credentials found |
| 401 / 2009 | Provider rejected the credentials or the stored BYOK key (`Credential error: your credential is invalid or was rejected by the provider` on `/ai/run` and the AI binding); Unified Billing requests return `503` instead | Notes |
| 403 / 2049 | Unified Billing not available for the request | Notes |
| 402 / 2052 | Insufficient Unified Billing balance | Notes |
| 402 / 2021 | Payment error (BYOK provider payment rejected, or credits ran out) | Notes |
| 429 / 2018 | Unified Billing request rate limit (not a balance problem) | Notes; reference-limits |
| 503 / 7005 | Unified Billing temporarily unavailable for the provider | Notes |
| 403 / 2042 | AI Gateway is not enabled for this account | Notes |
| 403 / 2036 | Feature not enabled for this gateway (or Access integration not enabled) | Notes |
| 400 / 7003 | General bad request (`Model execution failed (User Input Error): <REASON>`) | Notes |
| 500 / 2002 | `Model execution failed (Error)` | Notes |
| 400 / 2005 | `Failed to get response from provider` | Notes |
| 2016 / 2017 | Prompt / response blocked by Guardrails | [features-guardrails.md](./features-guardrails.md) |
| 2029 / 2030 | Request / response blocked by DLP | [features-dlp.md](./features-dlp.md) |
| 429 | Rate limit or spend limit exceeded; Unified Billing rate limit | rate-limiting, spend limits, limits |

## Notes

- 401 or unauthenticated from the provider: AI Gateway did not pass valid credentials upstream. On provider-native endpoints put the Cloudflare token in `cf-aig-authorization` and supply provider credentials in the format recognized for that provider (Anthropic Messages: `x-api-key`; OpenAI: `Authorization: Bearer`). Provider-specific endpoints need the provider path in the URL (e.g. `/openai/`, `/google-vertex-ai/`); the unified `/compat/chat/completions` endpoint needs the provider prefix in `model` (e.g. `openai/gpt-4o`). With multiple BYOK keys, use alias `default` or send `cf-aig-byok-alias`; confirm in the dashboard that credentials saved.
- Error 2044 occurs when **Require provider credentials** is on or `cf-aig-no-wholesale: true` is sent and no request or stored credentials apply. Fix by supplying a recognized provider key, or verifying gateway authentication and the BYOK alias.
- Source: https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/ (pin 34d908a / fetched 2026-11-14).
- ### Unified Billing and credit errors (messages verbatim from the official page)
  - `2049` (HTTP `403`), checked in this order, first match returned: `Gateway authentication is required to use unified billing. Enable authentication on your gateway or provide your own API key (BYOK).` (turn on authentication or use BYOK); `This request requires customer-provided provider credentials, but no applicable provider key was found.` (Require provider credentials or `cf-aig-no-wholesale: true`; supply a provider key, see `2044`); `Unified billing is not enabled for this gateway. Provide your own API key (BYOK) or contact Cloudflare support.`; `Insufficient balance; add money to your gateway or use BYOK` (load credits; can also come with `2021`).
  - `2052` (HTTP `402`): `Insufficient unified billing balance for this request. Your available balance is $<AMOUNT>. Add credits on the AI Gateway Cloudflare dashboard, or use your own provider key (BYOK).` The response includes an `extra` object with `reason: insufficient_balance` and `availableBalanceCents`. Fix: load credits, set up auto top-up, or use BYOK.
  - `2021` (HTTP `402`): `Payment error from model using BYOK: <DETAILS>` (provider rejected payment on your own key; check the key's billing with the provider, or remove the stored key to use Unified Billing credits) or `Insufficient balance; add money to your gateway or use BYOK` with description `Insufficient AI Gateway credits` (see `2052`).
  - `2018` (HTTP `429`): gateway exceeded the Unified Billing request rate limit; on `/ai/run` and the AI binding the message is `Unified billing rate limit exceeded for this gateway. Please reduce request rate or use BYOK.` Reduce the rate and retry with exponential backoff, or use BYOK (the limit does not apply to BYOK requests).
  - `7005` (HTTP `503`): `Unified billing is temporarily unavailable for this provider; retry, or configure your own provider API key (BYOK).` Retry later or use BYOK.
  - `2009` (HTTP `401`): check the key with the provider; update the request key or the stored BYOK key.
- Account access: `2042` (HTTP `403`, `AI Gateway is not enabled for this account`) and `2036` (HTTP `403`, `This feature is not enabled for this gateway`; with Cloudflare Access on a custom domain the message is `AI Gateway Access integration is not enabled for this account`) are resolved by contacting Cloudflare Support.
- ### 400: Bad request (7003)
  - General bad-request code when AI Gateway or the provider rejects a request as invalid and no more specific code applies. Message usually `Model execution failed (User Input Error): <REASON>`; for provider rejections `<REASON>` is the provider's own message. Read the full message (it usually names the rejected field) and fix the request before retrying.
  - Through the AI binding (`env.AI.run()`) the error may only show `AiGatewayError: 7003: User Input Error` with no reason; send the same request through the REST API to see the full message. If logging or payload collection is off, AI Gateway does not store the error message, so record the error response in the application or turn logging on while reproducing.
  - Known causes (cause: example; resolution): provider requirement not met (`'messages' must contain the word 'json' in some form, to use 'response_format' of type 'json_object'`; include the word "JSON" in the prompt); field not accepted by the model, such as `watermark: false` sent to an image model (remove fields not listed on the model's catalog page); wrong shape for a third-party model on the AI binding (`Unsupported field passed: input. Valid fields: prompt, ...`; pass the input object directly, not wrapped in `input`; the `/ai/run` REST endpoint does expect an `input` field); dynamic route called on `/ai/run` (`messages: Invalid input: expected array, received undefined`; call dynamic routes via `/ai/v1/chat/completions` or the AI binding); model ID not recognized, HTTP `404` (`Model not found: <MODEL_ID>`; use the exact catalog ID); tool not supported on the endpoint (`tools: [{"type":"web_search"}]` sent to an xAI model on Chat Completions; see Web search page); input too large, HTTP `413` (`Run input is too large`); model access denied, HTTP `403` (`Model execution failed (Model access denied): <REASON>`); model not available in region, HTTP `451` (`Model execution failed (Model unavailable in this region): <REASON>`); dynamic route not found, HTTP `404` (`Dynamic route '<ROUTE_NAME>' not found`; check the route name and that the request targets the owning gateway); wrong URL or account ID on the Cloudflare API (`Could not route to /accounts/..., perhaps your object identifier is invalid?`, returned with error `7000` `No route for that URI`).
- `2002` (HTTP `500`, `Model execution failed (Error)`): retry, or set up dynamic routes with a fallback model. `2005` (HTTP `400`, `Failed to get response from provider`): check the provider's status page and retry.
- Timeouts: check provider health; consider dynamic routes with fallbacks; review rate limiting. Provider errors: verify keys directly with the provider, check its status page, read AI Gateway logs.
- Not cached: confirm caching is enabled and the request is cacheable; streaming responses are not cached by default. Unexpected hits/misses: review TTL, `cf-aig-skip-cache`, and custom `cf-aig-cache-key` usage.
- Vertex AI specifics: [usage-providers-anthropic-bedrock-vertex-gemini.md](./usage-providers-anthropic-bedrock-vertex-gemini.md). DLP troubleshooting: see [features-dlp.md](./features-dlp.md).

## Related

- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [features-caching.md](./features-caching.md)
- [observability-logging.md](./observability-logging.md)
