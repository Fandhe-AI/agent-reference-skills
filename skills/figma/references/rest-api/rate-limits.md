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
| Tier 1 | GET file, GET file nodes, GET image |
| Tier 2 | Comments, dev resources, discovery, GET image fills, folders (GET team folders, GET folder subfolders, GET folder files), projects (GET team projects, GET project files), variables (GET local variables, GET published variables), version history, webhooks |
| Tier 3 | Activity logs, components and styles, developer logs, GET file metadata, GET folder metadata, library analytics, payments, GET project metadata, users, POST variables |

### Limits by seat type and plan

Rate limits are per minute unless otherwise specified. The Starter column is the same for every seat; View and Collab seats get the same limit on every plan. Dev and Full seats on Starter share the Starter limits (the table reads Starter as a single column spanning all seats).

| Tier | View/Collab (all plans) and Starter (any seat) | Dev/Full Professional | Dev/Full Organization | Dev/Full Enterprise |
|------|-----------------------------------------------|-----------------------|-----------------------|---------------------|
| Tier 1 | Up to 20/month | 10/min | 15/min | 20/min |
| Tier 2 | Up to 5/min | 25/min | 50/min | 100/min |
| Tier 3 | Up to 10/min | 50/min | 100/min | 150/min |

For View and Collab seats requests are limited "up to" the amount; depending on traffic and demand the actual limit may be lower.

### 429 response headers

| Header | Type | Description |
|--------|------|-------------|
| `Retry-After` | Integer | Seconds to wait before retrying |
| `X-Figma-Plan-Tier` | String | Plan tier of the requested resource: `enterprise`, `org`, `pro`, `starter`, or `student` |
| `X-Figma-Rate-Limit-Type` | String | `low` (Collab/Viewer) or `high` (Full/Dev) |
| `X-Figma-Upgrade-Link` | String | URL to upgrade plan or settings page |

## Notes

- The updated limits are in effect as of 2025-11-17; Figma reserves the right to change rate limits
- Limits depend on the user's seat, the endpoint's tier, and the location and plan of the requested resource (a personal access token's Full seat in one plan does not raise limits for files in a Starter plan)
- Rate limiting uses a leaky bucket algorithm; a full bucket or exceeded limit returns `429`
- Personal access tokens: per-user, per-plan (the user who generated the token)
- OAuth tokens: per-user, per-plan, per-app
- Plan access tokens: per-token, per-plan
- The official prose still contains example sentences saying "6 per month" / "6 requests monthly"; the table says 20/month and so does the MCP rate-limits-access page, so this page follows the table
- `X-Figma-Rate-Limit-Type` is `low` for Collab/Viewer seats and `high` for Full/Dev seats; `X-Figma-Upgrade-Link` points to `/pricing` or `/settings`
- Best practices: batch requests, cache results, implement retry logic using `Retry-After`

## Related

- [Errors](./errors.md)
- [Files](./files.md)
