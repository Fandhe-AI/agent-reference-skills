# Rate Limits

Per-user, per-plan rate limits applied to all Figma REST API endpoints. Exceeding limits returns HTTP 429.

## Signature / Usage

When rate-limited, read the `Retry-After` header and wait before retrying:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
X-Figma-Rate-Limit-Type: high
```

## Options / Props

### Tier definitions

| Tier | Endpoints Included |
|------|--------------------|
| Tier 1 | GET file, GET file nodes, GET images |
| Tier 2 | Comments, dev resources, discovery, image fills, projects, variables, version history, webhooks |
| Tier 3 | Activity logs, components, developer logs, file metadata, library analytics, payments, project metadata, users, POST variables |

### Limits by seat type and plan

| Tier | View/Collab | Dev/Full Starter | Dev/Full Pro | Dev/Full Org | Dev/Full Enterprise |
|------|-------------|------------------|--------------|--------------|---------------------|
| Tier 1 | Up to 6/month | 10/min | 15/min | 20/min | Unlimited |
| Tier 2 | Up to 5/min | 25/min | 50/min | 100/min | Unlimited |
| Tier 3 | Up to 10/min | 50/min | 100/min | 150/min | Unlimited |

### 429 response headers

| Header | Type | Description |
|--------|------|-------------|
| `Retry-After` | Integer | Seconds to wait before retrying |
| `X-Figma-Plan-Tier` | String | Resource plan tier of the request |
| `X-Figma-Rate-Limit-Type` | String | `low` (Collab/Viewer) or `high` (Full/Dev) |
| `X-Figma-Upgrade-Link` | String | URL to upgrade plan or settings page |

## Notes

- Rate limits apply per-user for personal access tokens
- For OAuth tokens: per-user, per-plan, per-app
- For plan access tokens: per-token
- Best practices: batch requests, cache results, implement retry logic using `Retry-After`

## Related

- [Errors](./errors.md)
- [Files](./files.md)
