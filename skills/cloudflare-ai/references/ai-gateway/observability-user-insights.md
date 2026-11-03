---
source: https://developers.cloudflare.com/ai-gateway/observability/user-insights/
---

# User Insights

Dashboard of organization-wide AI spend, per-identity attribution, and anomalous-session detection. Available to all customers at no extra cost; no setup.

## Signature / Usage

Attribute usage to users by sending an identifier as custom metadata:

Snippet taken from https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header 'cf-aig-metadata: {"team": "AI", "user": 12345, "test":true}' \
  --data '{"model": "openai/gpt-4.1", "messages": [{"role": "user", "content": "What should I eat for lunch?"}]}'
```

## Options / Props

### Organization metrics

| Metric | Description |
|--------|-------------|
| Active users | Identities with gateway usage |
| Total requests | Gateway requests in range |
| Adoption rate | IdP identities with at least one request |
| Tokens per active user | Median over the range |
| Median spend / active user | Observed spend per attributed identity |
| Top 10% request activity | Share of attributed requests by the most active users |
| Users to review | Users whose cost is at least 2x the median spend |
| Identity coverage | Share of requests attributed to users |

### Per-user view

Spend, Requests, Tokens, Gateway cached requests, Errored requests, Cache hit rate, Sessions (approximate), Top model, Top provider, Last seen, Active days, Identity coverage.

## Notes

- Without an identity or custom metadata, all usage is grouped under a single anonymous identifier. Use custom metadata or put the gateway behind Cloudflare Access for verified identities.
- Anomaly detection is per session: baseline is the user's rolling 30-day p95 session cost. A session is flagged only if it exceeds both 2x the user's own p95 and the organization-level p99 session cost. Flagged users appear in a filtered view; User Insights does not block requests.
- Task and model analysis comes from log classification.

## Related

- [observability-custom-metadata.md](./observability-custom-metadata.md)
- [observability-log-classification.md](./observability-log-classification.md)
- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
- [features-spend-limits.md](./features-spend-limits.md)
