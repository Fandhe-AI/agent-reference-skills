---
source: https://developers.cloudflare.com/ai-gateway/observability/log-classification/
---

# Log classification

Classifies eligible logged traffic by task and assesses whether the model used fits the task. Powers Task and model analysis in User Insights. Off by default and enabled per gateway.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-gateway/observability/logging/ (log collection must also be on; this header controls whether one request is logged)

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-collect-log: false" \
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

| Result | Values |
|--------|--------|
| Tasks by model | Classifications such as debugging, code planning, code Q&A, text drafting, coding; token usage and estimated spend per model |
| Model fit | Overkill, Appropriate, Underpowered, Could not assess |

## Notes

- Enable: gateway > **Settings** > turn on **Collect logs**, then **Log classification**. Disable by turning off **Log classification**; logs can keep being collected.
- When on, Cloudflare may process stored prompts, responses, request metadata, and identifiers linking requests into a conversation. This is a privacy-relevant setting; consider it for gateways with sensitive content.
- Requires **Collect logs**; only activity recorded while both are on is classified. Turning off Collect logs also turns off classification. Previously generated results remain subject to retention and deletion policies.

## Related

- [observability-logging.md](./observability-logging.md)
- [observability-user-insights.md](./observability-user-insights.md)
