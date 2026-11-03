---
source: https://developers.cloudflare.com/ai-gateway/observability/logging/legacy-logs/
---

# Legacy Logs

Log storage, viewer, and Logs API for customers who created a gateway before September 24, 2026. Later customers use the standard logging pages.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/ (Logs API: list stored logs)

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Options / Props

### Storage limits

| Plan | Limit |
|------|-------|
| Workers Free | 100,000 logs across all gateways |
| Workers Paid | 10 million logs per gateway |
| Per log | up to 10 MB; larger logs are not stored |

### Dashboard delete filters

| Filter category | Filter options |
|-----------------|----------------|
| Status | Error, status |
| Cache | Cached, not cached |
| Provider | Specific providers |
| AI models | Specific models |
| Cost | Less than, greater than |
| Request type | Workers AI Binding, WebSockets |
| Tokens | Total tokens, Tokens In, Tokens Out |
| Duration | Less than, greater than |
| Feedback | Equals, does not equal (thumbs up, thumbs down, no feedback) |
| Metadata key / value | Equals, does not equal |
| Log ID / Event ID | Equals, does not equal |
| DLP action | `FLAG`, `BLOCK` |
| User agent | Equals, does not equal, contains |

## Notes

- Legacy Logs persists logs until you delete them. At the storage limit it can stop saving (delete logs to resume) or auto-delete the oldest logs if **Automatic Log Deletion** is on in gateway settings.
- Manual deletion: gateway **Logs** tab > filters > **Delete logs**; programmatic deletion via the Logs `DELETE` endpoint (https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/delete/).
- Default collection and per-request headers are documented in [observability-logging.md](./observability-logging.md). Plan details: [reference-pricing.md](./reference-pricing.md).

## Related

- [observability-logging.md](./observability-logging.md)
- [reference-pricing.md](./reference-pricing.md)
- [evaluations-human-feedback.md](./evaluations-human-feedback.md)
