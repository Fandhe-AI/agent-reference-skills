---
source: https://developers.cloudflare.com/ai-gateway/tutorials/pruna-p-video/
---

# Call Replicate (Pruna P-video) through AI Gateway

Route a Replicate prediction through AI Gateway, synchronously with `Prefer: wait` or asynchronously with polling.

## Signature / Usage

Replace the Replicate base URL with the gateway URL:

```txt
# Instead of:
https://api.replicate.com/v1

# Use:
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate
```

Synchronous request (predictions under Replicate's 60-second synchronous limit).

Adapted (not in the official docs): the token placeholders are shell variables so the secrets are not typed inline; see Notes.

```bash
curl "https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_ID}/${CF_GATEWAY_ID}/replicate/predictions" \
  --header "Authorization: Bearer ${REPLICATE_API_TOKEN}" \
  --header "cf-aig-authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Prefer: wait" \
  --data '{
    "version": "prunaai/p-video",
    "input": {
      "prompt": "A cat walking through a field of flowers in slow motion",
      "duration": 5,
      "aspect_ratio": "16:9",
      "resolution": "720p",
      "fps": 24
    }
  }'
```

For longer jobs, omit `Prefer: wait`, read the prediction `id` from the response, and poll until `status` is `succeeded` (or `failed`).

Adapted (not in the official docs): same variable substitution as above.

```bash
curl "https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_ID}/${CF_GATEWAY_ID}/replicate/predictions/${PREDICTION_ID}" \
  --header "Authorization: Bearer ${REPLICATE_API_TOKEN}" \
  --header "cf-aig-authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
```

## Notes

- Adapted from the official docs: the page uses inline `{replicate_api_token}` / `{cloudflare_api_token}` placeholders; they are shell variables here and quoted, so tokens come from the environment.
- `Authorization` authenticates with Replicate; `cf-aig-authorization` authenticates with an authenticated gateway.
- When the prediction completes, `output` holds a URL to the generated video file.
- Replicate's `urls.get` / `urls.cancel` in the async response point at `api.replicate.com`; poll through the gateway URL shown above so requests stay logged.

## Related

- [Authenticated gateway](../references/ai-gateway/configuration-authentication.md)
- [Universal endpoint](../references/ai-gateway/usage-universal-endpoint.md)
- [Logging](../references/ai-gateway/observability-logging.md)
