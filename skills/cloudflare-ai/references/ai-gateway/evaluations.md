---
source: https://developers.cloudflare.com/ai-gateway/evaluations/, https://developers.cloudflare.com/ai-gateway/evaluations/set-up-evaluations/
---

# Evaluations (Deprecated)

Evaluate application performance (cost, speed, human feedback) over datasets of logs. Deprecated: no longer supported for new accounts.

## Signature / Usage

The workflow is dashboard-only; this page has no official code. The only programmatic piece is feedback submission:

Snippet taken from https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"feedback": 1
	}'
```

## Options / Props

### Dataset filters (Logs tab)

| Filter category | Filter options | Filters by |
|-----------------|----------------|------------|
| Status | error, status | Error type or status |
| Cache | cached, not cached | Whether cached |
| Provider | specific providers | Selected AI provider |
| AI Models | specific models | Selected model |
| Cost | less than, greater than | Cost threshold |
| Request type | Workers AI Binding, WebSockets | Request type |
| Tokens | Total tokens, Tokens In, Tokens Out | Token count (less/greater than) |
| Duration | less than, greater than | Request duration |
| Feedback | equals, does not equal (thumbs up, thumbs down, no feedback) | Feedback type |
| Metadata Key / Metadata Value | equals, does not equal | Metadata keys / values |
| Log ID | equals, does not equal | A specific Log ID |
| Event ID | equals, does not equal | A specific Event ID |

### Evaluators

| Evaluator | Computes |
|-----------|----------|
| Cost | Average cost of requests with cost data |
| Speed | Average request duration |
| Performance: Human feedback | Percentage of thumbs-up on annotated logs |

## Notes

- Steps: (1) create a dataset from Logs tab filters (**Create Dataset**; manage via **Manage datasets**), (2) select evaluators, (3) name, review, and **Run**, (4) review results in the Evaluations tab (status, metrics, log counts; logs with missing fields are excluded).
- Datasets use `AND` joins, so only one item per filter (e.g. one model or provider). Datasets update automatically with their filters; evaluations do not, so run a new evaluation for new logs.

## Related

- [evaluations-human-feedback.md](./evaluations-human-feedback.md)
- [observability-logging.md](./observability-logging.md)
- [observability-costs.md](./observability-costs.md)
