---
source: https://developers.cloudflare.com/ai-gateway/observability/analytics/
---

# Analytics

Dashboard metrics for requests, token usage, costs, errors, and cached responses, filterable by time; also queryable through the Cloudflare GraphQL API.

## Signature / Usage

Adapted (not in the official docs): the official example has an unterminated `Authorization` quote, uses undeclared GraphQL variables (`$limit`, `$start`, `$end`), and splices the account ID into the query text; this version declares the variables and passes the account tag as a variable.

```bash
curl https://api.cloudflare.com/client/v4/graphql \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header 'Content-Type: application/json' \
  --data '{
    "query": "query($accountTag: String!, $limit: Int!, $start: Time!, $end: Time!) { viewer { accounts(filter: { accountTag: $accountTag }) { requests: aiGatewayRequestsAdaptiveGroups(limit: $limit, filter: { datetimeHour_geq: $start, datetimeHour_leq: $end }, orderBy: [datetimeMinute_ASC]) { count, dimensions { model, provider, gateway, ts: datetimeMinute } } } } }",
    "variables": {
      "accountTag": "<ACCOUNT_TAG>",
      "limit": 1000,
      "start": "2023-09-01T10:00:00.000Z",
      "end": "2023-09-30T10:00:00.000Z"
    }
  }'
```

## Options / Props

### Dashboard metrics

| Metric | Description |
|--------|-------------|
| Requests | Total requests processed by AI Gateway |
| Token Usage | Token consumption across requests |
| Costs | Spend across AI providers |
| Errors | Number of errors across the gateway |
| Cached Responses | Percentage served from cache |

### GraphQL dataset fields used

| Name | Type | Default | Description |
|------|------|---------|-------------|
| aiGatewayRequestsAdaptiveGroups | dataset | — | Request counts grouped by dimensions |
| dimensions | model, provider, gateway, ts (`datetimeMinute`) | — | Grouping dimensions in the example |

## Notes

- Corrected from the official docs: GraphQL variable declarations, the quote on the `Authorization` header, and the account tag passed as a variable; the unused `orderBy` variable was dropped. Read the token from an environment variable.
- View in the dashboard: AI > AI Gateway > select a gateway. The query requires a Cloudflare API token and your account tag.

## Related

- [observability-costs.md](./observability-costs.md)
- [observability-logging.md](./observability-logging.md)
- [observability-user-insights.md](./observability-user-insights.md)
