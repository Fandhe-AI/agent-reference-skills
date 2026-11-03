---
source: https://developers.cloudflare.com/ai-gateway/observability/logging/
---

# Logging

Request logs for monitoring and troubleshooting: prompt, response, provider, timestamp, status, token usage, cost, duration, user agent, and DLP/Guardrails details. Enabled by default per gateway.

## Signature / Usage

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-collect-log-payload: false" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is the email address and phone number of user123?"
      }
    ]
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-collect-log | `true` / `false` | gateway setting | Override whether the whole log entry for this request is saved |
| cf-aig-collect-log-payload | `true` / `false` | gateway setting | `true` stores request/response payloads; `false` skips payload storage but keeps metadata (tokens, model, provider, status, cost, duration) |

### DLP fields in logs

| Field | Description |
|-------|-------------|
| DLP Action | `FLAG` or `BLOCK` |
| DLP Policies Matched | Matching policy IDs |
| DLP Profiles Matched | Profile IDs triggered within each policy |
| DLP Entries Matched | Detection entry IDs matched |
| DLP Check | `REQUEST`, `RESPONSE`, or both |

## Notes

- Default: dashboard AI Gateway > **Settings** > **Logs**. Turn off collection for privacy or compliance.
- If `cf-aig-collect-log` is `false`, the whole entry (including metadata) is skipped regardless of `cf-aig-collect-log-payload`. Use the payload header alone to keep metadata while suppressing prompts and completions.
- These headers control only what AI Gateway stores; they do not change what Logpush exports.
- Eligibility: customers whose first gateway was created on or after September 24, 2026 follow Workers Logs pricing and retention (https://developers.cloudflare.com/workers/observability/logs/workers-logs/#pricing); customers with a gateway created before that date use Legacy Logs.
- Use an authenticated gateway to prevent unauthorized access and avoid invalid requests inflating log volume. Guardrails evaluation calls are also logged.

## Related

- [observability-legacy-logs.md](./observability-legacy-logs.md)
- [observability-logpush.md](./observability-logpush.md)
- [observability-log-classification.md](./observability-log-classification.md)
- [configuration-authentication.md](./configuration-authentication.md)
- [features-dlp.md](./features-dlp.md)
